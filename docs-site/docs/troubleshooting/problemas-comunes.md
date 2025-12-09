---
sidebar_position: 1
---

# Problemas Comunes

Soluciones a los problemas más frecuentes en la red mesh.

## Problemas de Conectividad

### Tracker No Se Conecta a la Mesh

**Síntomas**:
- No aparece en la lista de nodos
- No puede enviar ni recibir mensajes

**Soluciones**:

1. **Verificar encendido**
   - LED debe estar activo
   - Reiniciar si es necesario

2. **Verificar región**
   ```
   Settings → Radio → Region = US
   ```

3. **Verificar canal**
   ```
   Settings → Channels → Channel 0
   Name = Test
   PSK = Ml/5IOJQyplnvlzWmnvMrg==
   ```

4. **Reiniciar tracker**
   - Apagar completamente
   - Esperar 10 segundos
   - Encender

---

### Gateway No Recibe Mensajes

**Síntomas**:
- Trackers envían pero gateway no ve nada
- MQTT sin tráfico

**Soluciones**:

1. **Verificar servicio Meshtastic**
   ```bash
   sudo systemctl status meshtastic
   ```

2. **Verificar módulo LoRa**
   ```bash
   lsusb
   ls /dev/ttyUSB* /dev/ttyACM*
   ```

3. **Reiniciar servicio**
   ```bash
   sudo systemctl restart meshtastic
   ```

4. **Ver logs**
   ```bash
   journalctl -u meshtastic -f
   ```

---

### Sin Respuesta de Claude

**Síntomas**:
- Mensaje enviado con @claude
- No llega respuesta después de 30+ segundos

**Soluciones**:

1. **Verificar @claude en mensaje**
   - Debe incluir exactamente `@claude`
   - No `@Claude` o `@ claude`

2. **Verificar conexión internet**
   ```bash
   # En reComputer
   ping 8.8.8.8
   ping api.anthropic.com
   ```

3. **Verificar Node-RED**
   - Abrir http://192.168.100.10:1880
   - Verificar que MQTT está "connected"

4. **Ver logs de Node-RED**
   ```bash
   journalctl -u nodered -f
   ```

5. **Verificar API key de Claude**
   - Puede estar expirada o sin créditos

---

## Problemas de Red

### Sin Internet (Starlink)

**Síntomas**:
- No hay respuestas de Claude
- No se puede acceder a internet

**Soluciones**:

1. **Verificar Starlink**
   - Revisar el router Starlink
   - Verificar que el cable no está dañado
   - Revisar posición de la antena

2. **Verificar ruta**
   ```bash
   ip route
   ping 192.168.68.1
   ```

3. **Reiniciar red**
   ```bash
   sudo systemctl restart networking
   ```

:::note
Los mensajes mesh siguen funcionando sin internet.
Solo Claude requiere conexión.
:::

---

### WiFi Interno No Funciona

**Síntomas**:
- No aparece red `MPR114993468244600004-2.4G`
- No se puede conectar

**Soluciones**:

1. **Verificar hostapd**
   ```bash
   sudo systemctl status hostapd
   ```

2. **Reiniciar servicios WiFi**
   ```bash
   sudo systemctl restart hostapd dnsmasq
   ```

3. **Ver logs**
   ```bash
   journalctl -u hostapd -n 50
   ```

4. **Verificar interface WiFi**
   ```bash
   iw dev wlan0 info
   ```

---

## Problemas de MQTT

### Node-RED No Recibe Mensajes

**Síntomas**:
- Mensajes llegan al gateway
- Node-RED no los procesa

**Soluciones**:

1. **Verificar conexión MQTT**
   - En Node-RED, el nodo MQTT debe decir "connected"

2. **Verificar topic**
   - Topic correcto: `meshtastic/2/json/LongFast/!69d01ebc`

3. **Probar manualmente**
   ```bash
   mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v
   ```

4. **Reiniciar Node-RED**
   ```bash
   sudo systemctl restart nodered
   ```

---

### Mosquitto No Inicia

**Síntomas**:
- Error al iniciar mosquitto
- Puerto 1883 no responde

**Soluciones**:

1. **Ver estado**
   ```bash
   sudo systemctl status mosquitto
   ```

2. **Ver logs**
   ```bash
   journalctl -u mosquitto -n 50
   ```

3. **Verificar configuración**
   ```bash
   mosquitto -c /etc/mosquitto/mosquitto.conf -v
   ```

4. **Verificar puerto**
   ```bash
   sudo netstat -tlnp | grep 1883
   ```

---

## Problemas de Hardware

### Batería Se Agota Rápido

**Síntomas**:
- Tracker dura menos de 1 día

**Soluciones**:

1. **Cambiar rol a CLIENT_MUTE**
   - Reduce consumo significativamente

2. **Reducir GPS**
   - Aumentar intervalo o desactivar

3. **Reducir brillo** (si tiene pantalla)

4. **Verificar batería**
   - Puede necesitar reemplazo si es vieja

---

### Módulo LoRa No Detectado

**Síntomas**:
- Gateway no ve el módulo USB
- Error "no device found"

**Soluciones**:

1. **Verificar conexión física**
   - Reconectar cable USB
   - Probar otro puerto USB

2. **Ver dispositivos USB**
   ```bash
   lsusb
   dmesg | tail -20
   ```

3. **Verificar permisos**
   ```bash
   sudo chmod 666 /dev/ttyUSB0
   ```

4. **Reiniciar**
   ```bash
   sudo reboot
   ```

---

## Problemas de Configuración

### PSK No Coincide

**Síntomas**:
- Tracker encendido pero no en la mesh
- Otros nodos no lo ven

**Soluciones**:

El PSK debe ser **exactamente**:
```
Ml/5IOJQyplnvlzWmnvMrg==
```

1. Verificar que no hay espacios extra
2. Verificar mayúsculas/minúsculas
3. Mejor: usar QR code de dispositivo ya configurado

---

### Región Incorrecta

**Síntomas**:
- Tracker no comunica con otros
- Frecuencias no coinciden

**Soluciones**:

Todos los dispositivos deben estar en:
```
Region: US (915 MHz)
```

Si cambiaste de región:
1. El dispositivo se reinicia
2. Esperar que complete el reinicio
3. Verificar que quedó en US

---

## Cuándo Escalar

### Contactar Administrador

- Múltiples usuarios reportan el mismo problema
- Servicios no reinician correctamente
- Hardware dañado
- API key expirada/sin créditos

### Información a Proporcionar

1. Qué estaba haciendo
2. Qué pasó (o no pasó)
3. Mensajes de error si hay
4. Cuándo comenzó el problema
5. Qué ya intentaste
