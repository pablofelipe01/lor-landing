---
sidebar_position: 4
---

# LoRa Modules

Radio modules used in the mesh network.

## Heltec ESP32 LoRa V3

Main module connected to the Raspberry Pi gateway.

### Specifications

| Component | Details |
|-----------|---------|
| MCU | ESP32-S3 |
| LoRa | SX1262 |
| Frequency | 915 MHz (US) |
| Interface | USB-C |
| Antenna | External SMA |

### Connection to RPi5

```
Heltec ESP32 LoRa V3 ←→ USB-C ←→ Raspberry Pi 5
```

The module appears as `/dev/ttyUSB0` or `/dev/ttyACM0`.

### Verify connection

```bash
# List USB devices
lsusb

# Check serial ports
ls -la /dev/ttyUSB* /dev/ttyACM*

# Get Meshtastic info
meshtastic --info
```

### Firmware

Pre-flashed with Meshtastic firmware. To update:

```bash
# Download latest firmware from meshtastic.org
# Use esptool or web flasher
```

## SX1262 Module

The SX1262 is the LoRa transceiver chip used in both:
- Heltec ESP32 LoRa V3
- T1000-E Trackers

### Specifications

| Parameter | Value |
|-----------|-------|
| Frequency | 150-960 MHz |
| Modulation | LoRa / FSK |
| Max power | +22 dBm |
| Sensitivity | -148 dBm |
| Range | Up to 15km (line of sight) |

## Antenna Considerations

### Gateway antenna
- Use external antenna for best range
- Mount as high as possible
- Avoid obstructions

### Tracker antennas
- Internal antenna (built-in)
- Orientation affects performance
- Keep away from body when transmitting

## Known Issues

### WIO-SX1262 Module (Defective)

:::warning
The tested WIO-SX1262 module from Seeed Studio has communication problems and should NOT be used.
:::

**Symptoms**:
- Not detected correctly
- Intermittent communication errors
- Firmware won't flash

**Solution**: Use Heltec ESP32 LoRa V3 instead.

## Frequency Planning

### US Region (915 MHz)

| Channel | Frequency |
|---------|-----------|
| 0 | 902.0 MHz |
| 1 | 906.0 MHz |
| ... | ... |
| Default | 906.875 MHz |

All devices must use the same region setting.
