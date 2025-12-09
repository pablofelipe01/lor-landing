---
sidebar_position: 2
---

# MQTT Configuration

The MQTT broker (Mosquitto) is the bridge between Meshtastic and Node-RED, enabling integration with Claude AI.

## MQTT Architecture

```
┌─────────────┐        ┌─────────────┐        ┌─────────────┐
│ Meshtastic  │        │   MQTT      │        │  Node-RED   │
│   Gateway   │───────►│   Broker    │───────►│  + Claude   │
│             │◄───────│ (Mosquitto) │◄───────│             │
└─────────────┘        └─────────────┘        └─────────────┘
     RPI 5                 RPI 5              reComputer
```

## Mosquitto Broker

### Location

The Mosquitto broker runs on the Raspberry Pi 5 (192.168.68.127).

### Installation (if needed)

```bash
# On Raspberry Pi
sudo apt update
sudo apt install mosquitto mosquitto-clients
sudo systemctl enable mosquitto
sudo systemctl start mosquitto
```

### Configuration

```bash
# Configuration file
/etc/mosquitto/mosquitto.conf
```

Basic configuration:
```conf
# /etc/mosquitto/mosquitto.conf

# Standard port
listener 1883

# Allow anonymous connections (local network)
allow_anonymous true

# Persistence
persistence true
persistence_location /var/lib/mosquitto/

# Logging
log_dest file /var/log/mosquitto/mosquitto.log
log_type all
```

### Service Commands

```bash
# Check status
sudo systemctl status mosquitto

# Start
sudo systemctl start mosquitto

# Stop
sudo systemctl stop mosquitto

# Restart
sudo systemctl restart mosquitto

# View logs
sudo tail -f /var/log/mosquitto/mosquitto.log
```

## Meshtastic Topics

### Topic Structure

```
meshtastic/2/json/{channel}/{nodeId}
meshtastic/2/c/{channel}/{nodeId}
meshtastic/2/stat/{nodeId}
```

### Main Topics

| Topic | Type | Description |
|-------|------|-------------|
| `meshtastic/2/json/LongFast/!69d01ebc` | Input | JSON messages from gateway |
| `meshtastic/2/c/LongFast/!69d01ebc` | Input | Encrypted channel |
| `msh/2/json/Test/!69d01ebc` | Input | Alternative format |

### Incoming Message Format

```json
{
  "channel": 0,
  "from": 1234567890,
  "id": 987654321,
  "payload": {
    "text": "@claude What's the best time to plant corn?"
  },
  "sender": "!aabbccdd",
  "timestamp": 1699999999,
  "to": 4294967295,
  "type": "text",
  "rssi": -85,
  "snr": 7.5
}
```

### Message Fields

| Field | Description |
|-------|-------------|
| `channel` | Channel index (0 = primary) |
| `from` | Numeric sender ID |
| `id` | Unique message ID |
| `payload.text` | Message content |
| `sender` | Hexadecimal sender ID |
| `timestamp` | Unix timestamp |
| `to` | Recipient (4294967295 = broadcast) |
| `type` | Message type (text, position, etc.) |
| `rssi` | Signal strength |
| `snr` | Signal-to-noise ratio |

## Diagnostic Tools

### Subscribe to All Topics

```bash
# View all Meshtastic messages
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v

# JSON messages only
mosquitto_sub -h 192.168.68.127 -t "meshtastic/2/json/#" -v

# Specific topic
mosquitto_sub -h 192.168.68.127 -t "meshtastic/2/json/LongFast/!69d01ebc" -v
```

### Publish Test Message

```bash
# Publish test message
mosquitto_pub -h 192.168.68.127 -t "test/topic" -m "Test message"

# Publish JSON
mosquitto_pub -h 192.168.68.127 -t "test/json" -m '{"test": "hello"}'
```

### Verify Connectivity

```bash
# From reComputer to RPI
mosquitto_sub -h 192.168.68.127 -t "test" &
mosquitto_pub -h 192.168.68.127 -t "test" -m "ping"
# Should show "ping"
```

## Node-RED Configuration

### MQTT In Node

Configuration for the MQTT node that receives messages from Meshtastic:

| Parameter | Value |
|-----------|-------|
| Server | 192.168.68.127 |
| Port | 1883 |
| Topic | `meshtastic/2/json/LongFast/!69d01ebc` |
| QoS | 0 |
| Output | auto-detect |

### MQTT Out Node

Configuration for the MQTT node to send responses:

| Parameter | Value |
|-----------|-------|
| Server | 192.168.68.127 |
| Port | 1883 |
| Topic | (configure per destination) |
| QoS | 0 |
| Retain | false |

### MQTT Broker Connection

In Node-RED, create broker configuration:

1. Double-click on MQTT node
2. Click pencil next to "Server"
3. Configure:
   - Name: `Meshtastic MQTT`
   - Server: `192.168.68.127`
   - Port: `1883`
   - Client ID: `nodered-client`
4. Save

## Troubleshooting

### No connection to broker

```bash
# Verify Mosquitto is running
sudo systemctl status mosquitto

# Verify port 1883
sudo netstat -tlnp | grep 1883

# Test local connection
mosquitto_sub -h localhost -t "test"
```

### Messages not reaching Node-RED

1. Verify correct topic
2. Verify broker IP in Node-RED
3. Check Node-RED logs for connection errors

```bash
# View Node-RED logs
journalctl -u nodered -f
```

### Message arrives but wrong format

1. Verify topic includes `/json/`
2. Use JSON node in Node-RED to parse
3. Verify payload structure

### Too many messages

To filter only text messages:
```javascript
// In Node-RED Function node
if (msg.payload.type !== "text") {
    return null;
}
return msg;
```

## Monitoring

### View Statistics

```bash
# Install client with statistics
mosquitto_sub -h localhost -t '$SYS/#' -v
```

### Broker Logs

```bash
# View real-time logs
sudo tail -f /var/log/mosquitto/mosquitto.log

# Last 100 lines
sudo tail -100 /var/log/mosquitto/mosquitto.log
```
