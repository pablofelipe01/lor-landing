---
sidebar_position: 1
---

# Send a Message

Guide for sending messages through the mesh network.

## Prerequisites

- T1000-E tracker configured and powered on
- Meshtastic app on your smartphone
- Tracker connected via Bluetooth

## Send a Regular Message

### Using the Meshtastic App

1. Open the Meshtastic app
2. Go to the **Messages** tab
3. Select the **LongFast** channel (or your configured channel)
4. Type your message
5. Tap **Send**

### Message will:
- Travel through the LoRa mesh network
- Be received by all nodes in range
- Hop through intermediate nodes if needed

## Send a Message to Claude {#send-to-claude}

To get a response from Claude AI, include `@claude` in your message.

### Example Messages

```
@claude What is the weather forecast?
```

```
@claude How do I plant tomatoes?
```

```
@claude Translate "hello" to Spanish
```

### Important Notes

1. **Always include `@claude`** - exactly as written (lowercase)
2. **Keep questions short** - LoRa has message size limits
3. **Wait for response** - may take 5-30 seconds
4. **One question at a time** - don't send multiple before receiving response

## Response Behavior

### Successful Response
- Claude's answer appears as a new message in the channel
- All network members can see the response
- Response is truncated if too long (~200 characters)

### No Response?
If you don't receive a response after 30 seconds:

1. Verify you included `@claude`
2. Check your tracker has signal (green LED)
3. Try sending again
4. Contact administrator if problem persists

## Message Limits

| Limit | Value |
|-------|-------|
| Max message size | ~230 bytes |
| Max response | ~200 characters |
| Recommended question length | Under 100 characters |

## Tips for Best Results

### Good Questions
- Short and specific
- Clear language
- One topic per message

**Good**: `@claude What temperature kills tomato plants?`

**Bad**: `@claude I want to know everything about growing tomatoes including when to plant them what temperature they need how much water and what pests to watch out for`

### Language
- Claude responds in the same language as your question
- Works in English, Spanish, and many other languages

## Quick Test

To verify your setup is working:

```
@claude hello
```

You should receive a greeting response within 30 seconds.

## Troubleshooting

### Message not sending
- Check Bluetooth connection
- Restart the app
- Power cycle the tracker

### No response from Claude
- Verify `@claude` is in message
- Check if gateway is online
- Wait longer (up to 30 seconds)
- Try simpler question

### Truncated response
- Normal for longer answers
- Ask follow-up question for more details
