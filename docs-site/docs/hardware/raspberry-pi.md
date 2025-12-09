---
sidebar_position: 1
---

# Raspberry Pi 5 (Gateway)

The Raspberry Pi 5 serves as the main gateway of the mesh network.

## Specifications

| Component | Details |
|-----------|---------|
| Model | Raspberry Pi 5 8GB |
| Storage | 64GB microSD |
| OS | Raspberry Pi OS Lite (64-bit) |
| IP | 192.168.68.127 |

## Functions

1. **LoRa Gateway** - Connects LoRa module to IP network
2. **MQTT Broker** - Runs Mosquitto for internal messaging
3. **Meshtastic Daemon** - Manages LoRa communication

## Connected Hardware

- **Heltec ESP32 LoRa V3** via USB
- **Power**: Official 27W USB-C power supply

## Installed Services

### Meshtastic
```bash
# Check status
sudo systemctl status meshtastic

# View logs
journalctl -u meshtastic -f

# Restart
sudo systemctl restart meshtastic
```

### Mosquitto (MQTT)
```bash
# Check status
sudo systemctl status mosquitto

# Test connection
mosquitto_sub -h localhost -t "test"
```

## Access

### SSH
```bash
ssh pi@192.168.68.127
```

### Web Interface
```
http://192.168.68.127
```

## Useful Commands

### View connected nodes
```bash
meshtastic --nodes
```

### View node info
```bash
meshtastic --info
```

### Send test message
```bash
meshtastic --sendtext "Test message"
```

### Listen to messages
```bash
meshtastic --listen
```

## Maintenance

### Check disk space
```bash
df -h
```

### Check memory
```bash
free -h
```

### Check temperature
```bash
vcgencmd measure_temp
```

### Update system
```bash
sudo apt update && sudo apt upgrade -y
```
