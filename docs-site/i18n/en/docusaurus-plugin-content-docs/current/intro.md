---
sidebar_position: 1
slug: /
---

# Introduction

Welcome to the technical documentation for the **LoRa Mesh Network + Claude AI** for rural connectivity.

## What is this project?

This project implements a mesh communication network based on LoRa (Long Range) technology integrated with artificial intelligence (Claude AI) to provide connectivity in rural areas without traditional mobile coverage.

## General Architecture

The system consists of:

1. **Main Gateway**: Raspberry Pi 5 with LoRa module
2. **Mission Pack**: reComputer R1025-10 with Node-RED and Claude AI
3. **Field Devices**: T1000-E trackers and ESP32 modules
4. **Connectivity**: Starlink for internet access

```
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL NETWORK (Starlink)              │
│                      192.168.68.x                           │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ Raspberry Pi 5│    │  reComputer   │    │    Other      │
│ 192.168.68.127│    │R1025-10       │    │   Devices     │
│               │    │192.168.68.130 │    │               │
│  Meshtastic   │    │192.168.100.10 │    │               │
│  Gateway      │    │               │    │               │
└───────────────┘    │  Node-RED +   │    └───────────────┘
        │            │  Claude AI    │
        │            └───────────────┘
        │                     │
        ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    LoRa MESH NETWORK                        │
│                    915 MHz (US)                             │
│                                                             │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐               │
│   │T1000-E  │    │T1000-E  │    │T1000-E  │               │
│   │Tracker 1│◄──►│Tracker 2│◄──►│Tracker 3│               │
│   └─────────┘    └─────────┘    └─────────┘               │
└─────────────────────────────────────────────────────────────┘
```

## Main Components

| Component | Function | IP/Identifier |
|-----------|----------|---------------|
| Raspberry Pi 5 | Main Meshtastic gateway | 192.168.68.127 |
| reComputer R1025-10 | Node-RED + Claude AI server | 192.168.68.130 / 192.168.100.10 |
| T1000-E Trackers | Field devices | Various mesh nodes |
| Starlink | Internet connection | 192.168.68.x (DHCP) |

## Communication Flow

1. **User sends message** from T1000-E tracker
2. **Message travels** through the LoRa mesh network
3. **Raspberry Pi 5** receives and publishes to MQTT
4. **Node-RED** processes the message
5. If it contains `@claude`, **Claude AI responds**
6. **Response travels** back through the mesh network

## Next Steps

- [Configure Hardware](/hardware/raspberry-pi)
- [Configure Meshtastic](/configuracion/meshtastic)
- [Integrate Claude AI](/claude/node-red)
