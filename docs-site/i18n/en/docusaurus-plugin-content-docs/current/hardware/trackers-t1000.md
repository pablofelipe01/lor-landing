---
sidebar_position: 3
---

# T1000-E Trackers

The Seeed Studio SenseCAP Card Tracker T1000-E are the end-user devices that allow sending and receiving messages through the mesh network.

## Specifications

| Feature | Value |
|---------|-------|
| Model | SenseCAP Card Tracker T1000-E |
| Connectivity | LoRa 915 MHz |
| GPS | Integrated |
| Battery | Rechargeable USB-C |
| Size | Credit card size |
| Protection | IP65 (water resistant) |

## Key Features

- **Long-range LoRa**: Communication up to 10+ km
- **Integrated GPS**: Location tracking
- **SOS Button**: For emergencies
- **LED Indicator**: Connection status
- **Compact**: Easy to carry

## Device Diagram

```
┌─────────────────────────────────┐
│                                 │
│     SenseCAP T1000-E           │
│                                 │
│   ┌─────┐                      │
│   │ LED │  ◄── Indicator       │
│   └─────┘                      │
│                                 │
│   ┌─────────────────────┐      │
│   │                     │      │
│   │      Screen         │      │
│   │      (optional)     │      │
│   │                     │      │
│   └─────────────────────┘      │
│                                 │
│         [SOS BUTTON]           │
│                                 │
│                    USB-C ──►   │
└─────────────────────────────────┘
```

## Initial Configuration

### 1. Charge the Device

Connect via USB-C and fully charge before first use.

### 2. Power On

Press and hold the main button for 3 seconds until the LED blinks.

### 3. Configure via Meshtastic App

1. Download the Meshtastic app (Android/iOS)
2. Enable Bluetooth on your phone
3. Open the app and search for devices
4. Select the T1000-E
5. Configure parameters

### 4. Configuration Parameters

| Parameter | Value |
|-----------|-------|
| Region | US (915 MHz) |
| Channel | Test |
| PSK | `Ml/5IOJQyplnvlzWmnvMrg==` |
| Role | CLIENT or CLIENT_MUTE |

## Daily Use

### Send Normal Message

1. Open Meshtastic app
2. Go to "Messages"
3. Write message
4. Send

### Send Query to Claude AI

To receive a response from the AI, include `@claude` in your message:

```
@claude When should I water my tomatoes?
```

### View Location

GPS location is automatically transmitted according to device configuration.

## LED Indicators

| LED Pattern | Meaning |
|-------------|---------|
| Solid green | Connected to mesh |
| Blinking green | Transmitting |
| Solid red | Error or low battery |
| Blinking red | Charging |
| Off | Device powered off |

## Device Roles

The T1000-E can be configured in different roles:

### CLIENT (Default)

- Sends and receives messages
- Participates in mesh routing
- Transmits GPS position

### CLIENT_MUTE

- Sends and receives messages
- Does NOT participate in routing
- Saves battery
- Ideal for end users

### ROUTER

- Prioritizes message routing
- Always active
- Higher battery consumption
- Ideal for fixed nodes with power

## Care and Maintenance

### Charging

- Use quality USB-C cable
- Don't leave connected indefinitely after full charge
- Charge when it reaches 20%

### Storage

- Store in dry place
- Room temperature (15-25°C)
- Charge to 50% if storing long-term

### Cleaning

- Clean with soft cloth
- Don't submerge in water (only splash resistant)
- Keep ports clean

## Troubleshooting

### Won't connect to mesh

1. Verify it's powered on (LED active)
2. Verify region configuration (US 915 MHz)
3. Verify channel and PSK
4. Restart the device

### No Claude responses

1. Verify message includes `@claude`
2. Verify connectivity with gateway
3. Wait up to 30 seconds for response

### Battery drains quickly

1. Change role to CLIENT_MUTE
2. Reduce GPS transmission frequency
3. Reduce screen brightness (if applicable)

### GPS not working

1. Go to open area (no roof)
2. Wait 2-3 minutes for initial fix
3. Verify GPS configuration in app

## Detailed Technical Specifications

| Specification | Value |
|---------------|-------|
| LoRa Frequency | 915 MHz (US) |
| TX Power | Up to 22 dBm |
| RX Sensitivity | -136 dBm |
| Range | 10+ km (line of sight) |
| GPS | u-blox |
| GPS Accuracy | ±2.5m |
| Battery | 700 mAh Li-Po |
| Battery Life | 3-7 days (depending on use) |
| Charging | USB-C 5V |
| Dimensions | 85 x 55 x 6.5 mm |
| Weight | 32g |
| Protection | IP65 |
| Temperature | -20°C to 60°C |
