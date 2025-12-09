---
sidebar_position: 2
---

# Message Flow

Detailed explanation of how a message travels from the user to Claude and back.

## Complete Flow Diagram

```
User with T1000-E
        │
        │ 1. Writes "@claude question?"
        ▼
┌───────────────┐
│   T1000-E     │
│   Tracker     │
│               │
│ Transmits     │
│ via LoRa      │
└───────┬───────┘
        │
        │ 2. LoRa signal 915 MHz
        ▼
┌───────────────────────────────────────────────────────────┐
│                    LoRa MESH NETWORK                      │
│                                                           │
│  Message can pass through multiple nodes                  │
│  (hop limit: 3)                                           │
│                                                           │
└───────────────────────────┬───────────────────────────────┘
                            │
                            │ 3. Gateway receives
                            ▼
                    ┌───────────────┐
                    │ Raspberry Pi 5│
                    │   Gateway     │
                    │               │
                    │ Meshtastic    │
                    │ → MQTT        │
                    └───────┬───────┘
                            │
                            │ 4. Publishes to MQTT
                            │ Topic: meshtastic/2/json/...
                            ▼
                    ┌───────────────┐
                    │    MQTT       │
                    │   Broker      │
                    │  (Mosquitto)  │
                    └───────┬───────┘
                            │
                            │ 5. Node-RED subscribed
                            ▼
┌───────────────────────────────────────────────────────────┐
│                      NODE-RED                             │
│                                                           │
│  6. MQTT In receives message                              │
│         │                                                 │
│         ▼                                                 │
│  7. Function detects @claude                              │
│         │                                                 │
│         ▼                                                 │
│  8. Prepares request for Claude API                       │
│         │                                                 │
│         ▼                                                 │
│  9. HTTP Request to api.anthropic.com                     │
│         │                                                 │
│         ▼                                                 │
│  10. Receives response from Claude                        │
│         │                                                 │
│         ▼                                                 │
│  11. Formats response (max 200 chars)                     │
│         │                                                 │
│         ▼                                                 │
│  12. MQTT Out publishes response                          │
│                                                           │
└───────────────────────────┬───────────────────────────────┘
                            │
                            │ 13. Response in MQTT
                            ▼
                    ┌───────────────┐
                    │    MQTT       │
                    │   Broker      │
                    └───────┬───────┘
                            │
                            │ 14. Gateway subscribed
                            ▼
                    ┌───────────────┐
                    │ Raspberry Pi 5│
                    │   Gateway     │
                    │               │
                    │ MQTT →        │
                    │ Meshtastic    │
                    └───────┬───────┘
                            │
                            │ 15. Transmits LoRa
                            ▼
┌───────────────────────────────────────────────────────────┐
│                    LoRa MESH NETWORK                      │
│                                                           │
│  Response travels through mesh                            │
│                                                           │
└───────────────────────────┬───────────────────────────────┘
                            │
                            │ 16. Tracker receives
                            ▼
                    ┌───────────────┐
                    │   T1000-E     │
                    │   Tracker     │
                    │               │
                    │ Displays      │
                    │ response      │
                    └───────────────┘
                            │
                            ▼
                     User reads
                     the response
```

## Detailed Step by Step

### 1. User Sends Message

The user writes a message on their T1000-E tracker using the Meshtastic app:

```
@claude What's the best time to plant corn in tropical zones?
```

### 2-3. LoRa Transmission

- The T1000-E transmits the message via LoRa radio at 915 MHz
- If the gateway isn't in direct range, other nodes relay
- Maximum 3 hops (hop limit)
- The Raspberry Pi gateway receives the message

### 4. MQTT Publishing

The Meshtastic service on the Raspberry Pi publishes the message to MQTT:

**Topic**: `meshtastic/2/json/LongFast/!69d01ebc`

**Payload**:
```json
{
  "channel": 0,
  "from": 1234567890,
  "id": 987654321,
  "payload": {
    "text": "@claude What's the best time to plant corn in tropical zones?"
  },
  "sender": "!aabbccdd",
  "timestamp": 1699999999,
  "to": 4294967295,
  "type": "text",
  "rssi": -85,
  "snr": 7.5
}
```

### 5-6. Node-RED Receives

The MQTT In node in Node-RED is subscribed to the topic and receives the message.

### 7. @claude Detection

The Function node evaluates if the message contains `@claude`:

```javascript
var text = msg.payload.payload.text;
if (text.toLowerCase().indexOf("@claude") === -1) {
    return null; // Ignore if no @claude
}
```

### 8. Request Preparation

The body for the Claude API is prepared:

```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 300,
  "messages": [
    {
      "role": "user",
      "content": "What's the best time to plant corn in tropical zones?"
    }
  ],
  "system": "You are an assistant for rural communities. Respond briefly and practically. Maximum 200 characters."
}
```

### 9. Request to Claude API

HTTP POST to `https://api.anthropic.com/v1/messages`

Headers:
```
x-api-key: sk-ant-api03-xxxxx
anthropic-version: 2023-06-01
content-type: application/json
```

### 10. Claude Response

Claude processes the question and responds:

```json
{
  "content": [
    {
      "type": "text",
      "text": "In tropical zones, plant corn at the start of rainy season (April-May). Moist but not waterlogged soil. Ideal temp 20-30°C."
    }
  ],
  "model": "claude-sonnet-4-20250514",
  "usage": {
    "input_tokens": 45,
    "output_tokens": 38
  }
}
```

### 11. Response Formatting

Extract and truncate if necessary:

```javascript
var response = msg.payload.content[0].text;
if (response.length > 200) {
    response = response.substring(0, 197) + "...";
}
```

### 12-14. Response Publishing

MQTT Out publishes the response that the gateway receives.

### 15-16. Transmission to User

- The gateway transmits the response via LoRa
- The mesh network propagates it
- The user's tracker receives and displays it

## Typical Times

| Stage | Typical Time |
|-------|--------------|
| LoRa outbound (1 hop) | 1-3 seconds |
| LoRa outbound (3 hops) | 3-9 seconds |
| Local MQTT | under 100 ms |
| Claude API | 2-5 seconds |
| LoRa return | 1-9 seconds |
| **Total** | **5-25 seconds** |

## Limits and Considerations

### Message Size

- **LoRa maximum**: ~230 bytes per message
- **Claude response**: Limited to 200 characters
- **Long messages**: Automatically truncated

### Rate Limits

- **LoRa**: ~1 message every 30 seconds recommended
- **Claude API**: According to API plan
- **MQTT**: No practical limit on local network

### Reliability

- **LoRa**: Does not guarantee delivery (best effort)
- **Mesh**: Improves reliability with multiple routes
- **No ACK**: User doesn't receive delivery confirmation

## Flow Monitoring

### View Incoming Messages

```bash
mosquitto_sub -h 192.168.68.127 -t "meshtastic/2/json/#" -v
```

### View All MQTT Traffic

```bash
mosquitto_sub -h 192.168.68.127 -t "#" -v
```

### Debug in Node-RED

1. Add debug nodes between each step
2. View debug panel in Node-RED
3. Identify where the flow stops
