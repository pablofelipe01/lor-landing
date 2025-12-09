---
sidebar_position: 2
---

# Message Flow

Detailed explanation of how messages travel through the system.

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER DEVICE                               │
│                        (T1000-E)                                 │
│                                                                  │
│  User types: "@claude What is photosynthesis?"                  │
│                           │                                      │
│                           ▼                                      │
│                    [Send Message]                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ LoRa Radio (915 MHz)
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     LORA MESH NETWORK                            │
│                                                                  │
│    May hop through other nodes if direct path unavailable       │
│                                                                  │
│    [T1000-E] ──► [Other Node] ──► [Gateway]                     │
│         or                                                       │
│    [T1000-E] ──────────────────► [Gateway]                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ USB Serial
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    RASPBERRY PI 5 GATEWAY                        │
│                    192.168.68.127                                │
│                                                                  │
│  ┌─────────────┐        ┌─────────────────┐                     │
│  │ Heltec      │        │ Meshtastic      │                     │
│  │ ESP32 LoRa  │───────►│ Daemon          │                     │
│  │ /dev/ttyUSB │        │                 │                     │
│  └─────────────┘        └────────┬────────┘                     │
│                                  │                               │
│                                  │ Publishes to MQTT            │
│                                  ▼                               │
│                         ┌─────────────────┐                     │
│                         │ Mosquitto       │                     │
│                         │ Port 1883       │                     │
│                         └────────┬────────┘                     │
└────────────────────────────────────┬────────────────────────────┘
                                     │
                                     │ MQTT (TCP/1883)
                                     │ Topic: meshtastic/2/json/LongFast/!69d01ebc
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    RECOMPUTER R1025-10                           │
│                    192.168.68.130                                │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      NODE-RED                            │   │
│  │                                                          │   │
│  │  [MQTT In] ──► [Detect @claude] ──► [Prepare Request]   │   │
│  │                                            │             │   │
│  │                                            ▼             │   │
│  │                                    [HTTP Request]        │   │
│  │                                    api.anthropic.com     │   │
│  │                                            │             │   │
│  │                                            ▼             │   │
│  │  [MQTT Out] ◄── [Format Response] ◄── [Process]         │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTPS (443)
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                       CLAUDE API                                 │
│                    api.anthropic.com                             │
│                                                                  │
│  Receives: "What is photosynthesis?"                            │
│  Returns: "Photosynthesis is the process by which plants..."    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Response Path

The response follows the reverse path:

```
Claude API
    │
    ▼
Node-RED (Process & Format)
    │
    ▼
MQTT Publish (sendtext topic)
    │
    ▼
Mosquitto Broker
    │
    ▼
Meshtastic Daemon
    │
    ▼
LoRa Radio
    │
    ▼
T1000-E (User receives response)
```

## Timing

| Step | Typical Time |
|------|-------------|
| User to Gateway (LoRa) | 1-5 seconds |
| MQTT Processing | Less than 100ms |
| Claude API | 2-10 seconds |
| Response to User | 1-5 seconds |
| **Total** | **5-30 seconds** |

## Message Transformation

### 1. Original Message (LoRa)
Binary LoRa packet with text payload.

### 2. MQTT Message (JSON)
```json
{
  "channel": 0,
  "from": 2846474973,
  "payload": {
    "text": "@claude What is photosynthesis?"
  },
  "sender": "!a9b8c7d6",
  "type": "text"
}
```

### 3. Claude API Request
```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 150,
  "messages": [
    {
      "role": "user",
      "content": "What is photosynthesis?"
    }
  ]
}
```

### 4. Claude API Response
```json
{
  "content": [
    {
      "type": "text",
      "text": "Photosynthesis is the process by which plants convert sunlight, water, and CO2 into glucose and oxygen."
    }
  ]
}
```

### 5. MQTT Response
Simple text string sent to sendtext topic.

### 6. LoRa Response
Binary packet with truncated text (max ~200 chars).
