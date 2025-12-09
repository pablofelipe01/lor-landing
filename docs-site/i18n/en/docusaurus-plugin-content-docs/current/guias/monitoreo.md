---
sidebar_position: 3
---

# Network Monitoring

Guide to monitor the status and operation of the mesh network.

## Monitoring Tools

### 1. Meshtastic App

The easiest way to see network status.

### 2. Gateway Web UI

Access at: http://192.168.68.127

### 3. Node-RED Dashboard

Access at: http://192.168.100.10:1880

### 4. Command Line (SSH)

For administrators with SSH access.

## Monitoring from Meshtastic App

### View Connected Nodes

1. Open Meshtastic app
2. Go to "Nodes" tab
3. View list of nodes in network

Information shown:
- Node name
- Last seen
- Distance (if GPS available)
- Signal (SNR/RSSI)

### Signal Quality

| SNR | Quality | Description |
|-----|---------|-------------|
| > 0 | Excellent | Very strong signal |
| -5 to 0 | Good | Stable connection |
| -10 to -5 | Fair | May have losses |
| below -10 | Poor | Difficult communication |

### View Messages

- "Messages" tab
- Shows all channel messages
- Including Claude responses

## Monitoring via SSH

### Connect to Raspberry Pi

```bash
ssh pi@192.168.68.127
```

### View Meshtastic Nodes

```bash
meshtastic --nodes
```

Example output:
```
╒════════════════════╤════════════════╤════════╤═══════════╕
│ User               │ ID             │ SNR    │ Last Seen │
╞════════════════════╪════════════════╪════════╪═══════════╡
│ Main-Gateway       │ !69d01ebc      │ -      │ now       │
│ Garcia Family      │ !aabbccdd      │ 7.5    │ 2min ago  │
│ North School       │ !11223344      │ 3.2    │ 5min ago  │
╘════════════════════╧════════════════╧════════╧═══════════╛
```

### View Real-Time Messages

```bash
meshtastic --listen
```

### View MQTT Traffic

```bash
mosquitto_sub -h localhost -t "meshtastic/#" -v
```

## Node-RED Monitoring

### Access the Editor

1. Open: http://192.168.100.10:1880
2. View active flows
3. Check debug panel

### Debug Panel

1. Click bug icon (debug) on the right
2. View processed messages
3. Verify data flow

### Verify MQTT Connection

In Node-RED:
1. View MQTT In node
2. Below it should say "connected"
3. If it says "disconnected", there's a problem

## Important Metrics

### Network Health

| Metric | Normal Value | Action if Abnormal |
|--------|--------------|-------------------|
| Nodes seen | more than 1 | Verify trackers |
| Messages/hour | Variable | Normal to fluctuate |
| Claude latency | under 30s | Verify internet |
| MQTT connected | Yes | Restart services |

### Verify Services

On Raspberry Pi:
```bash
# Meshtastic status
sudo systemctl status meshtastic

# MQTT status
sudo systemctl status mosquitto
```

On reComputer:
```bash
# Node-RED status
sudo systemctl status nodered

# WiFi AP status
sudo systemctl status hostapd
```

## System Logs

### Raspberry Pi - Meshtastic

```bash
journalctl -u meshtastic -f
```

### Raspberry Pi - MQTT

```bash
sudo tail -f /var/log/mosquitto/mosquitto.log
```

### reComputer - Node-RED

```bash
journalctl -u nodered -f
```

## Monitoring Dashboard (Optional)

### Create Dashboard in Node-RED

1. Install node-red-dashboard:
   ```bash
   cd ~/.node-red
   npm install node-red-dashboard
   ```

2. Restart Node-RED

3. Create flow with widgets:
   - Gauge for active nodes
   - Chart for messages/hour
   - Text for last message

4. Access at: http://192.168.100.10:1880/ui

## Alerts

### Configure Basic Alerts in Node-RED

```javascript
// Function node to detect problems

// If no messages in 1 hour
var lastMessage = flow.get("lastMessageTime") || 0;
var now = Date.now();

if (now - lastMessage > 3600000) { // 1 hour
    node.warn("ALERT: No messages in over 1 hour");
    // You could send notification here
}

flow.set("lastMessageTime", now);
return msg;
```

## Daily Health Checklist

### Quick Verification

- [ ] Meshtastic gateway responding
- [ ] Node-RED connected to MQTT
- [ ] Internet (Starlink) working
- [ ] At least 1 tracker visible
- [ ] @claude test successful

### Quick Commands

```bash
# From laptop on network

# 1. Ping gateway
ping 192.168.68.127

# 2. Ping reComputer
ping 192.168.68.130

# 3. View nodes
ssh pi@192.168.68.127 "meshtastic --nodes"

# 4. Test MQTT
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -C 1
```

## Monitoring Troubleshooting

### Not Seeing Nodes

1. Verify tracker is powered on
2. Verify channel/PSK configuration
3. Verify region
4. Restart tracker

### MQTT Disconnected

1. Verify mosquitto service:
   ```bash
   sudo systemctl status mosquitto
   ```
2. Restart if needed:
   ```bash
   sudo systemctl restart mosquitto
   ```

### Node-RED Not Responding

1. Verify service:
   ```bash
   sudo systemctl status nodered
   ```
2. View logs:
   ```bash
   journalctl -u nodered -n 50
   ```
3. Restart:
   ```bash
   sudo systemctl restart nodered
   ```
