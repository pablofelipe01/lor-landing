---
sidebar_position: 2
---

# reComputer R1025-10

The reComputer R1025-10 serves as the AI integration point and internal WiFi access point.

## Specifications

| Component | Details |
|-----------|---------|
| Model | Seeed Studio reComputer R1025-10 |
| CPU | ARM Cortex |
| RAM | 4GB |
| Storage | 32GB eMMC |
| Network | Dual Ethernet + WiFi |

## Network Configuration

| Interface | IP | Function |
|-----------|-----|---------|
| eth0 | 192.168.68.130 | External (to Starlink) |
| eth1/wlan0 | 192.168.100.10 | Internal (WiFi AP) |

## Functions

1. **Node-RED Server** - Processes messages and integrates with Claude
2. **WiFi Access Point** - Provides internal network connectivity
3. **NAT Router** - Routes traffic between internal and external networks

## Installed Services

### Node-RED
```bash
# Check status
sudo systemctl status nodered

# View logs
journalctl -u nodered -f

# Restart
sudo systemctl restart nodered

# Access
http://192.168.100.10:1880
```

### hostapd (WiFi AP)
```bash
# Check status
sudo systemctl status hostapd

# Restart
sudo systemctl restart hostapd
```

### dnsmasq (DHCP/DNS)
```bash
# Check status
sudo systemctl status dnsmasq

# View assigned leases
cat /var/lib/misc/dnsmasq.leases
```

## Access

### SSH (from external network)
```bash
ssh recomputer@192.168.68.130
```

### SSH (from internal network)
```bash
ssh recomputer@192.168.100.10
```

### Node-RED
```
http://192.168.100.10:1880
```

## WiFi Configuration

### Access Point Details
| Parameter | Value |
|-----------|-------|
| SSID | `MPR114993468244600004-2.4G` |
| Password | `missionconnected` |
| Channel | Auto |
| Band | 2.4 GHz |

### Check connected clients
```bash
cat /var/lib/misc/dnsmasq.leases
```

## Maintenance

### Check internet connectivity
```bash
ping 8.8.8.8
ping api.anthropic.com
```

### Check routes
```bash
ip route
```

### Check NAT rules
```bash
sudo iptables -t nat -L
```
