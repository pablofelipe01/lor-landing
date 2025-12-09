---
sidebar_position: 2
---

# reComputer R1025-10 - Mission Pack

The reComputer R1025-10 is the brain of the system, running Node-RED and the Claude AI integration.

## Specifications

| Feature | Value |
|---------|-------|
| Model | Seeed Studio reComputer R1025-10 |
| External Network IP | 192.168.68.130 |
| Internal Network IP | 192.168.100.10 |
| WiFi AP | 192.168.100.1 |
| Function | Node-RED + Claude AI Server |

## Role in the System

```
┌─────────────────────────────────────────────────────────────┐
│                reComputer R1025-10                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Node-RED                           │   │
│  │                   :1880                              │   │
│  │                                                      │   │
│  │  ┌─────────┐   ┌─────────┐   ┌─────────┐           │   │
│  │  │  MQTT   │──►│ Detect  │──►│ Claude  │           │   │
│  │  │  Input  │   │ @claude │   │   API   │           │   │
│  │  └─────────┘   └─────────┘   └─────────┘           │   │
│  │       │                            │                │   │
│  │       │                            │                │   │
│  │       └────────────────────────────┘                │   │
│  │                    │                                 │   │
│  │             ┌──────▼──────┐                         │   │
│  │             │    MQTT     │                         │   │
│  │             │   Output    │                         │   │
│  │             └─────────────┘                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌───────────────┐              ┌───────────────┐          │
│  │   Ethernet    │              │   WiFi AP     │          │
│  │ 192.168.68.130│              │192.168.100.1  │          │
│  │ 192.168.100.10│              │               │          │
│  └───────────────┘              └───────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

## Network Interfaces

### Ethernet (eth0)

The reComputer has two IPs on the ethernet interface:

- **192.168.68.130**: External network (Starlink)
- **192.168.100.10**: Internal network

### WiFi Access Point

The reComputer creates a WiFi access point:

| Parameter | Value |
|-----------|-------|
| SSID | `MPR114993468244600004-2.4G` |
| Password | `missionconnected` |
| Gateway IP | 192.168.100.1 |
| DHCP Range | 192.168.100.100 - 192.168.100.200 |

## Access

### SSH (External Network)

```bash
ssh recomputer@192.168.68.130
```

### SSH (Internal Network)

```bash
ssh recomputer@192.168.100.10
```

### Node-RED

Open in browser:
```
http://192.168.100.10:1880
```

or from external network:
```
http://192.168.68.130:1880
```

## Active Services

### Node-RED

```bash
# Check status
sudo systemctl status nodered

# Restart
sudo systemctl restart nodered

# View logs
journalctl -u nodered -f
```

### WiFi AP (hostapd)

```bash
# Check status
sudo systemctl status hostapd

# Restart
sudo systemctl restart hostapd
```

### DHCP Server (dnsmasq)

```bash
# Check status
sudo systemctl status dnsmasq

# View connected clients
cat /var/lib/misc/dnsmasq.leases
```

## Useful Commands

### View Connected WiFi Devices

```bash
# Via hostapd
hostapd_cli list_sta

# Via ARP
arp -a | grep 192.168.100

# Via dnsmasq leases
cat /var/lib/misc/dnsmasq.leases
```

### Monitor Traffic

```bash
# Install iftop if not installed
sudo apt install iftop

# View real-time traffic
sudo iftop -i eth0
```

### Verify Connectivity

```bash
# Ping to Raspberry Pi
ping 192.168.68.127

# Ping to internet
ping 8.8.8.8

# Verify MQTT
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v
```

## Troubleshooting

### Node-RED not responding

```bash
# Verify process
ps aux | grep node-red

# Restart service
sudo systemctl restart nodered

# View error logs
journalctl -u nodered -n 50
```

### WiFi AP not working

```bash
# Verify hostapd
sudo systemctl status hostapd

# View logs
journalctl -u hostapd -n 50

# Restart services
sudo systemctl restart hostapd dnsmasq
```

### No internet connectivity

```bash
# Verify gateway
ip route

# Verify DNS
nslookup google.com

# Verify firewall
sudo iptables -L
```

## Maintenance

### Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### Update Node-RED

```bash
sudo npm install -g --unsafe-perm node-red
sudo systemctl restart nodered
```

### Clean Logs

```bash
sudo journalctl --vacuum-time=7d
```
