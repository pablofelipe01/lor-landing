---
sidebar_position: 1
---

# Configuración Meshtastic

Guía completa para configurar Meshtastic en todos los dispositivos de la red.

## Parámetros de la Red

### Configuración Base

| Parámetro | Valor |
|-----------|-------|
| Región | US |
| Frecuencia | 915 MHz |
| Canal | Test |
| PSK | `Ml/5IOJQyplnvlzWmnvMrg==` |

### Configuración LoRa

| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| Region | US | Frecuencias 902-928 MHz |
| Modem Preset | LONG_FAST | Balance alcance/velocidad |
| Hop Limit | 3 | Máximo saltos en mesh |
| TX Power | 22 dBm | Potencia máxima |

## Configuración por Dispositivo

### Gateway (Raspberry Pi 5)

```yaml
# Configuración recomendada para gateway

lora:
  region: US
  modem_preset: LONG_FAST
  hop_limit: 3
  tx_power: 22

device:
  role: ROUTER
  serial_enabled: true
  debug_log_enabled: false

position:
  gps_enabled: false
  fixed_position: true
  # Configurar coordenadas fijas del gateway

mqtt:
  enabled: true
  address: localhost
  username: ""
  password: ""
  root_topic: meshtastic
```

### Trackers T1000-E (Usuarios)

```yaml
# Configuración para dispositivos de usuario

lora:
  region: US
  modem_preset: LONG_FAST
  hop_limit: 3
  tx_power: 22

device:
  role: CLIENT_MUTE  # Ahorra batería

position:
  gps_enabled: true
  gps_update_interval: 300  # 5 minutos
  position_broadcast_secs: 900  # 15 minutos
```

### Repetidor/Router

```yaml
# Configuración para nodo repetidor

lora:
  region: US
  modem_preset: LONG_FAST
  hop_limit: 3
  tx_power: 22

device:
  role: ROUTER

position:
  gps_enabled: false
  fixed_position: true
```

## Configuración del Canal

### Crear Canal "Test"

Via CLI:
```bash
meshtastic --ch-set name "Test" --ch-index 0
meshtastic --ch-set psk "Ml/5IOJQyplnvlzWmnvMrg==" --ch-index 0
```

Via App:
1. Abrir configuración de canales
2. Editar canal primario
3. Nombre: `Test`
4. PSK: `Ml/5IOJQyplnvlzWmnvMrg==`
5. Guardar

### Verificar Canal

```bash
meshtastic --ch-index 0 --info
```

Salida esperada:
```
Channel 0:
  Name: Test
  PSK: [configured]
  Uplink/Downlink: enabled
```

## Comandos CLI Meshtastic

### Información General

```bash
# Ver información del nodo
meshtastic --info

# Ver nodos en la mesh
meshtastic --nodes

# Ver toda la configuración
meshtastic --get all
```

### Configuración de Radio

```bash
# Configurar región
meshtastic --set lora.region US

# Configurar preset
meshtastic --set lora.modem_preset LONG_FAST

# Configurar potencia TX
meshtastic --set lora.tx_power 22
```

### Configuración de Dispositivo

```bash
# Configurar rol
meshtastic --set device.role ROUTER

# Configurar nombre del nodo
meshtastic --set-owner "Gateway-Principal"

# Habilitar serial
meshtastic --set device.serial_enabled true
```

### Mensajes

```bash
# Enviar mensaje broadcast
meshtastic --sendtext "Hola mesh!"

# Enviar mensaje directo (por ID de nodo)
meshtastic --dest !aabbccdd --sendtext "Mensaje privado"

# Escuchar mensajes
meshtastic --listen
```

### Exportar/Importar Configuración

```bash
# Exportar configuración actual
meshtastic --export-config > config-backup.yaml

# Importar configuración
meshtastic --configure config-backup.yaml
```

## Configuración MQTT

### En el Gateway

```bash
# Habilitar MQTT
meshtastic --set mqtt.enabled true

# Configurar broker local
meshtastic --set mqtt.address localhost

# Configurar topic raíz
meshtastic --set mqtt.root meshtastic
```

### Topics MQTT

| Topic | Descripción |
|-------|-------------|
| `meshtastic/2/json/LongFast/!nodeId` | Mensajes JSON |
| `meshtastic/2/c/LongFast/!nodeId` | Canal encriptado |
| `meshtastic/2/stat/!nodeId` | Estado del nodo |

### Ejemplo de Mensaje MQTT

```json
{
  "channel": 0,
  "from": 1234567890,
  "id": 123456789,
  "payload": {
    "text": "@claude ¿Cómo está el clima?"
  },
  "sender": "!aabbccdd",
  "timestamp": 1699999999,
  "to": 4294967295,
  "type": "text"
}
```

## Roles de Dispositivo

| Rol | Descripción | Uso |
|-----|-------------|-----|
| CLIENT | Cliente estándar | Uso general |
| CLIENT_MUTE | Cliente silencioso | Ahorro batería |
| CLIENT_HIDDEN | Cliente oculto | Sin posición |
| ROUTER | Enrutador dedicado | Nodos fijos |
| ROUTER_CLIENT | Router + cliente | Híbrido |
| REPEATER | Repetidor puro | Solo reenvío |

## Presets de Módem

| Preset | Velocidad | Alcance | Uso |
|--------|-----------|---------|-----|
| SHORT_FAST | Rápido | Corto | Densidad alta |
| SHORT_SLOW | Lento | Corto | - |
| MEDIUM_FAST | Medio | Medio | Balance |
| MEDIUM_SLOW | Lento | Medio | - |
| LONG_FAST | Medio | Largo | **Recomendado** |
| LONG_SLOW | Lento | Muy largo | Máximo alcance |
| VERY_LONG_SLOW | Muy lento | Extremo | Especial |

## Verificación de Configuración

### Lista de Verificación

- [ ] Región configurada: US
- [ ] Canal configurado: Test
- [ ] PSK configurado correctamente
- [ ] MQTT habilitado (solo gateway)
- [ ] Rol apropiado según función
- [ ] Antena conectada

### Prueba de Conectividad

1. Enviar mensaje desde tracker
2. Verificar en gateway:
```bash
mosquitto_sub -h localhost -t "meshtastic/#" -v
```
3. Confirmar recepción del mensaje

## Troubleshooting

### No se conecta a la mesh

1. Verificar región coincide en todos los dispositivos
2. Verificar canal y PSK idénticos
3. Verificar antena conectada
4. Reiniciar dispositivo

### Mensajes no llegan al MQTT

1. Verificar MQTT habilitado
2. Verificar broker Mosquitto corriendo
3. Verificar topic configurado
4. Revisar logs de Meshtastic

### Alcance reducido

1. Verificar potencia TX
2. Verificar antena
3. Cambiar a preset LONG_SLOW
4. Elevar antena del gateway
