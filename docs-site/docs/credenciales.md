---
sidebar_position: 7
---

# Credenciales y Accesos

:::warning Información Confidencial
Esta página contiene credenciales sensibles. No compartir públicamente.
:::

## Dispositivos de Red

### Raspberry Pi 5 (Gateway)

| Parámetro | Valor |
|-----------|-------|
| IP | 192.168.68.127 |
| Usuario SSH | pi |
| Función | Gateway Meshtastic |

```bash
ssh pi@192.168.68.127
```

---

### reComputer R1025-10 (Mission Pack)

| Parámetro | Valor |
|-----------|-------|
| IP Externa | 192.168.68.130 |
| IP Interna | 192.168.100.10 |
| Usuario SSH | recomputer |
| Función | Node-RED + Claude AI |

```bash
# Acceso vía red externa
ssh recomputer@192.168.68.130

# Acceso vía red interna
ssh recomputer@192.168.100.10
```

---

## WiFi

### Red Interna (Mission Pack)

| Parámetro | Valor |
|-----------|-------|
| SSID | `MPR114993468244600004-2.4G` |
| Password | `missionconnected` |
| Gateway | 192.168.100.1 |
| Tipo | WPA2-PSK |

---

## Meshtastic

### Configuración de Canal

| Parámetro | Valor |
|-----------|-------|
| Nombre del Canal | Test |
| PSK | `Ml/5IOJQyplnvlzWmnvMrg==` |
| Región | US (915 MHz) |

### Gateway Node ID

| Parámetro | Valor |
|-----------|-------|
| Node ID | !69d01ebc |
| MQTT Topic | meshtastic/2/json/LongFast/!69d01ebc |

---

## MQTT

### Broker Mosquitto

| Parámetro | Valor |
|-----------|-------|
| Host | 192.168.68.127 |
| Puerto | 1883 |
| Autenticación | No requerida (red local) |

```bash
# Suscribirse
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v

# Publicar
mosquitto_pub -h 192.168.68.127 -t "test" -m "mensaje"
```

---

## Node-RED

### Acceso Web

| Red | URL |
|-----|-----|
| Externa | http://192.168.68.130:1880 |
| Interna | http://192.168.100.10:1880 |

---

## Claude API

### Credenciales

| Parámetro | Valor |
|-----------|-------|
| Endpoint | https://api.anthropic.com/v1/messages |
| Modelo | claude-sonnet-4-20250514 |
| API Version | 2023-06-01 |

:::danger API Key
La API key de Claude es confidencial y no se incluye en esta documentación pública.
Contactar al administrador para obtener la key actual.
:::

### Headers Requeridos

```
x-api-key: [API_KEY]
anthropic-version: 2023-06-01
content-type: application/json
```

---

## Servicios Web

### Puertos y URLs

| Servicio | Host | Puerto | URL |
|----------|------|--------|-----|
| Meshtastic Web | 192.168.68.127 | 80 | http://192.168.68.127 |
| MQTT Broker | 192.168.68.127 | 1883 | - |
| Node-RED | 192.168.68.130 | 1880 | http://192.168.68.130:1880 |
| Node-RED (int) | 192.168.100.10 | 1880 | http://192.168.100.10:1880 |

---

## Resumen de IPs

```
┌─────────────────────────────────────────────────────────────┐
│                    RED 192.168.68.x                         │
├─────────────────────────────────────────────────────────────┤
│  192.168.68.1     │ Router Starlink                        │
│  192.168.68.127   │ Raspberry Pi 5 (Gateway)               │
│  192.168.68.130   │ reComputer R1025-10                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    RED 192.168.100.x                        │
├─────────────────────────────────────────────────────────────┤
│  192.168.100.1    │ WiFi AP (reComputer wlan0)             │
│  192.168.100.10   │ reComputer (ethernet alias)            │
│  192.168.100.100+ │ Clientes DHCP                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Rotación de Credenciales

### Cambiar PSK de Meshtastic

1. Generar nuevo PSK base64 de 32 bytes
2. Actualizar en TODOS los dispositivos
3. Actualizar esta documentación

### Cambiar API Key de Claude

1. Generar nueva key en console.anthropic.com
2. Actualizar en Node-RED
3. Eliminar key anterior
4. Verificar funcionamiento

### Cambiar Password WiFi

1. Editar /etc/hostapd/hostapd.conf
2. Reiniciar hostapd
3. Actualizar todos los dispositivos cliente
4. Actualizar esta documentación

---

## Backup de Credenciales

Mantener backup seguro de:
- [ ] API key de Claude
- [ ] Archivo de configuración Meshtastic
- [ ] Contraseña WiFi
- [ ] Contraseñas SSH (si se cambian de default)

Ubicación recomendada: Almacenamiento encriptado offline.
