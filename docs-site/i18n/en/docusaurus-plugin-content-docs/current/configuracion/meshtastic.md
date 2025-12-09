---
sidebar_position: 1
---

# Meshtastic Configuration

Complete guide to configure Meshtastic on all network devices.

## Network Parameters

### Base Configuration

| Parameter | Value |
|-----------|-------|
| Region | US |
| Frequency | 915 MHz |
| Channel | Test |
| PSK | `Ml/5IOJQyplnvlzWmnvMrg==` |

### LoRa Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Region | US | Frequencies 902-928 MHz |
| Modem Preset | LONG_FAST | Balance range/speed |
| Hop Limit | 3 | Maximum hops in mesh |
| TX Power | 22 dBm | Maximum power |

## Configuration by Device

### Gateway (Raspberry Pi 5)

```yaml
# Recommended configuration for gateway

lora:
  region: US
  modem_preset: LONG_FAST
  hop_limit: 3
  tx_power: 22

device:
  role: ROUTER
  serial_enabled: true
  debug_log_enabled: false

position:
  gps_enabled: false
  fixed_position: true
  # Configure fixed gateway coordinates

mqtt:
  enabled: true
  address: localhost
  username: ""
  password: ""
  root_topic: meshtastic
```

### T1000-E Trackers (Users)

```yaml
# Configuration for user devices

lora:
  region: US
  modem_preset: LONG_FAST
  hop_limit: 3
  tx_power: 22

device:
  role: CLIENT_MUTE  # Saves battery

position:
  gps_enabled: true
  gps_update_interval: 300  # 5 minutes
  position_broadcast_secs: 900  # 15 minutes
```

### Repeater/Router

```yaml
# Configuration for repeater node

lora:
  region: US
  modem_preset: LONG_FAST
  hop_limit: 3
  tx_power: 22

device:
  role: ROUTER

position:
  gps_enabled: false
  fixed_position: true
```

## Channel Configuration

### Create "Test" Channel

Via CLI:
```bash
meshtastic --ch-set name "Test" --ch-index 0
meshtastic --ch-set psk "Ml/5IOJQyplnvlzWmnvMrg==" --ch-index 0
```

Via App:
1. Open channel settings
2. Edit primary channel
3. Name: `Test`
4. PSK: `Ml/5IOJQyplnvlzWmnvMrg==`
5. Save

### Verify Channel

```bash
meshtastic --ch-index 0 --info
```

Expected output:
```
Channel 0:
  Name: Test
  PSK: [configured]
  Uplink/Downlink: enabled
```

## Meshtastic CLI Commands

### General Information

```bash
# View node information
meshtastic --info

# View nodes in mesh
meshtastic --nodes

# View all configuration
meshtastic --get all
```

### Radio Configuration

```bash
# Configure region
meshtastic --set lora.region US

# Configure preset
meshtastic --set lora.modem_preset LONG_FAST

# Configure TX power
meshtastic --set lora.tx_power 22
```

### Device Configuration

```bash
# Configure role
meshtastic --set device.role ROUTER

# Configure node name
meshtastic --set-owner "Main-Gateway"

# Enable serial
meshtastic --set device.serial_enabled true
```

### Messages

```bash
# Send broadcast message
meshtastic --sendtext "Hello mesh!"

# Send direct message (by node ID)
meshtastic --dest !aabbccdd --sendtext "Private message"

# Listen for messages
meshtastic --listen
```

### Export/Import Configuration

```bash
# Export current configuration
meshtastic --export-config > config-backup.yaml

# Import configuration
meshtastic --configure config-backup.yaml
```

## MQTT Configuration

### On the Gateway

```bash
# Enable MQTT
meshtastic --set mqtt.enabled true

# Configure local broker
meshtastic --set mqtt.address localhost

# Configure root topic
meshtastic --set mqtt.root meshtastic
```

### MQTT Topics

| Topic | Description |
|-------|-------------|
| `meshtastic/2/json/LongFast/!nodeId` | JSON messages |
| `meshtastic/2/c/LongFast/!nodeId` | Encrypted channel |
| `meshtastic/2/stat/!nodeId` | Node status |

## Device Roles

| Role | Description | Use |
|------|-------------|-----|
| CLIENT | Standard client | General use |
| CLIENT_MUTE | Silent client | Battery saving |
| CLIENT_HIDDEN | Hidden client | No position |
| ROUTER | Dedicated router | Fixed nodes |
| ROUTER_CLIENT | Router + client | Hybrid |
| REPEATER | Pure repeater | Forwarding only |

## Modem Presets

| Preset | Speed | Range | Use |
|--------|-------|-------|-----|
| SHORT_FAST | Fast | Short | High density |
| SHORT_SLOW | Slow | Short | - |
| MEDIUM_FAST | Medium | Medium | Balance |
| MEDIUM_SLOW | Slow | Medium | - |
| LONG_FAST | Medium | Long | **Recommended** |
| LONG_SLOW | Slow | Very long | Maximum range |
| VERY_LONG_SLOW | Very slow | Extreme | Special |

## Configuration Verification

### Checklist

- [ ] Region configured: US
- [ ] Channel configured: Test
- [ ] PSK configured correctly
- [ ] MQTT enabled (gateway only)
- [ ] Appropriate role for function
- [ ] Antenna connected

### Connectivity Test

1. Send message from tracker
2. Verify at gateway:
```bash
mosquitto_sub -h localhost -t "meshtastic/#" -v
```
3. Confirm message reception

## Troubleshooting

### Won't connect to mesh

1. Verify region matches on all devices
2. Verify identical channel and PSK
3. Verify antenna connected
4. Restart device

### Messages not reaching MQTT

1. Verify MQTT enabled
2. Verify Mosquitto broker running
3. Verify configured topic
4. Review Meshtastic logs

### Reduced range

1. Verify TX power
2. Verify antenna
3. Change to LONG_SLOW preset
4. Elevate gateway antenna
