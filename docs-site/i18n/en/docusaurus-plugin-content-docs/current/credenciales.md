---
sidebar_position: 7
---

# Credentials and Access

:::warning Confidential Information
This page contains sensitive credentials. Do not share publicly.
:::

## Network Devices

### Raspberry Pi 5 (Gateway)

| Parameter | Value |
|-----------|-------|
| IP | 192.168.68.127 |
| SSH User | pi |
| Function | Meshtastic Gateway |

```bash
ssh pi@192.168.68.127
```

---

### reComputer R1025-10 (Mission Pack)

| Parameter | Value |
|-----------|-------|
| External IP | 192.168.68.130 |
| Internal IP | 192.168.100.10 |
| SSH User | recomputer |
| Function | Node-RED + Claude AI |

```bash
# Access via external network
ssh recomputer@192.168.68.130

# Access via internal network
ssh recomputer@192.168.100.10
```

---

## WiFi

### Internal Network (Mission Pack)

| Parameter | Value |
|-----------|-------|
| SSID | `MPR114993468244600004-2.4G` |
| Password | `missionconnected` |
| Gateway | 192.168.100.1 |
| Type | WPA2-PSK |

---

## Meshtastic

### Channel Configuration

| Parameter | Value |
|-----------|-------|
| Channel Name | Test |
| PSK | `Ml/5IOJQyplnvlzWmnvMrg==` |
| Region | US (915 MHz) |

### Gateway Node ID

| Parameter | Value |
|-----------|-------|
| Node ID | !69d01ebc |
| MQTT Topic | meshtastic/2/json/LongFast/!69d01ebc |

---

## MQTT

### Mosquitto Broker

| Parameter | Value |
|-----------|-------|
| Host | 192.168.68.127 |
| Port | 1883 |
| Authentication | Not required (local network) |

```bash
# Subscribe
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v

# Publish
mosquitto_pub -h 192.168.68.127 -t "test" -m "message"
```

---

## Node-RED

### Web Access

| Network | URL |
|---------|-----|
| External | http://192.168.68.130:1880 |
| Internal | http://192.168.100.10:1880 |

---

## Claude API

### Credentials

| Parameter | Value |
|-----------|-------|
| Endpoint | https://api.anthropic.com/v1/messages |
| Model | claude-sonnet-4-20250514 |
| API Version | 2023-06-01 |

:::danger API Key
The Claude API key is confidential and not included in this public documentation.
Contact the administrator to obtain the current key.
:::

### Required Headers

```
x-api-key: [API_KEY]
anthropic-version: 2023-06-01
content-type: application/json
```

---

## Web Services

### Ports and URLs

| Service | Host | Port | URL |
|---------|------|------|-----|
| Meshtastic Web | 192.168.68.127 | 80 | http://192.168.68.127 |
| MQTT Broker | 192.168.68.127 | 1883 | - |
| Node-RED | 192.168.68.130 | 1880 | http://192.168.68.130:1880 |
| Node-RED (int) | 192.168.100.10 | 1880 | http://192.168.100.10:1880 |

---

## IP Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    NETWORK 192.168.68.x                     │
├─────────────────────────────────────────────────────────────┤
│  192.168.68.1     │ Starlink Router                        │
│  192.168.68.127   │ Raspberry Pi 5 (Gateway)               │
│  192.168.68.130   │ reComputer R1025-10                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    NETWORK 192.168.100.x                    │
├─────────────────────────────────────────────────────────────┤
│  192.168.100.1    │ WiFi AP (reComputer wlan0)             │
│  192.168.100.10   │ reComputer (ethernet alias)            │
│  192.168.100.100+ │ DHCP Clients                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Credential Rotation

### Change Meshtastic PSK

1. Generate new 32-byte base64 PSK
2. Update on ALL devices
3. Update this documentation

### Change Claude API Key

1. Generate new key at console.anthropic.com
2. Update in Node-RED
3. Delete old key
4. Verify functionality

### Change WiFi Password

1. Edit /etc/hostapd/hostapd.conf
2. Restart hostapd
3. Update all client devices
4. Update this documentation

---

## Credential Backup

Keep secure backup of:
- [ ] Claude API key
- [ ] Meshtastic configuration file
- [ ] WiFi password
- [ ] SSH passwords (if changed from default)

Recommended location: Encrypted offline storage.
