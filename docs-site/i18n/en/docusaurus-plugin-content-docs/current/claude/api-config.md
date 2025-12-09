---
sidebar_position: 3
---

# Claude API Configuration

Guide to configure and use the Claude AI API in the system.

## API Information

| Parameter | Value |
|-----------|-------|
| Endpoint | https://api.anthropic.com/v1/messages |
| Model | claude-sonnet-4-20250514 |
| API Version | 2023-06-01 |

## Get API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create account or sign in
3. Go to "API Keys"
4. Create new key
5. Copy and store securely

:::warning Security
Never share your API key. Never include it in public code.
:::

## Node-RED Configuration

### Required Headers

```javascript
msg.headers = {
    "x-api-key": "sk-ant-api03-YOUR_API_KEY_HERE",
    "anthropic-version": "2023-06-01",
    "content-type": "application/json"
};
```

### Request Body

```javascript
msg.payload = {
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 300,
    "messages": [
        {
            "role": "user",
            "content": "Your question here"
        }
    ],
    "system": "System instructions"
};
```

## Request Parameters

### model

Claude model to use:

| Model | Description | Use |
|-------|-------------|-----|
| claude-sonnet-4-20250514 | Sonnet 4 | **Recommended** |
| claude-3-haiku-20240307 | Haiku 3 | Faster, lower cost |
| claude-3-opus-20240229 | Opus 3 | More capable, higher cost |

### max_tokens

Maximum tokens in response:
- **Recommended**: 300 (enough for short responses)
- **Minimum**: 100
- **Maximum**: Depends on model

### system

System instructions that define behavior:

```javascript
"system": "You are an assistant for rural communities in Latin America.
Respond briefly, practically, and in Spanish.
Maximum 200 characters due to LoRa network limitations.
Focus on agriculture, weather, basic health, and education."
```

### messages

Array of conversation messages:

```javascript
"messages": [
    {
        "role": "user",
        "content": "When should I water my tomatoes?"
    }
]
```

## Complete Request Example

```javascript
// In Node-RED Function node

// Prepare the request
msg.payload = {
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 300,
    "messages": [
        {
            "role": "user",
            "content": msg.payload  // User's question
        }
    ],
    "system": "You are an assistant for rural communities. Respond briefly. Maximum 200 characters."
};

// Headers
msg.headers = {
    "x-api-key": "sk-ant-api03-xxxxx",  // YOUR API KEY
    "anthropic-version": "2023-06-01",
    "content-type": "application/json"
};

return msg;
```

## API Response

### Successful Response Structure

```json
{
  "id": "msg_01234567890",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Water your tomatoes early in the morning, 2-3 times per week. Avoid wetting the leaves."
    }
  ],
  "model": "claude-sonnet-4-20250514",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 25,
    "output_tokens": 32
  }
}
```

### Extract the Response

```javascript
// In Function node after HTTP Request

var response = msg.payload.content[0].text;
return msg;
```

## Error Handling

### Common Errors

| Code | Cause | Solution |
|------|-------|----------|
| 401 | Invalid API key | Verify key |
| 429 | Rate limit | Wait and retry |
| 500 | Server error | Retry |
| 529 | API overloaded | Wait |

### Error Handling Node

```javascript
// After HTTP Request

if (msg.statusCode !== 200) {
    // API error
    node.error("API Error: " + msg.statusCode);
    msg.payload = {
        "text": "Error querying. Try again."
    };
    return msg;
}

// Process successful response
var response = msg.payload.content[0].text;
msg.payload = { "text": response };
return msg;
```

## Cost Optimization

### Reduce Tokens

1. **Short system prompt**: Fewer tokens = lower cost
2. **Limit max_tokens**: 300 is enough
3. **Economical model**: Use Haiku for simple queries

### Filter Messages

Don't send everything to Claude:
- Only messages with `@claude`
- Ignore duplicates
- Implement cooldown between queries

```javascript
// 10 second cooldown between queries from same user
var lastQuery = flow.get("lastQuery_" + msg.sender) || 0;
var now = Date.now();

if (now - lastQuery < 10000) {
    return null; // Ignore
}

flow.set("lastQuery_" + msg.sender, now);
return msg;
```

## Assistant Customization

### For Agriculture

```javascript
"system": "You are a virtual agronomist for small farmers.
You know tropical crops: corn, beans, coffee, plantain.
Respond in simple Spanish, maximum 200 characters.
Give practical advice on planting, irrigation, pests, and harvest."
```

### For Education

```javascript
"system": "You are an educational tutor for rural students.
Explain math, science, and Spanish simply.
Respond in Spanish, maximum 200 characters.
Use everyday examples from rural life."
```

### For Health

```javascript
"system": "You are a basic health assistant.
Give general information about first aid and prevention.
Always recommend consulting a doctor for serious cases.
Respond in Spanish, maximum 200 characters."
```

## Usage Monitoring

### In Anthropic Console

1. Go to console.anthropic.com
2. View "Usage" for statistics
3. Configure spending alerts

### Logging in Node-RED

```javascript
// Add after each successful query
var usage = msg.payload.usage;
node.warn("Tokens used - Input: " + usage.input_tokens +
          ", Output: " + usage.output_tokens);
```

## API Key Security

### Secure Storage

1. **Don't hardcode** in visible flow
2. Use Node-RED **environment variables**
3. Or use Node-RED **credentials**

### Use Environment Variables

In Node-RED settings.js:
```javascript
process.env.CLAUDE_API_KEY = "sk-ant-api03-xxxxx";
```

In the flow:
```javascript
var apiKey = env.get("CLAUDE_API_KEY");
msg.headers["x-api-key"] = apiKey;
```

### Key Rotation

1. Create new key in console
2. Update in Node-RED
3. Verify functionality
4. Delete old key
