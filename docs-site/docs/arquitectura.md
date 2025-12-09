---
sidebar_position: 8
---

# Arquitectura del Sistema

## Visión General

El sistema está diseñado con una arquitectura de dos capas de red que permite tanto conectividad local como acceso a internet.

## Diagrama de Red Completo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         INTERNET (Starlink)                              │
│                              ▲                                           │
│                              │                                           │
│                    ┌─────────┴─────────┐                                │
│                    │   Router Starlink │                                │
│                    │   192.168.68.1    │                                │
│                    └─────────┬─────────┘                                │
│                              │                                           │
│         ┌────────────────────┼────────────────────┐                     │
│         │                    │                    │                     │
│         ▼                    ▼                    ▼                     │
│   ┌───────────┐       ┌───────────┐       ┌───────────┐                │
│   │  RPI 5    │       │reComputer │       │  Laptop   │                │
│   │  .68.127  │       │ .68.130   │       │  .68.x    │                │
│   │           │       │           │       │           │                │
│   │Meshtastic │       │ Node-RED  │       │  Admin    │                │
│   │  Server   │◄─────►│ Claude AI │       │  Access   │                │
│   └─────┬─────┘       └─────┬─────┘       └───────────┘                │
│         │                   │                                           │
│         │            ┌──────┴──────┐                                    │
│         │            │             │                                    │
│         │            ▼             ▼                                    │
│         │      ┌───────────┐ ┌───────────┐                             │
│         │      │ WiFi AP   │ │  Ethernet │                             │
│         │      │.100.1     │ │  .100.10  │                             │
│         │      └─────┬─────┘ └───────────┘                             │
│         │            │                                                  │
└─────────┼────────────┼──────────────────────────────────────────────────┘
          │            │
          │            ▼
          │   ┌─────────────────────────────────────┐
          │   │     RED INTERNA 192.168.100.x       │
          │   │                                     │
          │   │   Dispositivos WiFi conectados:     │
          │   │   - Móviles técnicos                │
          │   │   - Laptops de campo                │
          │   │   - Dispositivos IoT                │
          │   └─────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        RED MESH LoRa 915 MHz                            │
│                                                                          │
│    ┌─────────┐         ┌─────────┐         ┌─────────┐                  │
│    │ T1000-E │◄───────►│ T1000-E │◄───────►│ T1000-E │                  │
│    │ Nodo 1  │         │ Nodo 2  │         │ Nodo 3  │                  │
│    │         │         │         │         │         │                  │
│    │ Usuario │         │ Repetid │         │ Usuario │                  │
│    └─────────┘         └─────────┘         └─────────┘                  │
│         │                   │                   │                        │
│         └───────────────────┼───────────────────┘                        │
│                             │                                            │
│                    Hasta 10+ km por salto                                │
│                    Múltiples saltos posibles                             │
└─────────────────────────────────────────────────────────────────────────┘
```

## Redes del Sistema

### Red Externa (192.168.68.x)

- **Router**: Starlink (192.168.68.1)
- **Función**: Conexión a internet y red local principal
- **Dispositivos**:
  - Raspberry Pi 5: 192.168.68.127
  - reComputer R1025-10: 192.168.68.130
  - Dispositivos de administración

### Red Interna (192.168.100.x)

- **AP WiFi**: reComputer (192.168.100.1)
- **Función**: Red aislada para dispositivos de campo
- **SSID**: `MPR114993468244600004-2.4G`
- **Password**: `missionconnected`

### Red Mesh LoRa

- **Frecuencia**: 915 MHz (Región US)
- **Canal**: Test
- **PSK**: `Ml/5IOJQyplnvlzWmnvMrg==`
- **Alcance**: Hasta 10+ km por salto

## Flujo de Datos

### Mensaje Entrante (Usuario → Claude)

```
1. Usuario escribe "@claude ¿cómo puedo mejorar mi cosecha?"
                    │
                    ▼
2. T1000-E transmite por LoRa (915 MHz)
                    │
                    ▼
3. Red mesh propaga el mensaje
                    │
                    ▼
4. Raspberry Pi 5 recibe vía meshtastic
                    │
                    ▼
5. MQTT publica en meshtastic/2/json/LongFast/!69d01ebc
                    │
                    ▼
6. Node-RED recibe y detecta @claude
                    │
                    ▼
7. API Claude procesa la consulta
                    │
                    ▼
8. Respuesta enviada de vuelta
```

### Mensaje Saliente (Claude → Usuario)

```
1. Claude genera respuesta
                    │
                    ▼
2. Node-RED formatea para Meshtastic
                    │
                    ▼
3. MQTT publica respuesta
                    │
                    ▼
4. Raspberry Pi 5 transmite por LoRa
                    │
                    ▼
5. Red mesh propaga al destino
                    │
                    ▼
6. T1000-E del usuario recibe respuesta
```

## Puertos y Servicios

| Servicio | Puerto | Host | Descripción |
|----------|--------|------|-------------|
| Meshtastic Web | 80 | 192.168.68.127 | Interfaz web Meshtastic |
| Meshtastic API | 4403 | 192.168.68.127 | API HTTP Meshtastic |
| MQTT Broker | 1883 | 192.168.68.127 | Broker Mosquitto |
| Node-RED | 1880 | 192.168.100.10 | Editor de flujos |
| SSH RPI | 22 | 192.168.68.127 | Acceso SSH |
| SSH reComputer | 22 | 192.168.68.130 | Acceso SSH |

## Consideraciones de Seguridad

1. **Segregación de redes**: La red interna (192.168.100.x) está aislada
2. **WiFi con contraseña**: Red interna protegida
3. **PSK Meshtastic**: Canal encriptado
4. **API Key Claude**: Almacenada solo en Node-RED
5. **Sin exposición externa**: Servicios solo accesibles localmente

## Escalabilidad

El sistema puede escalar:

- **Horizontalmente**: Agregando más trackers T1000-E
- **Verticalmente**: Agregando repetidores LoRa para mayor alcance
- **Geográficamente**: Múltiples gateways en diferentes ubicaciones
