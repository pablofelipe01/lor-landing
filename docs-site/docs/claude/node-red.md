---
sidebar_position: 1
---

# Node-RED con Claude AI

Node-RED es la plataforma que conecta los mensajes de Meshtastic con la API de Claude AI.

## Arquitectura del Flujo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           NODE-RED                                      │
│                                                                         │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐  │
│  │  MQTT   │   │  JSON   │   │ Detect  │   │ Claude  │   │  MQTT   │  │
│  │   In    │──►│ Parse   │──►│ @claude │──►│   API   │──►│   Out   │  │
│  │         │   │         │   │         │   │         │   │         │  │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘  │
│       │                           │                            │        │
│       │                           │ No @claude                 │        │
│       │                           ▼                            │        │
│       │                      [Ignorar]                         │        │
│       │                                                        │        │
└───────┼────────────────────────────────────────────────────────┼────────┘
        │                                                        │
        │ MQTT                                                   │ MQTT
        ▼                                                        ▼
   Meshtastic                                               Meshtastic
   (Entrada)                                                 (Salida)
```

## Acceso a Node-RED

| Red | URL |
|-----|-----|
| Externa | http://192.168.68.130:1880 |
| Interna | http://192.168.100.10:1880 |

## Flujo de 4 Nodos

El flujo consta de 4 nodos principales:

### 1. MQTT In - Recibir Mensajes

**Tipo**: mqtt in

**Configuración**:
| Parámetro | Valor |
|-----------|-------|
| Server | 192.168.68.127:1883 |
| Topic | `meshtastic/2/json/LongFast/!69d01ebc` |
| QoS | 0 |
| Output | auto-detect (parsed JSON) |

### 2. Function - Detectar @claude

**Tipo**: function

**Nombre**: Detect @claude

**Código**:
```javascript
// Verificar que es un mensaje de texto
if (!msg.payload || !msg.payload.payload || !msg.payload.payload.text) {
    return null;
}

var text = msg.payload.payload.text;

// Verificar si contiene @claude
if (text.toLowerCase().indexOf("@claude") === -1) {
    return null;
}

// Extraer el mensaje sin @claude
var question = text.replace(/@claude/gi, "").trim();

// Guardar información del remitente
msg.sender = msg.payload.sender;
msg.from = msg.payload.from;
msg.originalText = text;

// Preparar el mensaje para Claude
msg.payload = question;

return msg;
```

### 3. HTTP Request - Claude API

**Tipo**: http request

**Configuración**:
| Parámetro | Valor |
|-----------|-------|
| Method | POST |
| URL | https://api.anthropic.com/v1/messages |
| Return | a parsed JSON object |

**Headers** (configurar en nodo):
```
x-api-key: sk-ant-api03-xxxxx (tu API key)
anthropic-version: 2023-06-01
content-type: application/json
```

**Nodo Function previo para preparar body**:
```javascript
msg.payload = {
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 300,
    "messages": [
        {
            "role": "user",
            "content": msg.payload
        }
    ],
    "system": "Eres un asistente para comunidades rurales. Responde de forma breve y práctica. Máximo 200 caracteres por limitaciones de LoRa."
};

msg.headers = {
    "x-api-key": "sk-ant-api03-xxxxx",
    "anthropic-version": "2023-06-01",
    "content-type": "application/json"
};

return msg;
```

### 4. MQTT Out - Enviar Respuesta

**Tipo**: mqtt out

**Configuración**:
| Parámetro | Valor |
|-----------|-------|
| Server | 192.168.68.127:1883 |
| Topic | (configurar dinámicamente) |
| QoS | 0 |
| Retain | false |

**Nodo Function previo para formatear respuesta**:
```javascript
// Extraer respuesta de Claude
var response = msg.payload.content[0].text;

// Truncar si es muy largo (límite LoRa)
if (response.length > 200) {
    response = response.substring(0, 197) + "...";
}

// Formatear para Meshtastic
msg.payload = {
    "text": response
};

return msg;
```

## Flujo Completo (JSON para Importar)

```json
[
    {
        "id": "mqtt-in-meshtastic",
        "type": "mqtt in",
        "name": "Meshtastic Messages",
        "topic": "meshtastic/2/json/LongFast/!69d01ebc",
        "qos": "0",
        "datatype": "json",
        "broker": "mqtt-broker",
        "wires": [["detect-claude"]]
    },
    {
        "id": "detect-claude",
        "type": "function",
        "name": "Detect @claude",
        "func": "if (!msg.payload || !msg.payload.payload || !msg.payload.payload.text) { return null; }\nvar text = msg.payload.payload.text;\nif (text.toLowerCase().indexOf('@claude') === -1) { return null; }\nvar question = text.replace(/@claude/gi, '').trim();\nmsg.sender = msg.payload.sender;\nmsg.originalText = text;\nmsg.payload = question;\nreturn msg;",
        "wires": [["prepare-claude"]]
    },
    {
        "id": "prepare-claude",
        "type": "function",
        "name": "Prepare Claude Request",
        "func": "msg.payload = {\n    'model': 'claude-sonnet-4-20250514',\n    'max_tokens': 300,\n    'messages': [{'role': 'user', 'content': msg.payload}],\n    'system': 'Eres un asistente para comunidades rurales. Responde de forma breve y práctica.'\n};\nmsg.headers = {\n    'x-api-key': 'TU_API_KEY_AQUI',\n    'anthropic-version': '2023-06-01',\n    'content-type': 'application/json'\n};\nreturn msg;",
        "wires": [["claude-api"]]
    },
    {
        "id": "claude-api",
        "type": "http request",
        "name": "Claude API",
        "method": "POST",
        "url": "https://api.anthropic.com/v1/messages",
        "ret": "obj",
        "wires": [["format-response"]]
    },
    {
        "id": "format-response",
        "type": "function",
        "name": "Format Response",
        "func": "var response = msg.payload.content[0].text;\nif (response.length > 200) { response = response.substring(0, 197) + '...'; }\nmsg.payload = { 'text': response };\nreturn msg;",
        "wires": [["mqtt-out"]]
    },
    {
        "id": "mqtt-out",
        "type": "mqtt out",
        "name": "Send to Meshtastic",
        "topic": "",
        "broker": "mqtt-broker"
    }
]
```

## Importar el Flujo

1. Abrir Node-RED (http://192.168.100.10:1880)
2. Menú hamburguesa → Import
3. Pegar el JSON del flujo
4. Click "Import"
5. Configurar el nodo MQTT broker
6. Agregar tu API key de Claude
7. Deploy

## Probar el Flujo

### Prueba Manual vía MQTT

```bash
# Publicar mensaje de prueba
mosquitto_pub -h 192.168.68.127 -t "meshtastic/2/json/LongFast/!69d01ebc" -m '{
  "payload": {
    "text": "@claude ¿Cuándo debo sembrar tomates?"
  },
  "sender": "!test1234",
  "from": 1234567890
}'
```

### Ver Respuesta

```bash
# Suscribirse a respuestas
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v
```

## Configuración del Broker MQTT

En Node-RED, configurar el nodo MQTT broker:

1. Doble click en nodo MQTT
2. Click en lápiz junto a "Server"
3. Configurar:
   - **Name**: Meshtastic MQTT
   - **Server**: 192.168.68.127
   - **Port**: 1883
4. Guardar

## Debug

### Agregar Nodos Debug

Para ver el flujo de datos:

1. Agregar nodo "debug" después de cada nodo
2. Configurar para mostrar "complete msg object"
3. Ver panel de debug a la derecha
4. Deploy y probar

### Ver Logs de Node-RED

```bash
# En el reComputer
journalctl -u nodered -f
```

## Troubleshooting

### No detecta mensajes

1. Verificar topic MQTT correcto
2. Verificar conexión al broker
3. Agregar debug después de MQTT in
4. Verificar formato del mensaje

### Claude no responde

1. Verificar API key válida
2. Verificar headers correctos
3. Ver respuesta de error en debug
4. Verificar conexión a internet

### Respuesta no llega al tracker

1. Verificar topic de salida MQTT
2. Verificar formato del mensaje
3. Verificar que gateway Meshtastic está escuchando
