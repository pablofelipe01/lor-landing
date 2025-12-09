---
sidebar_position: 1
---

# Common Problems

Solutions to the most frequent problems in the mesh network.

## Connectivity Problems

### Tracker Won't Connect to Mesh

**Symptoms**:
- Doesn't appear in node list
- Can't send or receive messages

**Solutions**:

1. **Verify powered on**
   - LED should be active
   - Restart if necessary

2. **Verify region**
   ```
   Settings → Radio → Region = US
   ```

3. **Verify channel**
   ```
   Settings → Channels → Channel 0
   Name = Test
   PSK = Ml/5IOJQyplnvlzWmnvMrg==
   ```

4. **Restart tracker**
   - Power off completely
   - Wait 10 seconds
   - Power on

---

### Gateway Not Receiving Messages

**Symptoms**:
- Trackers send but gateway sees nothing
- No MQTT traffic

**Solutions**:

1. **Verify Meshtastic service**
   ```bash
   sudo systemctl status meshtastic
   ```

2. **Verify LoRa module**
   ```bash
   lsusb
   ls /dev/ttyUSB* /dev/ttyACM*
   ```

3. **Restart service**
   ```bash
   sudo systemctl restart meshtastic
   ```

4. **View logs**
   ```bash
   journalctl -u meshtastic -f
   ```

---

### No Response from Claude

**Symptoms**:
- Message sent with @claude
- No response after 30+ seconds

**Solutions**:

1. **Verify @claude in message**
   - Must include exactly `@claude`
   - Not `@Claude` or `@ claude`

2. **Verify internet connection**
   ```bash
   # On reComputer
   ping 8.8.8.8
   ping api.anthropic.com
   ```

3. **Verify Node-RED**
   - Open http://192.168.100.10:1880
   - Verify MQTT is "connected"

4. **View Node-RED logs**
   ```bash
   journalctl -u nodered -f
   ```

5. **Verify Claude API key**
   - May be expired or out of credits

---

## Network Problems

### No Internet (Starlink)

**Symptoms**:
- No responses from Claude
- Can't access internet

**Solutions**:

1. **Verify Starlink**
   - Check Starlink router
   - Verify cable not damaged
   - Check antenna position

2. **Verify route**
   ```bash
   ip route
   ping 192.168.68.1
   ```

3. **Restart network**
   ```bash
   sudo systemctl restart networking
   ```

:::note
Mesh messages continue working without internet.
Only Claude requires connection.
:::

---

### Internal WiFi Not Working

**Symptoms**:
- Network `MPR114993468244600004-2.4G` not appearing
- Can't connect

**Solutions**:

1. **Verify hostapd**
   ```bash
   sudo systemctl status hostapd
   ```

2. **Restart WiFi services**
   ```bash
   sudo systemctl restart hostapd dnsmasq
   ```

3. **View logs**
   ```bash
   journalctl -u hostapd -n 50
   ```

4. **Verify WiFi interface**
   ```bash
   iw dev wlan0 info
   ```

---

## MQTT Problems

### Node-RED Not Receiving Messages

**Symptoms**:
- Messages reach gateway
- Node-RED doesn't process them

**Solutions**:

1. **Verify MQTT connection**
   - In Node-RED, MQTT node should say "connected"

2. **Verify topic**
   - Correct topic: `meshtastic/2/json/LongFast/!69d01ebc`

3. **Test manually**
   ```bash
   mosquitto_sub -h 192.168.68.127 -t "meshtastic/#" -v
   ```

4. **Restart Node-RED**
   ```bash
   sudo systemctl restart nodered
   ```

---

## Hardware Problems

### Battery Draining Fast

**Symptoms**:
- Tracker lasts less than 1 day

**Solutions**:

1. **Change role to CLIENT_MUTE**
   - Significantly reduces consumption

2. **Reduce GPS**
   - Increase interval or disable

3. **Check battery**
   - May need replacement if old

---

### LoRa Module Not Detected

**Symptoms**:
- Gateway doesn't see USB module
- Error "no device found"

**Solutions**:

1. **Verify physical connection**
   - Reconnect USB cable
   - Try another USB port

2. **View USB devices**
   ```bash
   lsusb
   dmesg | tail -20
   ```

3. **Verify permissions**
   ```bash
   sudo chmod 666 /dev/ttyUSB0
   ```

4. **Restart**
   ```bash
   sudo reboot
   ```

---

## Configuration Problems

### PSK Doesn't Match

**Symptoms**:
- Tracker powered on but not in mesh
- Other nodes don't see it

**Solutions**:

The PSK must be **exactly**:
```
Ml/5IOJQyplnvlzWmnvMrg==
```

1. Verify no extra spaces
2. Verify uppercase/lowercase
3. Better: use QR code from already configured device

---

### Incorrect Region

**Symptoms**:
- Tracker doesn't communicate with others
- Frequencies don't match

**Solutions**:

All devices must be on:
```
Region: US (915 MHz)
```

If you changed region:
1. Device restarts
2. Wait for restart to complete
3. Verify it stayed on US
