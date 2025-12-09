---
sidebar_position: 3
---

# Internal Network

WiFi access point and internal network configuration.

## Network Architecture

```
Internet (Starlink)
       │
       │ 192.168.68.1
       │
   ┌───┴───┐
   │Router │
   └───┬───┘
       │
       │ 192.168.68.x (External Network)
       │
   ┌───┴───────────────┐
   │                   │
   │ reComputer        │
   │ eth0: .130        │
   │ wlan0: 192.168.100.10 │
   │                   │
   └───┬───────────────┘
       │
       │ 192.168.100.x (Internal Network)
       │
   ┌───┴───┐
   │ WiFi  │
   │ AP    │
   └───────┘
       │
   ┌───┴───────────────┐
   │   │   │   │   │   │
   📱  💻  📱  💻  📱  💻
   Connected Devices
   (.100 - .200)
```

## WiFi Access Point

### Connection Details
| Parameter | Value |
|-----------|-------|
| SSID | `MPR114993468244600004-2.4G` |
| Password | `missionconnected` |
| Security | WPA2 |
| Channel | Auto |
| Band | 2.4 GHz |

### hostapd Configuration
`/etc/hostapd/hostapd.conf`:
```
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

### Manage hostapd
```bash
# Check status
sudo systemctl status hostapd

# Restart
sudo systemctl restart hostapd

# View logs
journalctl -u hostapd -f
```

## DHCP Server

### dnsmasq Configuration
`/etc/dnsmasq.conf`:
```
interface=wlan0
dhcp-range=192.168.100.100,192.168.100.200,255.255.255.0,24h
```

### View connected clients
```bash
cat /var/lib/misc/dnsmasq.leases
```

### Manage dnsmasq
```bash
# Check status
sudo systemctl status dnsmasq

# Restart
sudo systemctl restart dnsmasq
```

## NAT Configuration

### Enable IP forwarding
```bash
# Check current setting
cat /proc/sys/net/ipv4/ip_forward

# Enable (temporary)
sudo sysctl -w net.ipv4.ip_forward=1

# Enable (permanent)
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
```

### iptables rules
```bash
# View current rules
sudo iptables -t nat -L

# Add NAT rule
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# Save rules
sudo netfilter-persistent save
```

## Troubleshooting

### WiFi not appearing
```bash
# Check interface
iw dev

# Restart hostapd
sudo systemctl restart hostapd

# Check logs
journalctl -u hostapd -n 50
```

### No internet from WiFi clients
```bash
# Check IP forwarding
cat /proc/sys/net/ipv4/ip_forward

# Check NAT rules
sudo iptables -t nat -L

# Test connectivity from reComputer
ping 8.8.8.8
```

### DHCP not assigning IPs
```bash
# Restart dnsmasq
sudo systemctl restart dnsmasq

# Check leases
cat /var/lib/misc/dnsmasq.leases

# Check logs
journalctl -u dnsmasq -n 50
```
