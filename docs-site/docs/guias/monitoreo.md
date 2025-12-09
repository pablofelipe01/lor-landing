---
sidebar_position: 3
---

# Monitoreo de la Red

Guía para monitorear el estado y funcionamiento de la red mesh.

## Herramientas de Monitoreo

### 1. App Meshtastic

La forma más fácil de ver el estado de la red.

### 2. Web UI del Gateway

Acceder a: http://192.168.68.127

### 3. Node-RED Dashboard

Acceder a: http://192.168.100.10:1880

### 4. Línea de Comandos (SSH)

Para administradores con acceso SSH.

## Monitoreo desde App Meshtastic

### Ver Nodos Conectados

1. Abrir app Meshtastic
2. Ir a pestaña "Nodes"
3. Ver lista de nodos en la red

Información mostrada:
- Nombre del nodo
- Última vez visto
- Distancia (si hay GPS)
- Señal (SNR/RSSI)

### Calidad de Señal

| SNR | Calidad | Descripción |
|-----|---------|-------------|
| > 0 | Excelente | Señal muy fuerte |
| -5 a 0 | Buena | Conexión estable |
| -10 a -5 | Regular | Puede haber pérdidas |
| < -10 | Mala | Comunicación difícil |

### Ver Mensajes

- Pestaña "Messages"
- Muestra todos los mensajes del canal
- Incluyendo respuestas de Claude

## Monitoreo vía SSH

### Conectar al Raspberry Pi

```bash
ssh pi@192.168.68.127
```

### Ver Nodos Meshtastic

```bash
meshtastic --nodes
```

Salida ejemplo:
```
╒════════════════════╤════════════════╤════════╤═══════════╕
│ User               │ ID             │ SNR    │ Last Seen │
╞════════════════════╪════════════════╪════════╪═══════════╡
│ Gateway-Principal  │ !69d01ebc      │ -      │ now       │
│ Familia García     │ !aabbccdd      │ 7.5    │ 2min ago  │
│ Escuela Norte      │ !11223344      │ 3.2    │ 5min ago  │
╘════════════════════╧════════════════╧════════╧═══════════╛
```

### Ver Mensajes en Tiempo Real

```bash
meshtastic --listen
```

### Ver Tráfico MQTT

```bash
mosquitto_sub -h localhost -t "meshtastic/#" -v
```

## Monitoreo de Node-RED

### Acceder al Editor

1. Abrir: http://192.168.100.10:1880
2. Ver flujos activos
3. Revisar panel de debug

### Panel de Debug

1. Click en ícono de bug (debug) a la derecha
2. Ver mensajes procesados
3. Verificar flujo de datos

### Verificar Conexión MQTT

En Node-RED:
1. Ver nodo MQTT In
2. Debajo debe decir "connected"
3. Si dice "disconnected", hay problema

## Métricas Importantes

### Salud de la Red

| Métrica | Valor Normal | Acción si Anormal |
|---------|--------------|-------------------|
| Nodos vistos | >1 | Verificar trackers |
| Mensajes/hora | Variable | Normal fluctuar |
| Latencia Claude | menos de 30s | Verificar internet |
| MQTT conectado | Sí | Reiniciar servicios |

### Verificar Servicios

En Raspberry Pi:
```bash
# Estado de Meshtastic
sudo systemctl status meshtastic

# Estado de MQTT
sudo systemctl status mosquitto
```

En reComputer:
```bash
# Estado de Node-RED
sudo systemctl status nodered

# Estado de WiFi AP
sudo systemctl status hostapd
```

## Logs del Sistema

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

## Dashboard de Monitoreo (Opcional)

### Crear Dashboard en Node-RED

1. Instalar node-red-dashboard:
   ```bash
   cd ~/.node-red
   npm install node-red-dashboard
   ```

2. Reiniciar Node-RED

3. Crear flujo con widgets:
   - Gauge para nodos activos
   - Chart para mensajes/hora
   - Text para último mensaje

4. Acceder a: http://192.168.100.10:1880/ui

## Alertas

### Configurar Alertas Básicas en Node-RED

```javascript
// Nodo Function para detectar problemas

// Si no hay mensajes en 1 hora
var lastMessage = flow.get("lastMessageTime") || 0;
var now = Date.now();

if (now - lastMessage > 3600000) { // 1 hora
    node.warn("ALERTA: Sin mensajes en más de 1 hora");
    // Aquí podrías enviar notificación
}

flow.set("lastMessageTime", now);
return msg;
```

## Checklist de Salud Diario

### Verificación Rápida

- [ ] Gateway Meshtastic respondiendo
- [ ] Node-RED conectado a MQTT
- [ ] Internet (Starlink) funcionando
- [ ] Al menos 1 tracker visible
- [ ] Prueba @claude exitosa

### Comandos Rápidos

```bash
# Desde laptop en la red

# 1. Ping al gateway
ping 192.168.68.127

# 2. Ping a reComputer
ping 192.168.68.130

# 3. Ver nodos
ssh pi@192.168.68.127 "meshtastic --nodes"

# 4. Probar MQTT
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -C 1
```

## Troubleshooting de Monitoreo

### No Veo Nodos

1. Verificar que el tracker está encendido
2. Verificar configuración de canal/PSK
3. Verificar región
4. Reiniciar tracker

### MQTT Desconectado

1. Verificar servicio mosquitto:
   ```bash
   sudo systemctl status mosquitto
   ```
2. Reiniciar si es necesario:
   ```bash
   sudo systemctl restart mosquitto
   ```

### Node-RED No Responde

1. Verificar servicio:
   ```bash
   sudo systemctl status nodered
   ```
2. Ver logs:
   ```bash
   journalctl -u nodered -n 50
   ```
3. Reiniciar:
   ```bash
   sudo systemctl restart nodered
   ```
