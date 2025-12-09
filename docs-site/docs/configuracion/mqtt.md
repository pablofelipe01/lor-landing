---
sidebar_position: 2
---

# Configuración MQTT

El broker MQTT (Mosquitto) es el puente entre Meshtastic y Node-RED, permitiendo la integración con Claude AI.

## Arquitectura MQTT

```
┌─────────────┐        ┌─────────────┐        ┌─────────────┐
│ Meshtastic  │        │   MQTT      │        │  Node-RED   │
│   Gateway   │───────►│   Broker    │───────►│  + Claude   │
│             │◄───────│ (Mosquitto) │◄───────│             │
└─────────────┘        └─────────────┘        └─────────────┘
     RPI 5                 RPI 5              reComputer
```

## Broker Mosquitto

### Ubicación

El broker Mosquitto corre en el Raspberry Pi 5 (192.168.68.127).

### Instalación (si es necesario)

```bash
# En Raspberry Pi
sudo apt update
sudo apt install mosquitto mosquitto-clients
sudo systemctl enable mosquitto
sudo systemctl start mosquitto
```

### Configuración

```bash
# Archivo de configuración
/etc/mosquitto/mosquitto.conf
```

Configuración básica:
```conf
# /etc/mosquitto/mosquitto.conf

# Puerto estándar
listener 1883

# Permitir conexiones anónimas (red local)
allow_anonymous true

# Persistencia
persistence true
persistence_location /var/lib/mosquitto/

# Logging
log_dest file /var/log/mosquitto/mosquitto.log
log_type all
```

### Comandos de Servicio

```bash
# Ver estado
sudo systemctl status mosquitto

# Iniciar
sudo systemctl start mosquitto

# Detener
sudo systemctl stop mosquitto

# Reiniciar
sudo systemctl restart mosquitto

# Ver logs
sudo tail -f /var/log/mosquitto/mosquitto.log
```

## Topics Meshtastic

### Estructura de Topics

```
meshtastic/2/json/{channel}/{nodeId}
meshtastic/2/c/{channel}/{nodeId}
meshtastic/2/stat/{nodeId}
```

### Topics Principales

| Topic | Tipo | Descripción |
|-------|------|-------------|
| `meshtastic/2/json/LongFast/!69d01ebc` | Entrada | Mensajes JSON del gateway |
| `meshtastic/2/c/LongFast/!69d01ebc` | Entrada | Canal encriptado |
| `msh/2/json/Test/!69d01ebc` | Entrada | Formato alternativo |

### Formato de Mensaje Entrante

```json
{
  "channel": 0,
  "from": 1234567890,
  "id": 987654321,
  "payload": {
    "text": "@claude ¿Cuál es la mejor época para sembrar maíz?"
  },
  "sender": "!aabbccdd",
  "timestamp": 1699999999,
  "to": 4294967295,
  "type": "text",
  "rssi": -85,
  "snr": 7.5
}
```

### Campos del Mensaje

| Campo | Descripción |
|-------|-------------|
| `channel` | Índice del canal (0 = primario) |
| `from` | ID numérico del remitente |
| `id` | ID único del mensaje |
| `payload.text` | Contenido del mensaje |
| `sender` | ID hexadecimal del remitente |
| `timestamp` | Unix timestamp |
| `to` | Destinatario (4294967295 = broadcast) |
| `type` | Tipo de mensaje (text, position, etc.) |
| `rssi` | Intensidad de señal |
| `snr` | Relación señal/ruido |

## Herramientas de Diagnóstico

### Suscribirse a Todos los Topics

```bash
# Ver todos los mensajes Meshtastic
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v

# Solo mensajes JSON
mosquitto_sub -h 192.168.68.127 -t "meshtastic/2/json/#" -v

# Topic específico
mosquitto_sub -h 192.168.68.127 -t "meshtastic/2/json/LongFast/!69d01ebc" -v
```

### Publicar Mensaje de Prueba

```bash
# Publicar mensaje de prueba
mosquitto_pub -h 192.168.68.127 -t "test/topic" -m "Mensaje de prueba"

# Publicar JSON
mosquitto_pub -h 192.168.68.127 -t "test/json" -m '{"test": "hello"}'
```

### Verificar Conectividad

```bash
# Desde reComputer hacia RPI
mosquitto_sub -h 192.168.68.127 -t "test" &
mosquitto_pub -h 192.168.68.127 -t "test" -m "ping"
# Debería mostrar "ping"
```

## Configuración en Node-RED

### Nodo MQTT In

Configuración del nodo MQTT que recibe mensajes de Meshtastic:

| Parámetro | Valor |
|-----------|-------|
| Server | 192.168.68.127 |
| Port | 1883 |
| Topic | `meshtastic/2/json/LongFast/!69d01ebc` |
| QoS | 0 |
| Output | auto-detect |

### Nodo MQTT Out

Configuración del nodo MQTT para enviar respuestas:

| Parámetro | Valor |
|-----------|-------|
| Server | 192.168.68.127 |
| Port | 1883 |
| Topic | (configurar según destino) |
| QoS | 0 |
| Retain | false |

### Conexión MQTT Broker

En Node-RED, crear configuración de broker:

1. Hacer doble click en nodo MQTT
2. Click en lápiz junto a "Server"
3. Configurar:
   - Name: `Meshtastic MQTT`
   - Server: `192.168.68.127`
   - Port: `1883`
   - Client ID: `nodered-client`
4. Guardar

## Seguridad (Opcional)

### Habilitar Autenticación

```bash
# Crear archivo de contraseñas
sudo mosquitto_passwd -c /etc/mosquitto/passwd usuario

# Editar configuración
sudo nano /etc/mosquitto/mosquitto.conf
```

Agregar:
```conf
allow_anonymous false
password_file /etc/mosquitto/passwd
```

Reiniciar:
```bash
sudo systemctl restart mosquitto
```

### Conexión con Autenticación

```bash
mosquitto_sub -h 192.168.68.127 -u usuario -P contraseña -t "#"
```

## Troubleshooting

### No hay conexión al broker

```bash
# Verificar que Mosquitto está corriendo
sudo systemctl status mosquitto

# Verificar puerto 1883
sudo netstat -tlnp | grep 1883

# Probar conexión local
mosquitto_sub -h localhost -t "test"
```

### Mensajes no llegan a Node-RED

1. Verificar topic correcto
2. Verificar IP del broker en Node-RED
3. Ver logs de Node-RED para errores de conexión

```bash
# Ver logs de Node-RED
journalctl -u nodered -f
```

### Mensaje llega pero con formato incorrecto

1. Verificar que el topic incluye `/json/`
2. Usar nodo JSON en Node-RED para parsear
3. Verificar estructura del payload

### Demasiados mensajes

Para filtrar solo mensajes de texto:
```javascript
// En nodo Function de Node-RED
if (msg.payload.type !== "text") {
    return null;
}
return msg;
```

## Monitoreo

### Ver Estadísticas

```bash
# Instalar cliente con estadísticas
mosquitto_sub -h localhost -t '$SYS/#' -v
```

### Logs del Broker

```bash
# Ver logs en tiempo real
sudo tail -f /var/log/mosquitto/mosquitto.log

# Últimas 100 líneas
sudo tail -100 /var/log/mosquitto/mosquitto.log
```
