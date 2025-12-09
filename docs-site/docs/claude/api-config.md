---
sidebar_position: 3
---

# Claude API Configuration

Setup and configuration of the Claude API integration.

## API Overview

We use the Claude Messages API to process user questions.

**Endpoint**: `https://api.anthropic.com/v1/messages`

## Authentication

### API Key
The API key is stored as an environment variable in Node-RED.

Format: `sk-ant-api03-xxxxx...`

### Headers Required
```
x-api-key: <your-api-key>
anthropic-version: 2023-06-01
content-type: application/json
```

## Request Format

### Basic Request
```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 150,
  "messages": [
    {
      "role": "user",
      "content": "Your question here"
    }
  ]
}
```

### With System Prompt
```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 150,
  "system": "You are a helpful assistant for a rural community. Give brief, clear answers. Maximum 2-3 sentences.",
  "messages": [
    {
      "role": "user",
      "content": "What is LoRa?"
    }
  ]
}
```

## Response Format

### Successful Response
```json
{
  "id": "msg_01XFDUDYJgAACzvnptvVoYEL",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "LoRa (Long Range) is a wireless technology that enables long-distance communication with low power consumption, ideal for IoT devices."
    }
  ],
  "model": "claude-sonnet-4-20250514",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 10,
    "output_tokens": 35
  }
}
```

## Configuration Parameters

### Model Selection
| Model | Speed | Quality | Cost |
|-------|-------|---------|------|
| claude-sonnet-4-20250514 | Fast | Good | Low |
| claude-opus-4-20250514 | Slow | Best | High |

We use `claude-sonnet-4-20250514` for speed and cost efficiency.

### Token Limits
- `max_tokens`: 150 (keeps responses short for LoRa)
- LoRa message limit: ~230 bytes
- We truncate responses over 200 characters

### System Prompt
```
You are a helpful assistant for a rural community.
Give brief, clear answers. Maximum 2-3 sentences.
Respond in the same language as the question.
```

## Error Handling

### Common Errors

#### 401 Unauthorized
```json
{
  "error": {
    "type": "authentication_error",
    "message": "invalid x-api-key"
  }
}
```
**Solution**: Verify API key is correct.

#### 429 Rate Limited
```json
{
  "error": {
    "type": "rate_limit_error",
    "message": "Rate limit exceeded"
  }
}
```
**Solution**: Wait and implement rate limiting.

#### 500 Server Error
```json
{
  "error": {
    "type": "api_error",
    "message": "Internal server error"
  }
}
```
**Solution**: Retry after a few seconds.

## Rate Limiting

To avoid hitting rate limits, implement delays between requests:

```javascript
// In Node-RED function node
var lastCall = flow.get("lastClaudeCall") || 0;
var now = Date.now();

if (now - lastCall < 5000) { // 5 second minimum
    return null; // Skip this request
}

flow.set("lastClaudeCall", now);
return msg;
```

## Testing the API

### Using curl
```bash
curl -X POST https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 100,
    "messages": [
      {"role": "user", "content": "Say hello"}
    ]
  }'
```

### Using Node-RED
1. Add Inject node
2. Add Function node with test payload
3. Add HTTP Request node
4. Add Debug node
5. Deploy and click inject

## Costs

API calls are billed based on tokens:
- Input tokens: Question length
- Output tokens: Response length

With our configuration (~150 tokens max), costs are minimal per query.

## Security Notes

- Never expose API key in client-side code
- Store key in environment variables
- Rotate keys periodically
- Monitor usage for anomalies
