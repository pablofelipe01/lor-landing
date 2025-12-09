---
sidebar_position: 8
---

# System Architecture

## Overview

The system is designed with a two-layer network architecture that allows both local connectivity and internet access.

## Complete Network Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         INTERNET (Starlink)                              │
│                              ▲                                           │
│                              │                                           │
│                    ┌─────────┴─────────┐                                │
│                    │   Starlink Router │                                │
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
          │   │     INTERNAL NETWORK 192.168.100.x  │
          │   │                                     │
          │   │   Connected WiFi devices:           │
          │   │   - Tech mobile phones              │
          │   │   - Field laptops                   │
          │   │   - IoT devices                     │
          │   └─────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        LoRa MESH NETWORK 915 MHz                        │
│                                                                          │
│    ┌─────────┐         ┌─────────┐         ┌─────────┐                  │
│    │ T1000-E │◄───────►│ T1000-E │◄───────►│ T1000-E │                  │
│    │ Node 1  │         │ Node 2  │         │ Node 3  │                  │
│    │         │         │         │         │         │                  │
│    │ User    │         │ Repeater│         │ User    │                  │
│    └─────────┘         └─────────┘         └─────────┘                  │
│         │                   │                   │                        │
│         └───────────────────┼───────────────────┘                        │
│                             │                                            │
│                    Up to 10+ km per hop                                  │
│                    Multiple hops possible                                │
└─────────────────────────────────────────────────────────────────────────┘
```

## System Networks

### External Network (192.168.68.x)

- **Router**: Starlink (192.168.68.1)
- **Function**: Internet connection and main local network
- **Devices**:
  - Raspberry Pi 5: 192.168.68.127
  - reComputer R1025-10: 192.168.68.130
  - Administration devices

### Internal Network (192.168.100.x)

- **WiFi AP**: reComputer (192.168.100.1)
- **Function**: Isolated network for field devices
- **SSID**: `MPR114993468244600004-2.4G`
- **Password**: `missionconnected`

### LoRa Mesh Network

- **Frequency**: 915 MHz (US Region)
- **Channel**: Test
- **PSK**: `Ml/5IOJQyplnvlzWmnvMrg==`
- **Range**: Up to 10+ km per hop

## Data Flow

### Incoming Message (User → Claude)

```
1. User writes "@claude how can I improve my harvest?"
                    │
                    ▼
2. T1000-E transmits via LoRa (915 MHz)
                    │
                    ▼
3. Mesh network propagates the message
                    │
                    ▼
4. Raspberry Pi 5 receives via meshtastic
                    │
                    ▼
5. MQTT publishes to meshtastic/2/json/LongFast/!69d01ebc
                    │
                    ▼
6. Node-RED receives and detects @claude
                    │
                    ▼
7. Claude API processes the query
                    │
                    ▼
8. Response sent back
```

### Outgoing Message (Claude → User)

```
1. Claude generates response
                    │
                    ▼
2. Node-RED formats for Meshtastic
                    │
                    ▼
3. MQTT publishes response
                    │
                    ▼
4. Raspberry Pi 5 transmits via LoRa
                    │
                    ▼
5. Mesh network propagates to destination
                    │
                    ▼
6. User's T1000-E receives response
```

## Ports and Services

| Service | Port | Host | Description |
|---------|------|------|-------------|
| Meshtastic Web | 80 | 192.168.68.127 | Meshtastic web interface |
| Meshtastic API | 4403 | 192.168.68.127 | Meshtastic HTTP API |
| MQTT Broker | 1883 | 192.168.68.127 | Mosquitto broker |
| Node-RED | 1880 | 192.168.100.10 | Flow editor |
| SSH RPI | 22 | 192.168.68.127 | SSH access |
| SSH reComputer | 22 | 192.168.68.130 | SSH access |

## Security Considerations

1. **Network segregation**: Internal network (192.168.100.x) is isolated
2. **Password-protected WiFi**: Internal network protected
3. **Meshtastic PSK**: Encrypted channel
4. **Claude API Key**: Stored only in Node-RED
5. **No external exposure**: Services only accessible locally

## Scalability

The system can scale:

- **Horizontally**: Adding more T1000-E trackers
- **Vertically**: Adding LoRa repeaters for greater range
- **Geographically**: Multiple gateways in different locations
