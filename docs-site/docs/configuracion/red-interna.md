---
sidebar_position: 3
---

# Red Interna (192.168.100.x)

La red interna proporciona conectividad WiFi local para dispositivos de campo sin acceso directo a la red Starlink.

## Arquitectura de Red

```
┌─────────────────────────────────────────────────────────────┐
│                    RED STARLINK                             │
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
│                RED INTERNA                                  │
│                192.168.100.x                                │
│                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │  Móvil   │    │  Laptop  │    │   IoT    │            │
│   │  .100    │    │  .101    │    │  .102    │            │
│   └──────────┘    └──────────┘    └──────────┘            │
│                                                             │
│   SSID: MPR114993468244600004-2.4G                         │
│   Pass: missionconnected                                    │
└─────────────────────────────────────────────────────────────┘
```

## Punto de Acceso WiFi

### Credenciales

| Parámetro | Valor |
|-----------|-------|
| SSID | `MPR114993468244600004-2.4G` |
| Password | `missionconnected` |
| Seguridad | WPA2-PSK |
| Canal | 7 (2.4 GHz) |
| Gateway | 192.168.100.1 |

### Conectarse

1. Buscar red WiFi `MPR114993468244600004-2.4G`
2. Ingresar contraseña: `missionconnected`
3. Esperar asignación de IP (192.168.100.x)

## Direcciones IP

### Direcciones Fijas

| Dispositivo | IP | Rol |
|-------------|-----|-----|
| reComputer (WiFi AP) | 192.168.100.1 | Gateway/AP |
| reComputer (Ethernet) | 192.168.100.10 | Acceso Node-RED |

### Rango DHCP

| Parámetro | Valor |
|-----------|-------|
| Inicio | 192.168.100.100 |
| Fin | 192.168.100.200 |
| Lease Time | 24 horas |
| DNS | 192.168.100.1 |

## Servicios Accesibles

### Desde Red Interna

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Node-RED | http://192.168.100.10:1880 | Editor de flujos |
| Node-RED UI | http://192.168.100.10:1880/ui | Dashboard |

### Rutas a Red Externa

El reComputer actúa como router entre las redes:

```
Red Interna (192.168.100.x)
       │
       ▼
reComputer (NAT)
       │
       ▼
Red Externa (192.168.68.x)
       │
       ▼
Internet (Starlink)
```

## Configuración del Access Point

### Archivo hostapd

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

### Servicio hostapd

```bash
# Ver estado
sudo systemctl status hostapd

# Reiniciar
sudo systemctl restart hostapd

# Ver logs
journalctl -u hostapd -f
```

## Configuración DHCP (dnsmasq)

### Archivo dnsmasq

```bash
# /etc/dnsmasq.conf

interface=wlan0
dhcp-range=192.168.100.100,192.168.100.200,255.255.255.0,24h
address=/conectividad.local/192.168.100.10
```

### Servicio dnsmasq

```bash
# Ver estado
sudo systemctl status dnsmasq

# Reiniciar
sudo systemctl restart dnsmasq

# Ver clientes conectados
cat /var/lib/misc/dnsmasq.leases
```

## NAT y Forwarding

### Habilitar IP Forwarding

```bash
# Temporal
sudo sysctl -w net.ipv4.ip_forward=1

# Permanente
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Reglas iptables

```bash
# NAT para red interna
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# Permitir forwarding
sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT

# Guardar reglas
sudo iptables-save > /etc/iptables.rules
```

## Diagnóstico

### Ver Clientes Conectados

```bash
# Vía dnsmasq
cat /var/lib/misc/dnsmasq.leases

# Vía hostapd
hostapd_cli list_sta

# Vía ARP
arp -a | grep 192.168.100

# Vía iw
iw dev wlan0 station dump
```

### Verificar Conectividad

```bash
# Desde cliente conectado:

# Ping al gateway
ping 192.168.100.1

# Ping a Node-RED
ping 192.168.100.10

# Ping a red externa
ping 192.168.68.127

# Ping a internet
ping 8.8.8.8
```

### Ver Estadísticas WiFi

```bash
# Información del AP
iw dev wlan0 info

# Estadísticas de estaciones
iw dev wlan0 station dump

# Calidad de señal
iwconfig wlan0
```

## Casos de Uso

### Acceso a Node-RED desde Campo

1. Conectar móvil/laptop al WiFi `MPR114993468244600004-2.4G`
2. Abrir navegador
3. Ir a `http://192.168.100.10:1880`
4. Administrar flujos de Node-RED

### Configuración de Trackers

1. Conectar al WiFi de la red interna
2. Usar app Meshtastic para configurar trackers vía Bluetooth
3. Los trackers se comunican vía LoRa, no necesitan WiFi

### Monitoreo en Campo

1. Conectar dispositivo al WiFi
2. Acceder a Node-RED dashboard
3. Ver mensajes en tiempo real
4. Verificar estado de la red mesh

## Troubleshooting

### WiFi no aparece

```bash
# Verificar hostapd
sudo systemctl status hostapd
journalctl -u hostapd -n 50

# Verificar interface
ip link show wlan0
iw dev wlan0 info

# Reiniciar servicios
sudo systemctl restart hostapd dnsmasq
```

### No se asigna IP

```bash
# Verificar dnsmasq
sudo systemctl status dnsmasq
journalctl -u dnsmasq -n 50

# Ver leases activos
cat /var/lib/misc/dnsmasq.leases

# Verificar rango DHCP
grep dhcp-range /etc/dnsmasq.conf
```

### Sin acceso a internet desde red interna

```bash
# Verificar IP forwarding
cat /proc/sys/net/ipv4/ip_forward
# Debe ser 1

# Verificar NAT
sudo iptables -t nat -L POSTROUTING

# Verificar rutas
ip route

# Probar desde reComputer
ping 8.8.8.8
```

### Conexión lenta

1. Verificar interferencia de canales WiFi
2. Cambiar canal en hostapd.conf
3. Verificar cantidad de clientes
4. Verificar señal de Starlink
