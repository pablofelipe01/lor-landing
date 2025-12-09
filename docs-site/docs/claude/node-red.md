---
sidebar_position: 1
---

# Node-RED Configuration

Node-RED flow for Claude AI integration.

## Access Node-RED

- **URL**: http://192.168.100.10:1880
- **Username**: admin
- **Password**: [ask administrator]

## Flow Overview

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  MQTT In    │───►│ Detect       │───►│ Claude API  │
│  (receive)  │    │ @claude      │    │ Request     │
└─────────────┘    └──────────────┘    └──────┬──────┘
                                              │
┌─────────────┐    ┌──────────────┐    ┌──────▼──────┐
│  MQTT Out   │◄───│ Format       │◄───│ Process     │
│  (send)     │    │ Response     │    │ Response    │
└─────────────┘    └──────────────┘    └─────────────┘
```

## Nodes Configuration

### 1. MQTT In Node
Receives messages from the mesh network.

**Settings**:
- Server: 192.168.68.127:1883
- Topic: `meshtastic/2/json/LongFast/!69d01ebc`
- QoS: 0
- Output: auto-detect

### 2. Detect @claude (Function Node)
Filters messages containing "@claude".

```javascript
var payload = msg.payload;

// Parse if string
if (typeof payload === 'string') {
    try {
        payload = JSON.parse(payload);
    } catch (e) {
        return null;
    }
}

// Check for text message with @claude
if (payload.payload && payload.payload.text) {
    var text = payload.payload.text;
    if (text.toLowerCase().includes('@claude')) {
        msg.originalSender = payload.sender;
        msg.question = text.replace(/@claude/gi, '').trim();
        return msg;
    }
}
return null;
```

### 3. Claude API Request (HTTP Request Node)
Sends request to Claude API.

**Settings**:
- Method: POST
- URL: `https://api.anthropic.com/v1/messages`
- Headers:
  - `x-api-key`: [API KEY]
  - `anthropic-version`: 2023-06-01
  - `content-type`: application/json

### 4. Prepare Request (Function Node)
Formats the request body for Claude.

```javascript
msg.payload = {
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 150,
    "system": "You are a helpful assistant for a rural community. Give brief, clear answers. Maximum 2-3 sentences. Respond in the same language as the question.",
    "messages": [
        {
            "role": "user",
            "content": msg.question
        }
    ]
};

msg.headers = {
    "x-api-key": env.get("CLAUDE_API_KEY"),
    "anthropic-version": "2023-06-01",
    "content-type": "application/json"
};

return msg;
```

### 5. Process Response (Function Node)
Extracts Claude's response.

```javascript
if (msg.payload && msg.payload.content && msg.payload.content[0]) {
    msg.response = msg.payload.content[0].text;
    return msg;
}
return null;
```

### 6. Format for MQTT (Function Node)
Prepares message for mesh network.

```javascript
// Truncate if too long (LoRa limit ~230 bytes)
var response = msg.response;
if (response.length > 200) {
    response = response.substring(0, 197) + "...";
}

msg.payload = response;
msg.topic = "meshtastic/2/json/LongFast/!69d01ebc/sendtext";

return msg;
```

### 7. MQTT Out Node
Sends response back to mesh.

**Settings**:
- Server: 192.168.68.127:1883
- Topic: (set by previous function node)
- QoS: 0
- Retain: false

## Environment Variables

Set in Node-RED settings:
- `CLAUDE_API_KEY`: Your Anthropic API key

## Import Flow

To import the complete flow:
1. Open Node-RED
2. Menu → Import
3. Paste the flow JSON
4. Click Import
5. Deploy

## Debugging

Add debug nodes after each step to see message flow:
1. After MQTT In - see raw messages
2. After Detect @claude - see filtered messages
3. After Claude API - see responses
4. After Format - see final output
