---
sidebar_position: 1
---

# Raspberry Pi 5 - Gateway Principal

El Raspberry Pi 5 actúa como el gateway principal de la red Meshtastic, conectando la red mesh LoRa con la infraestructura IP.

## Especificaciones

| Característica | Valor |
|----------------|-------|
| Modelo | Raspberry Pi 5 |
| IP Red Externa | 192.168.68.127 |
| Función | Gateway Meshtastic |
| Sistema Operativo | Raspberry Pi OS (64-bit) |
| Meshtastic | meshtastic-firmware |

## Rol en el Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    Raspberry Pi 5                           │
│                    192.168.68.127                           │
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │ Meshtastic  │    │    MQTT     │    │   Serial    │     │
│  │   Web UI    │    │   Broker    │    │   LoRa      │     │
│  │   :80       │    │   :1883     │    │   Module    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                  │                  │             │
│         └──────────────────┼──────────────────┘             │
│                            │                                │
│                     Meshtastic                              │
│                     Daemon                                  │
└─────────────────────────────────────────────────────────────┘
                             │
                             │ Ethernet
                             ▼
                    Red 192.168.68.x
```

## Acceso

### SSH

```bash
ssh pi@192.168.68.127
```

### Web UI Meshtastic

Abrir en navegador:
```
http://192.168.68.127
```

## Servicios Activos

### Meshtastic Server

El servicio Meshtastic corre automáticamente al iniciar:

```bash
# Ver estado
sudo systemctl status meshtastic

# Reiniciar servicio
sudo systemctl restart meshtastic

# Ver logs
journalctl -u meshtastic -f
```

### MQTT Broker (Mosquitto)

El broker MQTT permite la comunicación entre Meshtastic y Node-RED:

```bash
# Ver estado
sudo systemctl status mosquitto

# Reiniciar
sudo systemctl restart mosquitto

# Ver mensajes en tiempo real
mosquitto_sub -h localhost -t "meshtastic/#" -v
```

## Configuración de Red

El Raspberry Pi está configurado con IP estática:

```bash
# Archivo de configuración
/etc/dhcpcd.conf

# Configuración relevante:
interface eth0
static ip_address=192.168.68.127/24
static routers=192.168.68.1
static domain_name_servers=8.8.8.8 8.8.4.4
```

## Módulo LoRa Conectado

El Raspberry Pi tiene conectado un módulo LoRa vía USB o GPIO:

- **Tipo**: Compatible con Meshtastic
- **Frecuencia**: 915 MHz (Región US)
- **Conexión**: USB (/dev/ttyUSB0 o /dev/ttyACM0)

### Verificar Conexión

```bash
# Listar dispositivos USB
lsusb

# Ver puertos seriales
ls -la /dev/tty*

# Verificar que Meshtastic detecta el dispositivo
meshtastic --info
```

## Comandos Útiles Meshtastic

```bash
# Ver información del nodo
meshtastic --info

# Ver nodos conectados
meshtastic --nodes

# Enviar mensaje de prueba
meshtastic --sendtext "Test desde gateway"

# Configurar región
meshtastic --set lora.region US

# Ver configuración completa
meshtastic --get all
```

## Monitoreo

### Ver Mensajes Entrantes

```bash
# Via MQTT
mosquitto_sub -h localhost -t "meshtastic/2/json/#" -v

# Via meshtastic CLI
meshtastic --listen
```

### Logs del Sistema

```bash
# Logs de Meshtastic
journalctl -u meshtastic -f

# Logs del sistema
dmesg | tail -50

# Espacio en disco
df -h
```

## Troubleshooting

### El módulo LoRa no es detectado

1. Verificar conexión física
2. Revisar `dmesg` para errores USB
3. Reiniciar el Raspberry Pi

```bash
dmesg | grep -i usb
sudo reboot
```

### No hay comunicación MQTT

1. Verificar que Mosquitto está corriendo
2. Probar conexión local

```bash
sudo systemctl status mosquitto
mosquitto_pub -h localhost -t "test" -m "hello"
mosquitto_sub -h localhost -t "test"
```

### Meshtastic no inicia

```bash
# Ver logs detallados
journalctl -u meshtastic -n 100

# Reinstalar si es necesario
pip3 install --upgrade meshtastic
```

## Mantenimiento

### Actualizar Sistema

```bash
sudo apt update
sudo apt upgrade -y
```

### Actualizar Meshtastic

```bash
pip3 install --upgrade meshtastic
sudo systemctl restart meshtastic
```

### Backup de Configuración

```bash
# Exportar configuración Meshtastic
meshtastic --export-config > meshtastic-backup.yaml

# Backup de archivos importantes
tar -czf rpi-backup.tar.gz /etc/dhcpcd.conf /etc/mosquitto/
```
