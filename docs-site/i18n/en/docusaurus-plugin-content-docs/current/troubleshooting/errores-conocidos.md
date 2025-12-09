---
sidebar_position: 3
---

# Known Errors

List of known errors and their solutions.

## Hardware Errors

### Defective WIO-SX1262

**Description**: The tested WIO-SX1262 module from Seeed Studio has communication problems.

**Symptoms**:
- Not detected correctly
- Intermittent communication errors
- Firmware won't flash correctly

**Solution**:
- **Do not use this specific module**
- Use Heltec ESP32 LoRa V3 as alternative
- Or use T1000-E trackers which work correctly

**Status**: Defective hardware (not a software bug)

---

### T1000-E Permanent Red LED

**Description**: Some T1000-E show permanent red LED after firmware update.

**Symptoms**:
- Constant red LED
- Doesn't respond to commands
- App can't connect

**Solution**:
1. Connect to USB-C charger
2. Press and hold button for 15 seconds
3. Release and wait for restart
4. If persists, re-flash firmware

---

## Software Errors

### Meshtastic "No Devices Found"

**Description**: Error when trying to use meshtastic CLI commands.

**Symptoms**:
```
Error: No Meshtastic devices found
```

**Possible causes**:
1. USB module disconnected
2. Insufficient permissions
3. Driver not installed

**Solution**:
```bash
# Verify device connected
lsusb

# Verify permissions
sudo chmod 666 /dev/ttyUSB0

# Add user to dialout group
sudo usermod -a -G dialout $USER
# Log out and back in

# Specify port manually
meshtastic --port /dev/ttyUSB0 --info
```

---

### Node-RED "MQTT Connection Refused"

**Description**: Node-RED can't connect to MQTT broker.

**Symptoms**:
- MQTT node shows "disconnected"
- Error: "Connection refused"

**Causes**:
1. Mosquitto not running
2. Incorrect broker IP
3. Firewall blocking

**Solution**:
```bash
# Verify Mosquitto
sudo systemctl status mosquitto
sudo systemctl start mosquitto

# Verify port
netstat -tlnp | grep 1883

# Test connection
mosquitto_sub -h 192.168.68.127 -t "test"
```

---

### Claude API "401 Unauthorized"

**Description**: Authentication error with Claude API.

**Symptoms**:
```json
{"error": {"type": "authentication_error", "message": "invalid x-api-key"}}
```

**Causes**:
1. Invalid or expired API key
2. Incorrect header
3. Key with incorrect format

**Solution**:
1. Verify key at console.anthropic.com
2. Verify no extra spaces
3. Verify exact header:
   ```
   x-api-key: sk-ant-api03-xxxxx
   ```

---

### Claude API "429 Rate Limited"

**Description**: Too many requests to the API.

**Symptoms**:
```json
{"error": {"type": "rate_limit_error"}}
```

**Solution**:
1. Wait a few minutes
2. Implement rate limiting in Node-RED:
```javascript
var lastCall = flow.get("lastClaudeCall") || 0;
var now = Date.now();
if (now - lastCall < 5000) { // 5 seconds minimum between calls
    return null;
}
flow.set("lastClaudeCall", now);
return msg;
```

---

### WiFi AP "Failed to Initialize"

**Description**: hostapd can't start the access point.

**Symptoms**:
```
hostapd: Failed to initialize interface wlan0
```

**Causes**:
1. WiFi interface not available
2. Incompatible driver
3. Incorrect configuration

**Solution**:
```bash
# Verify interface exists
iw dev

# Disable WiFi client if active
sudo nmcli radio wifi off

# Verify configuration
sudo hostapd -dd /etc/hostapd/hostapd.conf
```

---

## Configuration Errors

### "Channel Mismatch"

**Description**: Devices don't communicate due to different channel configuration.

**Symptoms**:
- Tracker powered on but doesn't appear in mesh
- Messages don't arrive

**Solution**:
Verify on ALL devices:
```
Channel: Test
PSK: Ml/5IOJQyplnvlzWmnvMrg==
```

---

### "Region Mismatch"

**Description**: Devices in different regions don't communicate.

**Symptoms**:
- Similar to channel mismatch
- Incompatible frequencies

**Solution**:
Verify region on all devices:
```
Region: US (915 MHz)
```

---

### Incorrect MQTT Topic

**Description**: Node-RED doesn't receive messages due to misconfigured topic.

**Symptoms**:
- MQTT connected but no messages
- Empty debug

**Solution**:
Correct topic for gateway `!69d01ebc`:
```
meshtastic/2/json/LongFast/!69d01ebc
```

For debug, subscribe to everything:
```
meshtastic/#
```

---

## Known Limitations

### LoRa Message Length

**Limitation**: LoRa has a limit of ~230 bytes per message.

**Impact**: Claude responses are truncated.

**Mitigation**: System prompt instructs Claude to give short responses.

---

### No Delivery ACK

**Limitation**: Mesh network doesn't guarantee delivery confirmation.

**Impact**: No way to know if a message arrived.

**Mitigation**: Ask users to verbally confirm reception if critical.

---

### Variable Latency

**Limitation**: Latency depends on number of hops and network load.

**Impact**: Responses can take 5-30 seconds.

**Mitigation**: Inform users of expected times.

---

## Report New Errors

If you find an undocumented error:

1. **Document**:
   - What you were doing
   - What you expected to happen
   - What actually happened
   - Exact error messages

2. **Collect logs**:
   ```bash
   journalctl -u meshtastic -n 50 > meshtastic.log
   journalctl -u nodered -n 50 > nodered.log
   ```

3. **Contact** the system administrator with collected information.
