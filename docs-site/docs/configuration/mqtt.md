---
sidebar_position: 2
---

# MQTT Configuration

MQTT broker setup and message routing.

## Overview

MQTT (Message Queuing Telemetry Transport) is used to:
- Bridge LoRa messages to IP network
- Enable Node-RED to process messages
- Route Claude responses back to mesh

## Mosquitto Broker

### Installation (already done on RPi5)
```bash
sudo apt install mosquitto mosquitto-clients
sudo systemctl enable mosquitto
sudo systemctl start mosquitto
```

### Configuration File
`/etc/mosquitto/mosquitto.conf`:
```
listener 1883
allow_anonymous true
```

### Verify service
```bash
sudo systemctl status mosquitto
```

### Test connection
```bash
# Terminal 1: Subscribe
mosquitto_sub -h 192.168.68.127 -t "test/#" -v

# Terminal 2: Publish
mosquitto_pub -h 192.168.68.127 -t "test/hello" -m "Hello World"
```

## Topic Structure

### Meshtastic topics

| Topic | Direction | Purpose |
|-------|-----------|---------|
| `meshtastic/2/json/LongFast/!69d01ebc` | Receive | Messages from mesh |
| `meshtastic/2/json/LongFast/!69d01ebc/sendtext` | Send | Messages to mesh |

### Subscribe to all Meshtastic traffic
```bash
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v
```

## Message Format

### Received message (JSON)
```json
{
  "channel": 0,
  "from": 2846474973,
  "id": 123456789,
  "payload": {
    "text": "@claude What is LoRa?"
  },
  "sender": "!a9b8c7d6",
  "timestamp": 1699900000,
  "to": 4294967295,
  "type": "text"
}
```

### Send message
```bash
mosquitto_pub -h 192.168.68.127 \
  -t "meshtastic/2/json/LongFast/!69d01ebc/sendtext" \
  -m "Hello from MQTT"
```

## Node-RED Integration

### MQTT In Node
- Server: 192.168.68.127:1883
- Topic: `meshtastic/2/json/LongFast/!69d01ebc`
- QoS: 0

### MQTT Out Node
- Server: 192.168.68.127:1883
- Topic: `meshtastic/2/json/LongFast/!69d01ebc/sendtext`
- QoS: 0

## Troubleshooting

### Connection refused
```bash
# Check if Mosquitto is running
sudo systemctl status mosquitto

# Check port
netstat -tlnp | grep 1883

# Check firewall
sudo ufw status
```

### No messages
```bash
# Subscribe to everything
mosquitto_sub -h 192.168.68.127 -t "#" -v

# Check Meshtastic MQTT settings
meshtastic --get mqtt
```

### Messages not reaching mesh
1. Verify topic is correct
2. Check Meshtastic service is running
3. Verify MQTT settings in Meshtastic
