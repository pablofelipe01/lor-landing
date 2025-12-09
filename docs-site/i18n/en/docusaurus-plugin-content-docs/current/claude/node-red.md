---
sidebar_position: 1
---

# Node-RED with Claude AI

Node-RED is the platform that connects Meshtastic messages with the Claude AI API.

## Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           NODE-RED                                      │
│                                                                         │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐  │
│  │  MQTT   │   │  JSON   │   │ Detect  │   │ Claude  │   │  MQTT   │  │
│  │   In    │──►│ Parse   │──►│ @claude │──►│   API   │──►│   Out   │  │
│  │         │   │         │   │         │   │         │   │         │  │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘  │
│       │                           │                            │        │
│       │                           │ No @claude                 │        │
│       │                           ▼                            │        │
│       │                      [Ignore]                          │        │
│       │                                                        │        │
└───────┼────────────────────────────────────────────────────────┼────────┘
        │                                                        │
        │ MQTT                                                   │ MQTT
        ▼                                                        ▼
   Meshtastic                                               Meshtastic
   (Input)                                                   (Output)
```

## Access Node-RED

| Network | URL |
|---------|-----|
| External | http://192.168.68.130:1880 |
| Internal | http://192.168.100.10:1880 |

## 4-Node Flow

The flow consists of 4 main nodes:

### 1. MQTT In - Receive Messages

**Type**: mqtt in

**Configuration**:
| Parameter | Value |
|-----------|-------|
| Server | 192.168.68.127:1883 |
| Topic | `meshtastic/2/json/LongFast/!69d01ebc` |
| QoS | 0 |
| Output | auto-detect (parsed JSON) |

### 2. Function - Detect @claude

**Type**: function

**Name**: Detect @claude

**Code**:
```javascript
// Verify it's a text message
if (!msg.payload || !msg.payload.payload || !msg.payload.payload.text) {
    return null;
}

var text = msg.payload.payload.text;

// Check if it contains @claude
if (text.toLowerCase().indexOf("@claude") === -1) {
    return null;
}

// Extract message without @claude
var question = text.replace(/@claude/gi, "").trim();

// Save sender information
msg.sender = msg.payload.sender;
msg.from = msg.payload.from;
msg.originalText = text;

// Prepare message for Claude
msg.payload = question;

return msg;
```

### 3. HTTP Request - Claude API

**Type**: http request

**Configuration**:
| Parameter | Value |
|-----------|-------|
| Method | POST |
| URL | https://api.anthropic.com/v1/messages |
| Return | a parsed JSON object |

**Headers** (configure in node):
```
x-api-key: sk-ant-api03-xxxxx (your API key)
anthropic-version: 2023-06-01
content-type: application/json
```

**Previous Function node to prepare body**:
```javascript
msg.payload = {
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 300,
    "messages": [
        {
            "role": "user",
            "content": msg.payload
        }
    ],
    "system": "You are an assistant for rural communities. Respond briefly and practically. Maximum 200 characters due to LoRa limitations."
};

msg.headers = {
    "x-api-key": "sk-ant-api03-xxxxx",
    "anthropic-version": "2023-06-01",
    "content-type": "application/json"
};

return msg;
```

### 4. MQTT Out - Send Response

**Type**: mqtt out

**Configuration**:
| Parameter | Value |
|-----------|-------|
| Server | 192.168.68.127:1883 |
| Topic | (configure dynamically) |
| QoS | 0 |
| Retain | false |

**Previous Function node to format response**:
```javascript
// Extract Claude response
var response = msg.payload.content[0].text;

// Truncate if too long (LoRa limit)
if (response.length > 200) {
    response = response.substring(0, 197) + "...";
}

// Format for Meshtastic
msg.payload = {
    "text": response
};

return msg;
```

## Import the Flow

1. Open Node-RED (http://192.168.100.10:1880)
2. Hamburger menu → Import
3. Paste the flow JSON
4. Click "Import"
5. Configure the MQTT broker node
6. Add your Claude API key
7. Deploy

## Test the Flow

### Manual Test via MQTT

```bash
# Publish test message
mosquitto_pub -h 192.168.68.127 -t "meshtastic/2/json/LongFast/!69d01ebc" -m '{
  "payload": {
    "text": "@claude When should I plant tomatoes?"
  },
  "sender": "!test1234",
  "from": 1234567890
}'
```

### View Response

```bash
# Subscribe to responses
mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v
```

## Configure MQTT Broker

In Node-RED, configure the MQTT broker node:

1. Double-click on MQTT node
2. Click pencil next to "Server"
3. Configure:
   - **Name**: Meshtastic MQTT
   - **Server**: 192.168.68.127
   - **Port**: 1883
4. Save

## Debug

### Add Debug Nodes

To see data flow:

1. Add "debug" node after each node
2. Configure to show "complete msg object"
3. View debug panel on the right
4. Deploy and test

### View Node-RED Logs

```bash
# On reComputer
journalctl -u nodered -f
```

## Troubleshooting

### Not detecting messages

1. Verify correct MQTT topic
2. Verify broker connection
3. Add debug after MQTT in
4. Verify message format

### Claude not responding

1. Verify valid API key
2. Verify correct headers
3. View error response in debug
4. Verify internet connection

### Response not reaching tracker

1. Verify MQTT output topic
2. Verify message format
3. Verify Meshtastic gateway is listening
