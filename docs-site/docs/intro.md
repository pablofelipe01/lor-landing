---
sidebar_position: 1
slug: /
---

# Introducción

Bienvenido a la documentación técnica de la **Red Mesh LoRa + Claude AI** para conectividad rural.

## ¿Qué es este proyecto?

Este proyecto implementa una red de comunicación mesh basada en tecnología LoRa (Long Range) integrada con inteligencia artificial (Claude AI) para proporcionar conectividad en zonas rurales sin cobertura móvil tradicional.

## Arquitectura General

El sistema consta de:

1. **Gateway Principal**: Raspberry Pi 5 con módulo LoRa
2. **Mission Pack**: reComputer R1025-10 con Node-RED y Claude AI
3. **Dispositivos de Campo**: Trackers T1000-E y módulos ESP32
4. **Conectividad**: Starlink para acceso a internet

```
┌─────────────────────────────────────────────────────────────┐
│                    RED EXTERNA (Starlink)                   │
│                      192.168.68.x                           │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ Raspberry Pi 5│    │  reComputer   │    │    Otros      │
│ 192.168.68.127│    │R1025-10       │    │  Dispositivos │
│               │    │192.168.68.130 │    │               │
│  Meshtastic   │    │192.168.100.10 │    │               │
│  Gateway      │    │               │    │               │
└───────────────┘    │  Node-RED +   │    └───────────────┘
        │            │  Claude AI    │
        │            └───────────────┘
        │                     │
        ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    RED MESH LoRa                            │
│                    915 MHz (US)                             │
│                                                             │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐               │
│   │T1000-E  │    │T1000-E  │    │T1000-E  │               │
│   │Tracker 1│◄──►│Tracker 2│◄──►│Tracker 3│               │
│   └─────────┘    └─────────┘    └─────────┘               │
└─────────────────────────────────────────────────────────────┘
```

## Componentes Principales

| Componente | Función | IP/Identificador |
|------------|---------|------------------|
| Raspberry Pi 5 | Gateway Meshtastic principal | 192.168.68.127 |
| reComputer R1025-10 | Servidor Node-RED + Claude AI | 192.168.68.130 / 192.168.100.10 |
| T1000-E Trackers | Dispositivos de campo | Varios nodos mesh |
| Starlink | Conexión a internet | 192.168.68.x (DHCP) |

## Flujo de Comunicación

1. **Usuario envía mensaje** desde tracker T1000-E
2. **Mensaje viaja** por la red mesh LoRa
3. **Raspberry Pi 5** recibe y publica en MQTT
4. **Node-RED** procesa el mensaje
5. Si contiene `@claude`, **Claude AI responde**
6. **Respuesta viaja** de vuelta por la red mesh

## Próximos Pasos

- [Configurar Hardware](/hardware/raspberry-pi)
- [Configurar Meshtastic](/configuracion/meshtastic)
- [Integrar Claude AI](/claude/node-red)
