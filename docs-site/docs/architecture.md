---
sidebar_position: 8
---

# System Architecture

Complete diagram of the LoRa Mesh + Claude AI network.

## Network Topology

```
                                    INTERNET (Starlink)
                                          │
                                          │
                    ┌─────────────────────┴─────────────────────┐
                    │                                           │
                    │         EXTERNAL NETWORK                  │
                    │         192.168.68.x                      │
                    │                                           │
                    │  ┌─────────────┐    ┌─────────────┐      │
                    │  │ Raspberry   │    │ reComputer  │      │
                    │  │ Pi 5        │    │ R1025-10    │      │
                    │  │ .127        │    │ .130        │      │
                    │  │             │    │             │      │
                    │  │ Gateway     │    │ Node-RED    │      │
                    │  │ MQTT Broker │    │ WiFi AP     │      │
                    │  └──────┬──────┘    └──────┬──────┘      │
                    │         │                  │              │
                    └─────────┼──────────────────┼──────────────┘
                              │                  │
                              │ MQTT             │
                              │ 1883             │
                              │                  │
                    ┌─────────┴──────────────────┴──────────────┐
                    │                                           │
                    │         INTERNAL NETWORK                  │
                    │         192.168.100.x                     │
                    │                                           │
                    │         WiFi: MPR114993468244600004-2.4G  │
                    │                                           │
                    │    ┌────────┐  ┌────────┐  ┌────────┐    │
                    │    │ Phone  │  │ Laptop │  │ Tablet │    │
                    │    │ .100+  │  │ .100+  │  │ .100+  │    │
                    │    └────────┘  └────────┘  └────────┘    │
                    │                                           │
                    └───────────────────────────────────────────┘

                              LoRa MESH NETWORK
                              915 MHz (US Region)

                    ┌─────────────────────────────────────────┐
                    │                                         │
                    │    ┌─────────┐         ┌─────────┐     │
                    │    │ Heltec  │◄───────►│ T1000-E │     │
                    │    │ ESP32   │         │ Tracker │     │
                    │    │ LoRa V3 │         │         │     │
                    │    └────┬────┘         └─────────┘     │
                    │         │                               │
                    │         │ USB                           │
                    │         │                               │
                    │    ┌────┴────┐         ┌─────────┐     │
                    │    │ RPi 5   │◄───────►│ T1000-E │     │
                    │    │ Gateway │         │ Tracker │     │
                    │    └─────────┘         └─────────┘     │
                    │                                         │
                    └─────────────────────────────────────────┘
```

## Message Flow

### Sending a message to Claude

```
1. User writes "@claude What is photosynthesis?"
   │
   ▼
2. T1000-E transmits via LoRa
   │
   ▼
3. Heltec module on RPi5 receives
   │
   ▼
4. Meshtastic publishes to MQTT
   Topic: meshtastic/2/json/LongFast/!69d01ebc
   │
   ▼
5. Node-RED (reComputer) receives
   │
   ▼
6. Function node detects "@claude"
   │
   ▼
7. HTTP Request to api.anthropic.com
   │
   ▼
8. Claude responds
   │
   ▼
9. Node-RED publishes to MQTT
   Topic: meshtastic/2/json/LongFast/!69d01ebc/sendtext
   │
   ▼
10. Meshtastic sends via LoRa
    │
    ▼
11. T1000-E receives response
```

## Component Details

| Component | IP | Function |
|-----------|----|---------|
| Raspberry Pi 5 | 192.168.68.127 | Gateway + MQTT Broker |
| reComputer R1025-10 | 192.168.68.130 / 192.168.100.10 | Node-RED + WiFi AP |
| Heltec ESP32 LoRa V3 | USB on RPi5 | LoRa radio module |
| T1000-E Trackers | N/A | End user devices |

## Ports Used

| Port | Service | Location |
|------|---------|----------|
| 1883 | MQTT (Mosquitto) | RPi5 |
| 1880 | Node-RED | reComputer |
| 22 | SSH | Both |
| 80/443 | HTTPS (Claude API) | Internet |
