---
sidebar_position: 2
---

# System Diagnostics

Procedures to diagnose problems in each system component.

## Quick Diagnostics

### General Verification Script

```bash
#!/bin/bash
echo "=== LoRa Mesh Network Diagnostics ==="
echo ""

echo "1. Verifying Gateway (RPI 5)..."
ping -c 1 192.168.68.127 > /dev/null && echo "   ✓ Gateway accessible" || echo "   ✗ Gateway NOT accessible"

echo ""
echo "2. Verifying reComputer..."
ping -c 1 192.168.68.130 > /dev/null && echo "   ✓ reComputer accessible" || echo "   ✗ reComputer NOT accessible"

echo ""
echo "3. Verifying Internet..."
ping -c 1 8.8.8.8 > /dev/null && echo "   ✓ Internet working" || echo "   ✗ No internet"

echo ""
echo "4. Verifying MQTT..."
timeout 2 mosquitto_sub -h 192.168.68.127 -t "test" -C 1 2>/dev/null && echo "   ✓ MQTT working" || echo "   ⚠ MQTT no messages (may be normal)"

echo ""
echo "=== Diagnostics completed ==="
```

## Diagnostics by Component

### 1. Raspberry Pi 5 (Gateway)

#### Verify Accessibility

```bash
# Ping
ping 192.168.68.127

# SSH
ssh pi@192.168.68.127 "echo 'Connection OK'"
```

#### Verify Services

```bash
# Meshtastic status
ssh pi@192.168.68.127 "sudo systemctl status meshtastic"

# MQTT status
ssh pi@192.168.68.127 "sudo systemctl status mosquitto"
```

#### Verify LoRa

```bash
# View USB devices
ssh pi@192.168.68.127 "lsusb"

# View serial ports
ssh pi@192.168.68.127 "ls -la /dev/ttyUSB* /dev/ttyACM* 2>/dev/null"

# Meshtastic information
ssh pi@192.168.68.127 "meshtastic --info"
```

#### Verify Nodes

```bash
ssh pi@192.168.68.127 "meshtastic --nodes"
```

---

### 2. reComputer R1025-10

#### Verify Accessibility

```bash
# External network
ping 192.168.68.130

# Internal network
ping 192.168.100.10
```

#### Verify Node-RED

```bash
# Service status
ssh recomputer@192.168.68.130 "sudo systemctl status nodered"

# Verify port 1880
ssh recomputer@192.168.68.130 "netstat -tlnp | grep 1880"
```

#### Verify WiFi AP

```bash
# hostapd status
ssh recomputer@192.168.68.130 "sudo systemctl status hostapd"

# Connected clients
ssh recomputer@192.168.68.130 "cat /var/lib/misc/dnsmasq.leases"
```

#### Verify Connectivity

```bash
# Ping to internet
ssh recomputer@192.168.68.130 "ping -c 3 8.8.8.8"

# Ping to Claude API
ssh recomputer@192.168.68.130 "ping -c 3 api.anthropic.com"
```

---

### 3. MQTT Broker

#### Verify Service

```bash
# Status
sudo systemctl status mosquitto

# Port listening
netstat -tlnp | grep 1883
```

#### Test Pub/Sub

Terminal 1 (subscribe):
```bash
mosquitto_sub -h 192.168.68.127 -t "test/#" -v
```

Terminal 2 (publish):
```bash
mosquitto_pub -h 192.168.68.127 -t "test/diag" -m "Test $(date)"
```

Message should appear in Terminal 1.

#### View Meshtastic Traffic

```bash
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v
```

---

### 4. LoRa Mesh Network

#### Verify from Gateway

```bash
# View active nodes
meshtastic --nodes

# View local node info
meshtastic --info

# Listen for messages
meshtastic --listen
```

#### Send Test Message

```bash
meshtastic --sendtext "Diagnostic test $(date +%H:%M)"
```

#### Verify Configuration

```bash
meshtastic --get lora
meshtastic --get device
meshtastic --ch-index 0 --info
```

---

### 5. Claude Integration

#### Test API Directly

```bash
curl -X POST https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 100,
    "messages": [{"role": "user", "content": "Say hello"}]
  }'
```

Expected response: JSON with Claude response.

#### Test Complete Flow

1. Send simulated MQTT message:
```bash
mosquitto_pub -h 192.168.68.127 \
  -t "meshtastic/2/json/LongFast/!69d01ebc" \
  -m '{"payload":{"text":"@claude test"},"sender":"!test"}'
```

2. View response in Node-RED debug

---

## System Logs

### Raspberry Pi

```bash
# Meshtastic logs
journalctl -u meshtastic -n 100

# Mosquitto logs
sudo tail -100 /var/log/mosquitto/mosquitto.log

# System logs
dmesg | tail -50
```

### reComputer

```bash
# Node-RED logs
journalctl -u nodered -n 100

# hostapd logs
journalctl -u hostapd -n 50

# dnsmasq logs
journalctl -u dnsmasq -n 50
```

## Diagnostic Table

| Symptom | Check | Command |
|---------|-------|---------|
| No connection to gateway | Ping RPI | `ping 192.168.68.127` |
| No MQTT | mosquitto service | `systemctl status mosquitto` |
| No nodes in mesh | Meshtastic | `meshtastic --nodes` |
| No Claude response | Internet | `ping api.anthropic.com` |
| No internal WiFi | hostapd | `systemctl status hostapd` |
| Node-RED down | Service | `systemctl status nodered` |

## Emergency Restart

### Restart Everything in Order

```bash
# 1. Restart MQTT
ssh pi@192.168.68.127 "sudo systemctl restart mosquitto"

# 2. Restart Meshtastic
ssh pi@192.168.68.127 "sudo systemctl restart meshtastic"

# 3. Restart Node-RED
ssh recomputer@192.168.68.130 "sudo systemctl restart nodered"

# 4. Restart WiFi AP
ssh recomputer@192.168.68.130 "sudo systemctl restart hostapd dnsmasq"
```

### Full Restart (last resort)

```bash
# Restart Raspberry Pi
ssh pi@192.168.68.127 "sudo reboot"

# Wait 2 minutes, then restart reComputer
ssh recomputer@192.168.68.130 "sudo reboot"
```
