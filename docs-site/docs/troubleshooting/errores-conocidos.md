---
sidebar_position: 3
---

# Errores Conocidos

Lista de errores conocidos y sus soluciones.

## Errores de Hardware

### WIO-SX1262 Defectuoso

**Descripción**: El módulo WIO-SX1262 de Seeed Studio probado presenta problemas de comunicación.

**Síntomas**:
- No se detecta correctamente
- Errores de comunicación intermitentes
- Firmware no flashea correctamente

**Solución**:
- **No usar este módulo específico**
- Usar Heltec ESP32 LoRa V3 como alternativa
- O usar T1000-E trackers que funcionan correctamente

**Estado**: Hardware defectuoso (no es bug de software)

---

### T1000-E LED Rojo Permanente

**Descripción**: Algunos T1000-E muestran LED rojo permanente después de actualización de firmware.

**Síntomas**:
- LED rojo constante
- No responde a comandos
- App no puede conectar

**Solución**:
1. Conectar a cargador USB-C
2. Mantener presionado botón por 15 segundos
3. Soltar y esperar reinicio
4. Si persiste, re-flashear firmware

---

## Errores de Software

### Meshtastic "No Devices Found"

**Descripción**: Error al intentar usar comandos meshtastic CLI.

**Síntomas**:
```
Error: No Meshtastic devices found
```

**Causas posibles**:
1. Módulo USB desconectado
2. Permisos insuficientes
3. Driver no instalado

**Solución**:
```bash
# Verificar dispositivo conectado
lsusb

# Verificar permisos
sudo chmod 666 /dev/ttyUSB0

# Agregar usuario al grupo dialout
sudo usermod -a -G dialout $USER
# Cerrar sesión y volver a entrar

# Especificar puerto manualmente
meshtastic --port /dev/ttyUSB0 --info
```

---

### Node-RED "MQTT Connection Refused"

**Descripción**: Node-RED no puede conectar al broker MQTT.

**Síntomas**:
- Nodo MQTT muestra "disconnected"
- Error: "Connection refused"

**Causas**:
1. Mosquitto no está corriendo
2. IP del broker incorrecta
3. Firewall bloqueando

**Solución**:
```bash
# Verificar Mosquitto
sudo systemctl status mosquitto
sudo systemctl start mosquitto

# Verificar puerto
netstat -tlnp | grep 1883

# Probar conexión
mosquitto_sub -h 192.168.68.127 -t "test"
```

---

### Claude API "401 Unauthorized"

**Descripción**: Error de autenticación con la API de Claude.

**Síntomas**:
```json
{"error": {"type": "authentication_error", "message": "invalid x-api-key"}}
```

**Causas**:
1. API key inválida o expirada
2. Header incorrecto
3. Key con formato incorrecto

**Solución**:
1. Verificar key en console.anthropic.com
2. Verificar que no hay espacios extras
3. Verificar header exacto:
   ```
   x-api-key: sk-ant-api03-xxxxx
   ```

---

### Claude API "429 Rate Limited"

**Descripción**: Demasiadas solicitudes a la API.

**Síntomas**:
```json
{"error": {"type": "rate_limit_error"}}
```

**Solución**:
1. Esperar unos minutos
2. Implementar rate limiting en Node-RED:
```javascript
var lastCall = flow.get("lastClaudeCall") || 0;
var now = Date.now();
if (now - lastCall < 5000) { // 5 segundos mínimo entre llamadas
    return null;
}
flow.set("lastClaudeCall", now);
return msg;
```

---

### WiFi AP "Failed to Initialize"

**Descripción**: hostapd no puede iniciar el access point.

**Síntomas**:
```
hostapd: Failed to initialize interface wlan0
```

**Causas**:
1. Interface WiFi no disponible
2. Driver incompatible
3. Configuración incorrecta

**Solución**:
```bash
# Verificar interface existe
iw dev

# Desactivar WiFi cliente si está activo
sudo nmcli radio wifi off

# Verificar configuración
sudo hostapd -dd /etc/hostapd/hostapd.conf
```

---

## Errores de Configuración

### "Channel Mismatch"

**Descripción**: Dispositivos no se comunican por configuración de canal diferente.

**Síntomas**:
- Tracker encendido pero no aparece en la mesh
- Mensajes no llegan

**Solución**:
Verificar en TODOS los dispositivos:
```
Canal: Test
PSK: Ml/5IOJQyplnvlzWmnvMrg==
```

---

### "Region Mismatch"

**Descripción**: Dispositivos en diferentes regiones no se comunican.

**Síntomas**:
- Similar a channel mismatch
- Frecuencias incompatibles

**Solución**:
Verificar región en todos los dispositivos:
```
Region: US (915 MHz)
```

---

### MQTT Topic Incorrecto

**Descripción**: Node-RED no recibe mensajes por topic mal configurado.

**Síntomas**:
- MQTT conectado pero sin mensajes
- Debug vacío

**Solución**:
Topic correcto para el gateway `!69d01ebc`:
```
meshtastic/2/json/LongFast/!69d01ebc
```

Para debug, suscribirse a todo:
```
meshtastic/#
```

---

## Limitaciones Conocidas

### Longitud de Mensajes LoRa

**Limitación**: LoRa tiene límite de ~230 bytes por mensaje.

**Impacto**: Las respuestas de Claude se truncan.

**Mitigación**: System prompt instruye a Claude a dar respuestas cortas.

---

### Sin ACK de Entrega

**Limitación**: La red mesh no garantiza confirmación de entrega.

**Impacto**: No hay forma de saber si un mensaje llegó.

**Mitigación**: Pedir a usuarios que confirmen recepción verbalmente si es crítico.

---

### Latencia Variable

**Limitación**: La latencia depende de número de saltos y carga de red.

**Impacto**: Respuestas pueden tardar 5-30 segundos.

**Mitigación**: Informar a usuarios de tiempos esperados.

---

## Reportar Nuevos Errores

Si encuentras un error no documentado:

1. **Documentar**:
   - Qué estabas haciendo
   - Qué esperabas que pasara
   - Qué pasó realmente
   - Mensajes de error exactos

2. **Recolectar logs**:
   ```bash
   journalctl -u meshtastic -n 50 > meshtastic.log
   journalctl -u nodered -n 50 > nodered.log
   ```

3. **Contactar** al administrador del sistema con la información recolectada.
