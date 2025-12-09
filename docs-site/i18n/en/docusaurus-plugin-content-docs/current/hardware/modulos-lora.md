---
sidebar_position: 4
---

# LoRa Modules

Documentation of LoRa modules used and tested in the project.

## Available Modules

### Heltec ESP32 LoRa V3 SX1262

**Status**: ✅ Functional

| Feature | Value |
|---------|-------|
| LoRa Chip | SX1262 |
| MCU | ESP32-S3 |
| Frequency | 915 MHz |
| Display | OLED 0.96" |
| Connection | USB-C |

#### Features

- Integrated OLED display to view messages
- Built-in WiFi and Bluetooth
- Compatible with official Meshtastic firmware
- Included antenna
- Good price/performance ratio

#### Configuration

```bash
# Flash Meshtastic firmware
# Download from: https://flasher.meshtastic.org

# Select:
# - Device: Heltec V3
# - Firmware: Latest stable
```

---

### WIO-SX1262 (Seeed Studio)

**Status**: ⚠️ Defective (The specific tested module has issues)

| Feature | Value |
|---------|-------|
| LoRa Chip | SX1262 |
| Format | Compact module |
| Frequency | 915 MHz |

#### Notes

The tested WIO-SX1262 module presented communication problems. Possible causes:
- Factory defect
- Firmware incompatibility
- Soldering problem

**Recommendation**: Use Heltec ESP32 LoRa V3 as alternative.

---

## Module Comparison

| Feature | Heltec V3 | T1000-E | WIO-SX1262 |
|---------|-----------|---------|------------|
| Status | ✅ Functional | ✅ Functional | ⚠️ Problems |
| Display | Yes (OLED) | Yes | No |
| GPS | No | Yes | No |
| Battery | No (external) | Yes | No |
| Portability | Medium | High | High |
| Price | ~$20 | ~$40 | ~$15 |
| Recommended use | Gateway/Repeater | End user | Not recommended |

## Module Selection by Use Case

### For Main Gateway

**Recommended**: Heltec ESP32 LoRa V3 or equivalent

- Permanent USB connection
- Display for local monitoring
- No GPS needed
- Continuous power

### For Repeater/Router

**Recommended**: Heltec ESP32 LoRa V3 with solar panel

- Solar + battery power
- Elevated location
- No GPS needed
- Configure as ROUTER role

### For End User

**Recommended**: T1000-E Tracker

- Portable and compact
- Integrated GPS for location
- Long battery life
- Easy to use

## Antennas

### Included Antennas

Most modules include stock antenna:
- Type: Monopole or helical
- Gain: 2-3 dBi
- Adequate for testing

### Antenna Upgrade

For greater range, consider:

| Type | Gain | Use |
|------|------|-----|
| Dipole | 2 dBi | General |
| Yagi | 6-12 dBi | Point to point |
| Collinear | 5-8 dBi | Omnidirectional |
| Panel | 8-14 dBi | Directional |

### Common Connectors

- **SMA**: Standard on modules
- **U.FL/IPEX**: Small internal connector
- Use adapters as needed

## Common Configuration for All Modules

### LoRa Parameters

```
Region: US
Frequency: 915 MHz
Spreading Factor: 11 (default)
Bandwidth: 250 kHz
Coding Rate: 4/8
```

### Meshtastic Channel

```
Name: Test
PSK: Ml/5IOJQyplnvlzWmnvMrg==
```

### Flash Firmware

1. Go to https://flasher.meshtastic.org
2. Connect device via USB
3. Select correct model
4. Select firmware version
5. Click "Flash"

## Module Troubleshooting

### Module not detected by USB

1. Try another USB cable
2. Install CH340/CP210x drivers
3. Check in device manager

### Won't connect to mesh

1. Verify configured region
2. Verify channel and PSK
3. Verify antenna is connected
4. Try with another module

### Reduced range

1. Verify antenna properly connected
2. Elevate the antenna
3. Avoid metallic obstacles
4. Consider higher gain antenna

### Corrupted firmware

1. Completely erase flash
2. Re-flash from scratch
3. Configure from defaults
