---
sidebar_position: 3
---

# Trackers T1000-E

Los trackers Seeed Studio SenseCAP Card Tracker T1000-E son los dispositivos de usuario final que permiten enviar y recibir mensajes a través de la red mesh.

## Especificaciones

| Característica | Valor |
|----------------|-------|
| Modelo | SenseCAP Card Tracker T1000-E |
| Conectividad | LoRa 915 MHz |
| GPS | Integrado |
| Batería | Recargable USB-C |
| Tamaño | Tamaño tarjeta de crédito |
| Resistencia | IP65 (resistente al agua) |

## Características Principales

- **LoRa de largo alcance**: Comunicación hasta 10+ km
- **GPS integrado**: Rastreo de ubicación
- **Botón SOS**: Para emergencias
- **LED indicador**: Estado de conexión
- **Compacto**: Fácil de transportar

## Imagen del Dispositivo

```
┌─────────────────────────────────┐
│                                 │
│     SenseCAP T1000-E           │
│                                 │
│   ┌─────┐                      │
│   │ LED │  ◄── Indicador       │
│   └─────┘                      │
│                                 │
│   ┌─────────────────────┐      │
│   │                     │      │
│   │      Pantalla       │      │
│   │      (opcional)     │      │
│   │                     │      │
│   └─────────────────────┘      │
│                                 │
│         [BOTÓN SOS]            │
│                                 │
│                    USB-C ──►   │
└─────────────────────────────────┘
```

## Configuración Inicial

### 1. Cargar el Dispositivo

Conectar vía USB-C y cargar completamente antes del primer uso.

### 2. Encender

Mantener presionado el botón principal por 3 segundos hasta que el LED parpadee.

### 3. Configurar vía App Meshtastic

1. Descargar la app Meshtastic (Android/iOS)
2. Activar Bluetooth en el teléfono
3. Abrir la app y buscar dispositivos
4. Seleccionar el T1000-E
5. Configurar parámetros

### 4. Parámetros de Configuración

| Parámetro | Valor |
|-----------|-------|
| Región | US (915 MHz) |
| Canal | Test |
| PSK | `Ml/5IOJQyplnvlzWmnvMrg==` |
| Rol | CLIENT o CLIENT_MUTE |

## Uso Diario

### Enviar Mensaje Normal

1. Abrir app Meshtastic
2. Ir a "Messages"
3. Escribir mensaje
4. Enviar

### Enviar Consulta a Claude AI

Para recibir respuesta de la IA, incluir `@claude` en el mensaje:

```
@claude ¿Cuándo debo regar mis tomates?
```

### Ver Ubicación

La ubicación GPS se transmite automáticamente según la configuración del dispositivo.

## Indicadores LED

| Patrón LED | Significado |
|------------|-------------|
| Verde fijo | Conectado a la mesh |
| Verde parpadeando | Transmitiendo |
| Rojo fijo | Error o batería baja |
| Rojo parpadeando | Cargando |
| Apagado | Dispositivo apagado |

## Roles del Dispositivo

El T1000-E puede configurarse en diferentes roles:

### CLIENT (Por defecto)

- Envía y recibe mensajes
- Participa en el enrutamiento mesh
- Transmite posición GPS

### CLIENT_MUTE

- Envía y recibe mensajes
- NO participa en enrutamiento
- Ahorra batería
- Ideal para usuarios finales

### ROUTER

- Prioriza el enrutamiento de mensajes
- Siempre activo
- Mayor consumo de batería
- Ideal para nodos fijos con alimentación

## Cuidado y Mantenimiento

### Carga

- Usar cable USB-C de calidad
- No dejar conectado indefinidamente después de carga completa
- Cargar cuando llegue al 20%

### Almacenamiento

- Guardar en lugar seco
- Temperatura ambiente (15-25°C)
- Cargar al 50% si se almacena por largo tiempo

### Limpieza

- Limpiar con paño suave
- No sumergir en agua (solo resistente a salpicaduras)
- Mantener puertos limpios

## Troubleshooting

### No se conecta a la mesh

1. Verificar que esté encendido (LED activo)
2. Verificar configuración de región (US 915 MHz)
3. Verificar canal y PSK
4. Reiniciar el dispositivo

### No recibe respuestas de Claude

1. Verificar que el mensaje incluya `@claude`
2. Verificar conectividad con el gateway
3. Esperar hasta 30 segundos por respuesta

### Batería se agota rápido

1. Cambiar rol a CLIENT_MUTE
2. Reducir frecuencia de transmisión GPS
3. Reducir brillo de pantalla (si aplica)

### GPS no funciona

1. Ir a lugar abierto (sin techo)
2. Esperar 2-3 minutos para fix inicial
3. Verificar configuración de GPS en la app

## Especificaciones Técnicas Detalladas

| Especificación | Valor |
|----------------|-------|
| Frecuencia LoRa | 915 MHz (US) |
| Potencia TX | Hasta 22 dBm |
| Sensibilidad RX | -136 dBm |
| Alcance | 10+ km (línea de vista) |
| GPS | u-blox |
| Precisión GPS | ±2.5m |
| Batería | 700 mAh Li-Po |
| Autonomía | 3-7 días (según uso) |
| Carga | USB-C 5V |
| Dimensiones | 85 x 55 x 6.5 mm |
| Peso | 32g |
| Protección | IP65 |
| Temperatura | -20°C a 60°C |
