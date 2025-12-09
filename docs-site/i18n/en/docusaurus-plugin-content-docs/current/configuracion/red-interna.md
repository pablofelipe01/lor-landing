---
sidebar_position: 3
---

# Internal Network (192.168.100.x)

The internal network provides local WiFi connectivity for field devices without direct access to the Starlink network.

## Network Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    STARLINK NETWORK                         │
│                    192.168.68.x                             │
│                                                             │
│   ┌──────────┐    ┌──────────┐                             │
│   │  RPI 5   │    │reComputer│                             │
│   │  .127    │    │  .130    │                             │
│   └──────────┘    └────┬─────┘                             │
│                        │                                    │
└────────────────────────┼────────────────────────────────────┘
                         │
                         │ eth0:1 (192.168.100.10)
                         │ wlan0  (192.168.100.1)
                         │
┌────────────────────────┼────────────────────────────────────┐
│                        ▼                                    │
│                INTERNAL NETWORK                             │
│                192.168.100.x                                │
│                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │  Mobile  │    │  Laptop  │    │   IoT    │            │
│   │  .100    │    │  .101    │    │  .102    │            │
│   └──────────┘    └──────────┘    └──────────┘            │
│                                                             │
│   SSID: MPR114993468244600004-2.4G                         │
│   Pass: missionconnected                                    │
└─────────────────────────────────────────────────────────────┘
```

## WiFi Access Point

### Credentials

| Parameter | Value |
|-----------|-------|
| SSID | `MPR114993468244600004-2.4G` |
| Password | `missionconnected` |
| Security | WPA2-PSK |
| Channel | 7 (2.4 GHz) |
| Gateway | 192.168.100.1 |

### Connect

1. Search for WiFi network `MPR114993468244600004-2.4G`
2. Enter password: `missionconnected`
3. Wait for IP assignment (192.168.100.x)

## IP Addresses

### Fixed Addresses

| Device | IP | Role |
|--------|-----|------|
| reComputer (WiFi AP) | 192.168.100.1 | Gateway/AP |
| reComputer (Ethernet) | 192.168.100.10 | Node-RED access |

### DHCP Range

| Parameter | Value |
|-----------|-------|
| Start | 192.168.100.100 |
| End | 192.168.100.200 |
| Lease Time | 24 hours |
| DNS | 192.168.100.1 |

## Accessible Services

### From Internal Network

| Service | URL | Description |
|---------|-----|-------------|
| Node-RED | http://192.168.100.10:1880 | Flow editor |
| Node-RED UI | http://192.168.100.10:1880/ui | Dashboard |

### Routes to External Network

The reComputer acts as router between networks:

```
Internal Network (192.168.100.x)
       │
       ▼
reComputer (NAT)
       │
       ▼
External Network (192.168.68.x)
       │
       ▼
Internet (Starlink)
```

## Access Point Configuration

### hostapd File

```bash
# /etc/hostapd/hostapd.conf

interface=wlan0
driver=nl80211
ssid=MPR114993468244600004-2.4G
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=missionconnected
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
```

### hostapd Service

```bash
# Check status
sudo systemctl status hostapd

# Restart
sudo systemctl restart hostapd

# View logs
journalctl -u hostapd -f
```

## DHCP Configuration (dnsmasq)

### dnsmasq File

```bash
# /etc/dnsmasq.conf

interface=wlan0
dhcp-range=192.168.100.100,192.168.100.200,255.255.255.0,24h
address=/conectividad.local/192.168.100.10
```

### dnsmasq Service

```bash
# Check status
sudo systemctl status dnsmasq

# Restart
sudo systemctl restart dnsmasq

# View connected clients
cat /var/lib/misc/dnsmasq.leases
```

## NAT and Forwarding

### Enable IP Forwarding

```bash
# Temporary
sudo sysctl -w net.ipv4.ip_forward=1

# Permanent
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### iptables Rules

```bash
# NAT for internal network
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# Allow forwarding
sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT

# Save rules
sudo iptables-save > /etc/iptables.rules
```

## Diagnostics

### View Connected Clients

```bash
# Via dnsmasq
cat /var/lib/misc/dnsmasq.leases

# Via hostapd
hostapd_cli list_sta

# Via ARP
arp -a | grep 192.168.100

# Via iw
iw dev wlan0 station dump
```

### Verify Connectivity

```bash
# From connected client:

# Ping to gateway
ping 192.168.100.1

# Ping to Node-RED
ping 192.168.100.10

# Ping to external network
ping 192.168.68.127

# Ping to internet
ping 8.8.8.8
```

### View WiFi Statistics

```bash
# AP information
iw dev wlan0 info

# Station statistics
iw dev wlan0 station dump

# Signal quality
iwconfig wlan0
```

## Use Cases

### Access Node-RED from Field

1. Connect mobile/laptop to WiFi `MPR114993468244600004-2.4G`
2. Open browser
3. Go to `http://192.168.100.10:1880`
4. Manage Node-RED flows

### Configure Trackers

1. Connect to internal WiFi
2. Use Meshtastic app to configure trackers via Bluetooth
3. Trackers communicate via LoRa, don't need WiFi

### Field Monitoring

1. Connect device to WiFi
2. Access Node-RED dashboard
3. View messages in real-time
4. Verify mesh network status

## Troubleshooting

### WiFi not appearing

```bash
# Verify hostapd
sudo systemctl status hostapd
journalctl -u hostapd -n 50

# Verify interface
ip link show wlan0
iw dev wlan0 info

# Restart services
sudo systemctl restart hostapd dnsmasq
```

### Not getting IP

```bash
# Verify dnsmasq
sudo systemctl status dnsmasq
journalctl -u dnsmasq -n 50

# View active leases
cat /var/lib/misc/dnsmasq.leases

# Verify DHCP range
grep dhcp-range /etc/dnsmasq.conf
```

### No internet from internal network

```bash
# Verify IP forwarding
cat /proc/sys/net/ipv4/ip_forward
# Should be 1

# Verify NAT
sudo iptables -t nat -L POSTROUTING

# Verify routes
ip route

# Test from reComputer
ping 8.8.8.8
```

### Slow connection

1. Check WiFi channel interference
2. Change channel in hostapd.conf
3. Verify number of clients
4. Verify Starlink signal
