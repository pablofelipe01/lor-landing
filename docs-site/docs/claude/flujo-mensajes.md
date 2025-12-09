---
sidebar_position: 2
---

# Flujo de Mensajes

Explicación detallada de cómo un mensaje viaja desde el usuario hasta Claude y de vuelta.

## Diagrama del Flujo Completo

```
Usuario con T1000-E
        │
        │ 1. Escribe "@claude ¿pregunta?"
        ▼
┌───────────────┐
│   T1000-E     │
│   Tracker     │
│               │
│ Transmite     │
│ via LoRa      │
└───────┬───────┘
        │
        │ 2. Señal LoRa 915 MHz
        ▼
┌───────────────────────────────────────────────────────────┐
│                    RED MESH LoRa                          │
│                                                           │
│  Mensaje puede pasar por múltiples nodos                  │
│  (hop limit: 3)                                           │
│                                                           │
└───────────────────────────┬───────────────────────────────┘
                            │
                            │ 3. Gateway recibe
                            ▼
                    ┌───────────────┐
                    │ Raspberry Pi 5│
                    │   Gateway     │
                    │               │
                    │ Meshtastic    │
                    │ → MQTT        │
                    └───────┬───────┘
                            │
                            │ 4. Publica en MQTT
                            │ Topic: meshtastic/2/json/...
                            ▼
                    ┌───────────────┐
                    │    MQTT       │
                    │   Broker      │
                    │  (Mosquitto)  │
                    └───────┬───────┘
                            │
                            │ 5. Node-RED suscrito
                            ▼
┌───────────────────────────────────────────────────────────┐
│                      NODE-RED                             │
│                                                           │
│  6. MQTT In recibe mensaje                                │
│         │                                                 │
│         ▼                                                 │
│  7. Function detecta @claude                              │
│         │                                                 │
│         ▼                                                 │
│  8. Prepara request para API Claude                       │
│         │                                                 │
│         ▼                                                 │
│  9. HTTP Request a api.anthropic.com                      │
│         │                                                 │
│         ▼                                                 │
│  10. Recibe respuesta de Claude                           │
│         │                                                 │
│         ▼                                                 │
│  11. Formatea respuesta (max 200 chars)                   │
│         │                                                 │
│         ▼                                                 │
│  12. MQTT Out publica respuesta                           │
│                                                           │
└───────────────────────────┬───────────────────────────────┘
                            │
                            │ 13. Respuesta en MQTT
                            ▼
                    ┌───────────────┐
                    │    MQTT       │
                    │   Broker      │
                    └───────┬───────┘
                            │
                            │ 14. Gateway suscrito
                            ▼
                    ┌───────────────┐
                    │ Raspberry Pi 5│
                    │   Gateway     │
                    │               │
                    │ MQTT →        │
                    │ Meshtastic    │
                    └───────┬───────┘
                            │
                            │ 15. Transmite LoRa
                            ▼
┌───────────────────────────────────────────────────────────┐
│                    RED MESH LoRa                          │
│                                                           │
│  Respuesta viaja por la mesh                              │
│                                                           │
└───────────────────────────┬───────────────────────────────┘
                            │
                            │ 16. Tracker recibe
                            ▼
                    ┌───────────────┐
                    │   T1000-E     │
                    │   Tracker     │
                    │               │
                    │ Muestra       │
                    │ respuesta     │
                    └───────────────┘
                            │
                            ▼
                     Usuario lee
                     la respuesta
```

## Paso a Paso Detallado

### 1. Usuario Envía Mensaje

El usuario escribe un mensaje en su tracker T1000-E usando la app Meshtastic:

```
@claude ¿Cuál es la mejor época para sembrar maíz en zona tropical?
```

### 2-3. Transmisión LoRa

- El T1000-E transmite el mensaje por radio LoRa a 915 MHz
- Si el gateway no está al alcance directo, otros nodos retransmiten
- Máximo 3 saltos (hop limit)
- El gateway Raspberry Pi recibe el mensaje

### 4. Publicación MQTT

El servicio Meshtastic en el Raspberry Pi publica el mensaje en MQTT:

**Topic**: `meshtastic/2/json/LongFast/!69d01ebc`

**Payload**:
```json
{
  "channel": 0,
  "from": 1234567890,
  "id": 987654321,
  "payload": {
    "text": "@claude ¿Cuál es la mejor época para sembrar maíz en zona tropical?"
  },
  "sender": "!aabbccdd",
  "timestamp": 1699999999,
  "to": 4294967295,
  "type": "text",
  "rssi": -85,
  "snr": 7.5
}
```

### 5-6. Node-RED Recibe

El nodo MQTT In en Node-RED está suscrito al topic y recibe el mensaje.

### 7. Detección de @claude

El nodo Function evalúa si el mensaje contiene `@claude`:

```javascript
var text = msg.payload.payload.text;
if (text.toLowerCase().indexOf("@claude") === -1) {
    return null; // Ignorar si no tiene @claude
}
```

### 8. Preparación del Request

Se prepara el body para la API de Claude:

```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 300,
  "messages": [
    {
      "role": "user",
      "content": "¿Cuál es la mejor época para sembrar maíz en zona tropical?"
    }
  ],
  "system": "Eres un asistente para comunidades rurales. Responde de forma breve y práctica. Máximo 200 caracteres."
}
```

### 9. Request a Claude API

HTTP POST a `https://api.anthropic.com/v1/messages`

Headers:
```
x-api-key: sk-ant-api03-xxxxx
anthropic-version: 2023-06-01
content-type: application/json
```

### 10. Respuesta de Claude

Claude procesa la pregunta y responde:

```json
{
  "content": [
    {
      "type": "text",
      "text": "En zona tropical, siembra maíz al inicio de lluvias (abril-mayo). Suelo húmedo pero no encharcado. Temp ideal 20-30°C."
    }
  ],
  "model": "claude-sonnet-4-20250514",
  "usage": {
    "input_tokens": 45,
    "output_tokens": 38
  }
}
```

### 11. Formateo de Respuesta

Se extrae y trunca si es necesario:

```javascript
var response = msg.payload.content[0].text;
if (response.length > 200) {
    response = response.substring(0, 197) + "...";
}
```

### 12-14. Publicación de Respuesta

MQTT Out publica la respuesta que el gateway recibe.

### 15-16. Transmisión al Usuario

- El gateway transmite la respuesta por LoRa
- La red mesh la propaga
- El tracker del usuario la recibe y muestra

## Tiempos Típicos

| Etapa | Tiempo Típico |
|-------|---------------|
| LoRa ida (1 salto) | 1-3 segundos |
| LoRa ida (3 saltos) | 3-9 segundos |
| MQTT local | menos de 100 ms |
| Claude API | 2-5 segundos |
| LoRa vuelta | 1-9 segundos |
| **Total** | **5-25 segundos** |

## Límites y Consideraciones

### Tamaño de Mensaje

- **LoRa máximo**: ~230 bytes por mensaje
- **Respuesta Claude**: Limitada a 200 caracteres
- **Mensajes largos**: Se truncan automáticamente

### Rate Limits

- **LoRa**: ~1 mensaje cada 30 segundos recomendado
- **Claude API**: Según plan de API
- **MQTT**: Sin límite práctico en red local

### Confiabilidad

- **LoRa**: No garantiza entrega (best effort)
- **Mesh**: Mejora confiabilidad con múltiples rutas
- **Sin ACK**: Usuario no recibe confirmación de entrega

## Monitoreo del Flujo

### Ver Mensajes Entrantes

```bash
mosquitto_sub -h 192.168.68.127 -t "meshtastic/2/json/#" -v
```

### Ver Todo el Tráfico MQTT

```bash
mosquitto_sub -h 192.168.68.127 -t "#" -v
```

### Debug en Node-RED

1. Agregar nodos debug entre cada paso
2. Ver panel de debug en Node-RED
3. Identificar dónde se detiene el flujo
