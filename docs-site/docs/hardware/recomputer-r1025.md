---
sidebar_position: 2
---

# reComputer R1025-10 - Mission Pack

El reComputer R1025-10 es el cerebro del sistema, ejecutando Node-RED y la integración con Claude AI.

## Especificaciones

| Característica | Valor |
|----------------|-------|
| Modelo | Seeed Studio reComputer R1025-10 |
| IP Red Externa | 192.168.68.130 |
| IP Red Interna | 192.168.100.10 |
| WiFi AP | 192.168.100.1 |
| Función | Servidor Node-RED + Claude AI |

## Rol en el Sistema

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

## Interfaces de Red

### Ethernet (eth0)

El reComputer tiene dos IPs en la interfaz ethernet:

- **192.168.68.130**: Red externa (Starlink)
- **192.168.100.10**: Red interna

### WiFi Access Point

El reComputer crea un punto de acceso WiFi:

| Parámetro | Valor |
|-----------|-------|
| SSID | `MPR114993468244600004-2.4G` |
| Password | `missionconnected` |
| IP Gateway | 192.168.100.1 |
| DHCP Range | 192.168.100.100 - 192.168.100.200 |

## Acceso

### SSH (Red Externa)

```bash
ssh recomputer@192.168.68.130
```

### SSH (Red Interna)

```bash
ssh recomputer@192.168.100.10
```

### Node-RED

Abrir en navegador:
```
http://192.168.100.10:1880
```

o desde red externa:
```
http://192.168.68.130:1880
```

## Servicios Activos

### Node-RED

```bash
# Ver estado
sudo systemctl status nodered

# Reiniciar
sudo systemctl restart nodered

# Ver logs
journalctl -u nodered -f
```

### WiFi AP (hostapd)

```bash
# Ver estado
sudo systemctl status hostapd

# Reiniciar
sudo systemctl restart hostapd
```

### DHCP Server (dnsmasq)

```bash
# Ver estado
sudo systemctl status dnsmasq

# Ver clientes conectados
cat /var/lib/misc/dnsmasq.leases
```

## Configuración de Red

### Interfaz Ethernet

```bash
# /etc/network/interfaces o netplan

# Red externa
auto eth0
iface eth0 inet static
    address 192.168.68.130
    netmask 255.255.255.0
    gateway 192.168.68.1

# Red interna (alias)
auto eth0:1
iface eth0:1 inet static
    address 192.168.100.10
    netmask 255.255.255.0
```

### Access Point WiFi

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

## Node-RED

### Ubicación de Flujos

```bash
# Directorio de Node-RED
~/.node-red/

# Archivo de flujos
~/.node-red/flows.json

# Configuración
~/.node-red/settings.js
```

### Nodos Instalados

- node-red-contrib-mqtt
- (otros nodos según necesidad)

### Backup de Flujos

```bash
# Exportar flujos
cp ~/.node-red/flows.json ~/flows-backup-$(date +%Y%m%d).json

# Restaurar flujos
cp ~/flows-backup.json ~/.node-red/flows.json
sudo systemctl restart nodered
```

## Comandos Útiles

### Ver Dispositivos Conectados al WiFi

```bash
# Via hostapd
hostapd_cli list_sta

# Via ARP
arp -a | grep 192.168.100

# Via dnsmasq leases
cat /var/lib/misc/dnsmasq.leases
```

### Monitorear Tráfico

```bash
# Instalar iftop si no está
sudo apt install iftop

# Ver tráfico en tiempo real
sudo iftop -i eth0
```

### Verificar Conectividad

```bash
# Ping a Raspberry Pi
ping 192.168.68.127

# Ping a internet
ping 8.8.8.8

# Verificar MQTT
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v
```

## Troubleshooting

### Node-RED no responde

```bash
# Verificar proceso
ps aux | grep node-red

# Reiniciar servicio
sudo systemctl restart nodered

# Ver logs de error
journalctl -u nodered -n 50
```

### WiFi AP no funciona

```bash
# Verificar hostapd
sudo systemctl status hostapd

# Ver logs
journalctl -u hostapd -n 50

# Reiniciar servicios
sudo systemctl restart hostapd dnsmasq
```

### Sin conectividad a internet

```bash
# Verificar gateway
ip route

# Verificar DNS
nslookup google.com

# Verificar firewall
sudo iptables -L
```

## Mantenimiento

### Actualizar Sistema

```bash
sudo apt update
sudo apt upgrade -y
```

### Actualizar Node-RED

```bash
sudo npm install -g --unsafe-perm node-red
sudo systemctl restart nodered
```

### Limpiar Logs

```bash
sudo journalctl --vacuum-time=7d
```
