---
sidebar_position: 1
---

# Send Message to Claude

Step-by-step guide to send messages and receive responses from Claude AI.

## Prerequisites

- T1000-E tracker configured and powered on
- Meshtastic app installed on your phone
- Bluetooth connection with tracker
- Being within range of the mesh network

## Step by Step

### 1. Connect App to Tracker

1. Open Meshtastic app
2. Enable Bluetooth if not active
3. Select your T1000-E from the list
4. Wait for connection (green LED on tracker)

### 2. Go to Messages

1. In the app, tap "Messages" tab
2. Select "Test" channel or primary channel

### 3. Write Message with @claude

For Claude to respond, **you must include @claude** in your message:

```
@claude When is it best to plant tomatoes?
```

:::tip Important
The message MUST contain `@claude` to be processed by the AI.
:::

### 4. Send

1. Tap send button
2. The message will appear in the chat
3. Wait for response (5-30 seconds)

### 5. Receive Response

Claude's response will appear in the chat:

```
Plant tomatoes when there's no risk of frost.
Ideal temp 20-25°C. In tropical zones: year-round.
In temperate zones: spring.
```

## Query Examples

### Agriculture

```
@claude How often should I water corn?
```

```
@claude How do I control pests in my coffee plantation?
```

```
@claude What natural fertilizer can I make?
```

### Weather and Planting

```
@claude What can I plant in dry season?
```

```
@claude How do I protect my crops from excess rain?
```

### Education

```
@claude Explain fractions simply
```

```
@claude Why is the sky blue?
```

### Basic Health

```
@claude What should I do for a mild stomach ache?
```

```
@claude How do I prevent dehydration?
```

## Tips for Better Responses

### Be Specific

❌ Bad:
```
@claude plants
```

✅ Good:
```
@claude How do I care for tomato plants in hot weather?
```

### Ask One Question at a Time

❌ Bad:
```
@claude When do I plant and how do I water and what fertilizer do I use?
```

✅ Good:
```
@claude When is it best to plant beans?
```

### Mention Context

```
@claude I have chickens. What should I feed them if they're not laying eggs?
```

```
@claude My corn has yellow leaves. What could it be?
```

## Limitations

### Response Length

- Responses are limited to ~200 characters
- Due to LoRa network limitations
- If you need more detail, ask follow-up questions

### Response Time

- Typical: 5-25 seconds
- Depends on:
  - Distance to gateway
  - Number of hops in mesh
  - Claude API load

### No Internet = No Claude

- Claude requires internet
- If Starlink is offline, there will be no responses
- Messages between trackers will still work

## Troubleshooting

### No Response

1. **Check @claude**: Did you include `@claude` in the message?
2. **Wait longer**: It can take up to 30 seconds
3. **Check connection**: Is your tracker in the mesh?
4. **Retry**: Send the message again

### Response Cut Off

- Normal due to character limit
- Ask a more specific question
- Or ask to continue: `@claude continue`

### "Error" Response or Similar

- There may be an internet problem
- Retry in a few minutes
- If it persists, gateway may be offline

## Messages Without Claude

You can send normal messages without `@claude`:

```
Hello family, I arrived safely
```

These messages:
- Are sent to everyone on the channel
- Are not processed by Claude
- Don't require internet
- Work even if Starlink is offline

## Practice

Try these practice messages:

1. Normal greeting (without @claude):
   ```
   Hello, testing the mesh network
   ```

2. Simple query to Claude:
   ```
   @claude What's a good time to water?
   ```

3. Educational question:
   ```
   @claude How many planets are in the solar system?
   ```
