---
sidebar_position: 2
---

# Diagnóstico del Sistema

Procedimientos para diagnosticar problemas en cada componente del sistema.

## Diagnóstico Rápido

### Script de Verificación General

```bash
#!/bin/bash
echo "=== Diagnóstico Red Mesh LoRa ==="
echo ""

echo "1. Verificando Gateway (RPI 5)..."
ping -c 1 192.168.68.127 > /dev/null && echo "   ✓ Gateway accesible" || echo "   ✗ Gateway NO accesible"

echo ""
echo "2. Verificando reComputer..."
ping -c 1 192.168.68.130 > /dev/null && echo "   ✓ reComputer accesible" || echo "   ✗ reComputer NO accesible"

echo ""
echo "3. Verificando Internet..."
ping -c 1 8.8.8.8 > /dev/null && echo "   ✓ Internet funcionando" || echo "   ✗ Sin internet"

echo ""
echo "4. Verificando MQTT..."
timeout 2 mosquitto_sub -h 192.168.68.127 -t "test" -C 1 2>/dev/null && echo "   ✓ MQTT funcionando" || echo "   ⚠ MQTT sin mensajes (puede ser normal)"

echo ""
echo "=== Diagnóstico completado ==="
```

## Diagnóstico por Componente

### 1. Raspberry Pi 5 (Gateway)

#### Verificar Accesibilidad

```bash
# Ping
ping 192.168.68.127

# SSH
ssh pi@192.168.68.127 "echo 'Conexión OK'"
```

#### Verificar Servicios

```bash
# Estado de Meshtastic
ssh pi@192.168.68.127 "sudo systemctl status meshtastic"

# Estado de MQTT
ssh pi@192.168.68.127 "sudo systemctl status mosquitto"
```

#### Verificar LoRa

```bash
# Ver dispositivos USB
ssh pi@192.168.68.127 "lsusb"

# Ver puertos seriales
ssh pi@192.168.68.127 "ls -la /dev/ttyUSB* /dev/ttyACM* 2>/dev/null"

# Información de Meshtastic
ssh pi@192.168.68.127 "meshtastic --info"
```

#### Verificar Nodos

```bash
ssh pi@192.168.68.127 "meshtastic --nodes"
```

---

### 2. reComputer R1025-10

#### Verificar Accesibilidad

```bash
# Red externa
ping 192.168.68.130

# Red interna
ping 192.168.100.10
```

#### Verificar Node-RED

```bash
# Estado del servicio
ssh recomputer@192.168.68.130 "sudo systemctl status nodered"

# Verificar puerto 1880
ssh recomputer@192.168.68.130 "netstat -tlnp | grep 1880"
```

#### Verificar WiFi AP

```bash
# Estado de hostapd
ssh recomputer@192.168.68.130 "sudo systemctl status hostapd"

# Clientes conectados
ssh recomputer@192.168.68.130 "cat /var/lib/misc/dnsmasq.leases"
```

#### Verificar Conectividad

```bash
# Ping a internet
ssh recomputer@192.168.68.130 "ping -c 3 8.8.8.8"

# Ping a Claude API
ssh recomputer@192.168.68.130 "ping -c 3 api.anthropic.com"
```

---

### 3. MQTT Broker

#### Verificar Servicio

```bash
# Estado
sudo systemctl status mosquitto

# Puerto escuchando
netstat -tlnp | grep 1883
```

#### Probar Pub/Sub

Terminal 1 (suscribirse):
```bash
mosquitto_sub -h 192.168.68.127 -t "test/#" -v
```

Terminal 2 (publicar):
```bash
mosquitto_pub -h 192.168.68.127 -t "test/diag" -m "Test $(date)"
```

Debe aparecer el mensaje en Terminal 1.

#### Ver Tráfico Meshtastic

```bash
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v
```

---

### 4. Red Mesh LoRa

#### Verificar desde Gateway

```bash
# Ver nodos activos
meshtastic --nodes

# Ver información del nodo local
meshtastic --info

# Escuchar mensajes
meshtastic --listen
```

#### Enviar Mensaje de Prueba

```bash
meshtastic --sendtext "Test diagnóstico $(date +%H:%M)"
```

#### Verificar Configuración

```bash
meshtastic --get lora
meshtastic --get device
meshtastic --ch-index 0 --info
```

---

### 5. Integración Claude

#### Probar API Directamente

```bash
curl -X POST https://api.anthropic.com/v1/messages \
  -H "x-api-key: TU_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 100,
    "messages": [{"role": "user", "content": "Di hola"}]
  }'
```

Respuesta esperada: JSON con respuesta de Claude.

#### Probar Flujo Completo

1. Enviar mensaje MQTT simulado:
```bash
mosquitto_pub -h 192.168.68.127 \
  -t "meshtastic/2/json/LongFast/!69d01ebc" \
  -m '{"payload":{"text":"@claude test"},"sender":"!test"}'
```

2. Ver respuesta en debug de Node-RED

---

## Logs del Sistema

### Raspberry Pi

```bash
# Logs de Meshtastic
journalctl -u meshtastic -n 100

# Logs de Mosquitto
sudo tail -100 /var/log/mosquitto/mosquitto.log

# Logs del sistema
dmesg | tail -50
```

### reComputer

```bash
# Logs de Node-RED
journalctl -u nodered -n 100

# Logs de hostapd
journalctl -u hostapd -n 50

# Logs de dnsmasq
journalctl -u dnsmasq -n 50
```

## Tabla de Diagnóstico

| Síntoma | Verificar | Comando |
|---------|-----------|---------|
| Sin conexión a gateway | Ping RPI | `ping 192.168.68.127` |
| Sin MQTT | Servicio mosquitto | `systemctl status mosquitto` |
| Sin nodos en mesh | Meshtastic | `meshtastic --nodes` |
| Sin respuesta Claude | Internet | `ping api.anthropic.com` |
| Sin WiFi interno | hostapd | `systemctl status hostapd` |
| Node-RED caído | Servicio | `systemctl status nodered` |

## Reinicio de Emergencia

### Reiniciar Todo en Orden

```bash
# 1. Reiniciar MQTT
ssh pi@192.168.68.127 "sudo systemctl restart mosquitto"

# 2. Reiniciar Meshtastic
ssh pi@192.168.68.127 "sudo systemctl restart meshtastic"

# 3. Reiniciar Node-RED
ssh recomputer@192.168.68.130 "sudo systemctl restart nodered"

# 4. Reiniciar WiFi AP
ssh recomputer@192.168.68.130 "sudo systemctl restart hostapd dnsmasq"
```

### Reinicio Total (último recurso)

```bash
# Reiniciar Raspberry Pi
ssh pi@192.168.68.127 "sudo reboot"

# Esperar 2 minutos, luego reiniciar reComputer
ssh recomputer@192.168.68.130 "sudo reboot"
```

## Exportar Diagnóstico

### Generar Reporte

```bash
#!/bin/bash
REPORT="diagnostico_$(date +%Y%m%d_%H%M%S).txt"

echo "=== Reporte de Diagnóstico ===" > $REPORT
echo "Fecha: $(date)" >> $REPORT
echo "" >> $REPORT

echo "--- Ping Tests ---" >> $REPORT
ping -c 3 192.168.68.127 >> $REPORT 2>&1
ping -c 3 192.168.68.130 >> $REPORT 2>&1
ping -c 3 8.8.8.8 >> $REPORT 2>&1

echo "" >> $REPORT
echo "--- Servicios RPI ---" >> $REPORT
ssh pi@192.168.68.127 "systemctl status meshtastic mosquitto" >> $REPORT 2>&1

echo "" >> $REPORT
echo "--- Servicios reComputer ---" >> $REPORT
ssh recomputer@192.168.68.130 "systemctl status nodered hostapd" >> $REPORT 2>&1

echo "" >> $REPORT
echo "--- Nodos Meshtastic ---" >> $REPORT
ssh pi@192.168.68.127 "meshtastic --nodes" >> $REPORT 2>&1

echo "Reporte guardado en: $REPORT"
```
