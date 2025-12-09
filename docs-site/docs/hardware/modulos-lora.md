---
sidebar_position: 4
---

# Módulos LoRa

Documentación de los módulos LoRa utilizados y probados en el proyecto.

## Módulos Disponibles

### Heltec ESP32 LoRa V3 SX1262

**Estado**: ✅ Funcional

| Característica | Valor |
|----------------|-------|
| Chip LoRa | SX1262 |
| MCU | ESP32-S3 |
| Frecuencia | 915 MHz |
| Pantalla | OLED 0.96" |
| Conexión | USB-C |

#### Características

- Pantalla OLED integrada para ver mensajes
- WiFi y Bluetooth integrados
- Compatible con firmware Meshtastic oficial
- Antena incluida
- Buena relación precio/rendimiento

#### Configuración

```bash
# Flashear firmware Meshtastic
# Descargar de: https://flasher.meshtastic.org

# Seleccionar:
# - Device: Heltec V3
# - Firmware: Latest stable
```

#### Pinout Relevante

| Pin | Función |
|-----|---------|
| GPIO0 | Boot |
| GPIO36 | Battery voltage |
| GPIO35 | User button |
| LoRa SPI | Interno |

---

### WIO-SX1262 (Seeed Studio)

**Estado**: ⚠️ Defectuoso (El módulo específico probado presenta problemas)

| Característica | Valor |
|----------------|-------|
| Chip LoRa | SX1262 |
| Formato | Módulo compacto |
| Frecuencia | 915 MHz |

#### Notas

El módulo WIO-SX1262 probado presentó problemas de comunicación. Posibles causas:
- Defecto de fábrica
- Incompatibilidad de firmware
- Problema de soldadura

**Recomendación**: Usar Heltec ESP32 LoRa V3 como alternativa.

---

## Comparación de Módulos

| Característica | Heltec V3 | T1000-E | WIO-SX1262 |
|----------------|-----------|---------|------------|
| Estado | ✅ Funcional | ✅ Funcional | ⚠️ Problemas |
| Pantalla | Sí (OLED) | Sí | No |
| GPS | No | Sí | No |
| Batería | No (externa) | Sí | No |
| Portabilidad | Media | Alta | Alta |
| Precio | ~$20 | ~$40 | ~$15 |
| Uso recomendado | Gateway/Repetidor | Usuario final | No recomendado |

## Selección de Módulo por Caso de Uso

### Para Gateway Principal

**Recomendado**: Heltec ESP32 LoRa V3 o equivalente

- Conexión USB permanente
- Pantalla para monitoreo local
- Sin necesidad de GPS
- Alimentación continua

### Para Repetidor/Router

**Recomendado**: Heltec ESP32 LoRa V3 con panel solar

- Alimentación solar + batería
- Ubicación elevada
- Sin necesidad de GPS
- Configurar como rol ROUTER

### Para Usuario Final

**Recomendado**: T1000-E Tracker

- Portátil y compacto
- GPS integrado para ubicación
- Batería de larga duración
- Fácil de usar

## Antenas

### Antenas Incluidas

La mayoría de módulos incluyen antena de stock:
- Tipo: Monopolo o helical
- Ganancia: 2-3 dBi
- Adecuada para pruebas

### Mejora de Antena

Para mayor alcance, considerar:

| Tipo | Ganancia | Uso |
|------|----------|-----|
| Dipolo | 2 dBi | General |
| Yagi | 6-12 dBi | Punto a punto |
| Colineal | 5-8 dBi | Omnidireccional |
| Panel | 8-14 dBi | Direccional |

### Conectores Comunes

- **SMA**: Estándar en módulos
- **U.FL/IPEX**: Conector pequeño interno
- Usar adaptadores según necesidad

## Configuración Común para Todos los Módulos

### Parámetros LoRa

```
Región: US
Frecuencia: 915 MHz
Spreading Factor: 11 (default)
Bandwidth: 250 kHz
Coding Rate: 4/8
```

### Canal Meshtastic

```
Nombre: Test
PSK: Ml/5IOJQyplnvlzWmnvMrg==
```

### Flashear Firmware

1. Ir a https://flasher.meshtastic.org
2. Conectar dispositivo por USB
3. Seleccionar modelo correcto
4. Seleccionar versión de firmware
5. Click en "Flash"

## Troubleshooting de Módulos

### Módulo no detectado por USB

1. Probar otro cable USB
2. Instalar drivers CH340/CP210x
3. Verificar en administrador de dispositivos

### No se conecta a la mesh

1. Verificar región configurada
2. Verificar canal y PSK
3. Verificar antena conectada
4. Probar con otro módulo

### Alcance reducido

1. Verificar antena bien conectada
2. Elevar la antena
3. Evitar obstáculos metálicos
4. Considerar antena de mayor ganancia

### Firmware corrupto

1. Borrar flash completamente
2. Re-flashear desde cero
3. Configurar desde defaults
