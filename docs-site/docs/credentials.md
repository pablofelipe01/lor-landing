---
sidebar_position: 7
---

# Credentials and Access

:::danger Security
This information is confidential. Do not share publicly.
:::

## Network Access

### Internal WiFi
| Parameter | Value |
|-----------|-------|
| SSID | `MPR114993468244600004-2.4G` |
| Password | `missionconnected` |
| Gateway | 192.168.100.10 |
| DHCP Range | 192.168.100.100-200 |

### SSH Access

#### Raspberry Pi 5 (Gateway)
```bash
ssh pi@192.168.68.127
# Password: [ask administrator]
```

#### reComputer R1025-10
```bash
ssh recomputer@192.168.68.130
# or from internal network:
ssh recomputer@192.168.100.10
# Password: [ask administrator]
```

## Meshtastic Configuration

### Channel: Test
| Parameter | Value |
|-----------|-------|
| Name | `Test` |
| PSK | `Ml/5IOJQyplnvlzWmnvMrg==` |
| Region | US (915 MHz) |

### Gateway Node ID
```
!69d01ebc
```

## Web Interfaces

### Node-RED
- **URL**: http://192.168.100.10:1880
- **User**: admin
- **Password**: [ask administrator]

### Meshtastic Web UI
- **URL**: http://192.168.68.127
- No authentication required on local network

## API Keys

### Claude API (Anthropic)
```
x-api-key: sk-ant-api03-xxxxx
```
:::note
Full key stored in Node-RED environment variables.
Contact administrator for access.
:::

## MQTT Topics

### Receive messages
```
meshtastic/2/json/LongFast/!69d01ebc
```

### Send messages
```
meshtastic/2/json/LongFast/!69d01ebc/sendtext
```

## IP Summary Table

| Device | External IP | Internal IP |
|--------|-------------|-------------|
| Raspberry Pi 5 | 192.168.68.127 | - |
| reComputer R1025-10 | 192.168.68.130 | 192.168.100.10 |
| Starlink Router | 192.168.68.1 | - |
| DHCP Clients | - | 192.168.100.100+ |
