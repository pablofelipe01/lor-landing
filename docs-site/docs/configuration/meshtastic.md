---
sidebar_position: 1
---

# Meshtastic Configuration

Complete guide to configure Meshtastic devices in the network.

## Standard Configuration

All devices must use these settings to communicate:

| Parameter | Value |
|-----------|-------|
| Region | US |
| Channel Name | Test |
| PSK | `Ml/5IOJQyplnvlzWmnvMrg==` |

## Region Configuration

### Via App
1. Open Meshtastic app
2. Go to Settings → Radio Configuration
3. Select Region: **US**
4. Save (device will restart)

### Via CLI
```bash
meshtastic --set lora.region US
```

## Channel Configuration

### Via App
1. Settings → Channels
2. Edit Channel 0 (Primary)
3. Set:
   - Name: `Test`
   - PSK: `Ml/5IOJQyplnvlzWmnvMrg==`
4. Save

### Via CLI
```bash
meshtastic --ch-set name "Test" --ch-index 0
meshtastic --ch-set psk "Ml/5IOJQyplnvlzWmnvMrg==" --ch-index 0
```

### Via QR Code
Scan QR from an already configured device to copy channel settings.

## Device Roles

| Role | Use Case | Battery |
|------|----------|---------|
| CLIENT | Default, participates in routing | Medium |
| CLIENT_MUTE | End users, no routing | Low |
| ROUTER | Fixed nodes, always routes | High |
| ROUTER_CLIENT | Router that also sends messages | High |

### Set role via CLI
```bash
meshtastic --set device.role CLIENT_MUTE
```

## Gateway Configuration

The Raspberry Pi gateway has special configuration:

```bash
# Enable MQTT
meshtastic --set mqtt.enabled true
meshtastic --set mqtt.address 127.0.0.1

# Set as router
meshtastic --set device.role ROUTER

# Configure position (optional)
meshtastic --set position.fixed_position true
meshtastic --setlat 19.4326
meshtastic --setlon -99.1332
```

## MQTT Settings

```bash
# Enable MQTT uplink
meshtastic --set mqtt.enabled true
meshtastic --set mqtt.address 127.0.0.1
meshtastic --set mqtt.username ""
meshtastic --set mqtt.password ""
meshtastic --set mqtt.encryption_enabled false
meshtastic --set mqtt.json_enabled true
```

## Verify Configuration

### Check all settings
```bash
meshtastic --info
```

### Check channel settings
```bash
meshtastic --ch-index 0 --info
```

### Check connected nodes
```bash
meshtastic --nodes
```

## Common Issues

### Region mismatch
All devices must use the same region. US region uses 915 MHz frequency band.

### PSK mismatch
The PSK must be exactly the same. Copy/paste to avoid typos.

### Role issues
CLIENT_MUTE cannot route messages. Use CLIENT or ROUTER for relay nodes.
