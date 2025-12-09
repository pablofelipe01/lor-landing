---
sidebar_position: 3
---

# T1000-E Trackers

Portable devices for end users in the mesh network.

## Specifications

| Component | Details |
|-----------|---------|
| Model | Seeed Studio SenseCAP T1000-E |
| LoRa | SX1262 |
| GPS | Integrated |
| Battery | 700mAh rechargeable |
| Range | Up to 10km (line of sight) |

## Features

- Compact and portable design
- Long battery life (days with CLIENT_MUTE role)
- Integrated GPS for location tracking
- IP65 water resistant
- Single button operation

## Initial Setup

### 1. Charge the device
- Connect USB-C cable
- LED indicates charging status
- Full charge takes ~2 hours

### 2. Power on
- Press and hold button for 3 seconds
- LED will blink to indicate power on

### 3. Pair with Meshtastic app
- Open Meshtastic app on your phone
- Enable Bluetooth
- Tap "+" to add device
- Select the T1000-E from the list

## Configuration

### Region
```
Settings → Radio → Region = US (915 MHz)
```

### Channel
```
Settings → Channels → Channel 0
Name: Test
PSK: Ml/5IOJQyplnvlzWmnvMrg==
```

### Role
For battery savings:
```
Settings → Device → Role = CLIENT_MUTE
```

## LED Indicators

| LED State | Meaning |
|-----------|---------|
| Green blinking | Normal operation |
| Red solid | Low battery or error |
| Blue blinking | Bluetooth pairing mode |
| No LED | Powered off or deep sleep |

## Button Operations

| Action | Function |
|--------|----------|
| Short press | Wake from sleep / Send location |
| Long press (3s) | Power on/off |
| Double press | Enter pairing mode |
| Long press (15s) | Factory reset |

## Battery Management

### Extend battery life
1. Use CLIENT_MUTE role
2. Reduce GPS update frequency
3. Disable screen (if equipped)
4. Reduce LoRa transmit power if close to gateway

### Check battery status
- In Meshtastic app: Device → Battery
- Or via CLI: `meshtastic --info`

## Troubleshooting

### Won't power on
1. Connect to USB charger
2. Wait 10 minutes
3. Try long press again

### Not connecting to mesh
1. Verify region = US
2. Verify channel PSK matches
3. Move closer to gateway
4. Restart device

### Constant red LED
1. Low battery - charge device
2. If persists after charging, try factory reset
3. Re-flash firmware if needed
