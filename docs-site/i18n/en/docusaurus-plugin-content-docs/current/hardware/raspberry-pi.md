---
sidebar_position: 1
---

# Raspberry Pi 5 - Main Gateway

The Raspberry Pi 5 acts as the main gateway for the Meshtastic network, connecting the LoRa mesh network with the IP infrastructure.

## Specifications

| Feature | Value |
|---------|-------|
| Model | Raspberry Pi 5 |
| External Network IP | 192.168.68.127 |
| Function | Meshtastic Gateway |
| Operating System | Raspberry Pi OS (64-bit) |
| Meshtastic | meshtastic-firmware |

## Role in the System

```
┌─────────────────────────────────────────────────────────────┐
│                    Raspberry Pi 5                           │
│                    192.168.68.127                           │
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │ Meshtastic  │    │    MQTT     │    │   Serial    │     │
│  │   Web UI    │    │   Broker    │    │   LoRa      │     │
│  │   :80       │    │   :1883     │    │   Module    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                  │                  │             │
│         └──────────────────┼──────────────────┘             │
│                            │                                │
│                     Meshtastic                              │
│                     Daemon                                  │
└─────────────────────────────────────────────────────────────┘
                             │
                             │ Ethernet
                             ▼
                    Network 192.168.68.x
```

## Access

### SSH

```bash
ssh pi@192.168.68.127
```

### Meshtastic Web UI

Open in browser:
```
http://192.168.68.127
```

## Active Services

### Meshtastic Server

The Meshtastic service runs automatically on boot:

```bash
# Check status
sudo systemctl status meshtastic

# Restart service
sudo systemctl restart meshtastic

# View logs
journalctl -u meshtastic -f
```

### MQTT Broker (Mosquitto)

The MQTT broker enables communication between Meshtastic and Node-RED:

```bash
# Check status
sudo systemctl status mosquitto

# Restart
sudo systemctl restart mosquitto

# View messages in real-time
mosquitto_sub -h localhost -t "meshtastic/#" -v
```

## Network Configuration

The Raspberry Pi is configured with a static IP:

```bash
# Configuration file
/etc/dhcpcd.conf

# Relevant configuration:
interface eth0
static ip_address=192.168.68.127/24
static routers=192.168.68.1
static domain_name_servers=8.8.8.8 8.8.4.4
```

## Connected LoRa Module

The Raspberry Pi has a LoRa module connected via USB or GPIO:

- **Type**: Meshtastic compatible
- **Frequency**: 915 MHz (US Region)
- **Connection**: USB (/dev/ttyUSB0 or /dev/ttyACM0)

### Verify Connection

```bash
# List USB devices
lsusb

# View serial ports
ls -la /dev/tty*

# Verify Meshtastic detects the device
meshtastic --info
```

## Useful Meshtastic Commands

```bash
# View node information
meshtastic --info

# View connected nodes
meshtastic --nodes

# Send test message
meshtastic --sendtext "Test from gateway"

# Configure region
meshtastic --set lora.region US

# View complete configuration
meshtastic --get all
```

## Monitoring

### View Incoming Messages

```bash
# Via MQTT
mosquitto_sub -h localhost -t "meshtastic/2/json/#" -v

# Via meshtastic CLI
meshtastic --listen
```

### System Logs

```bash
# Meshtastic logs
journalctl -u meshtastic -f

# System logs
dmesg | tail -50

# Disk space
df -h
```

## Troubleshooting

### LoRa module not detected

1. Verify physical connection
2. Check `dmesg` for USB errors
3. Restart the Raspberry Pi

```bash
dmesg | grep -i usb
sudo reboot
```

### No MQTT communication

1. Verify Mosquitto is running
2. Test local connection

```bash
sudo systemctl status mosquitto
mosquitto_pub -h localhost -t "test" -m "hello"
mosquitto_sub -h localhost -t "test"
```

### Meshtastic won't start

```bash
# View detailed logs
journalctl -u meshtastic -n 100

# Reinstall if necessary
pip3 install --upgrade meshtastic
```

## Maintenance

### Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### Update Meshtastic

```bash
pip3 install --upgrade meshtastic
sudo systemctl restart meshtastic
```

### Configuration Backup

```bash
# Export Meshtastic configuration
meshtastic --export-config > meshtastic-backup.yaml

# Backup important files
tar -czf rpi-backup.tar.gz /etc/dhcpcd.conf /etc/mosquitto/
```
