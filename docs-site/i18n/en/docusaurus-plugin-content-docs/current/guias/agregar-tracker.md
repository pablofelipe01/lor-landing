---
sidebar_position: 2
---

# Add New Tracker

Guide to configure and add a new T1000-E tracker to the network.

## Required Materials

- New T1000-E tracker
- Smartphone with Meshtastic app
- USB-C cable for charging
- Access to network configuration

## Step 1: Prepare the Tracker

### Charge the Device

1. Connect USB-C cable
2. Charge until LED indicates full charge
3. Disconnect when ready

### Power On

1. Press and hold the main button
2. Wait 3 seconds
3. Release when LED blinks
4. The tracker will search for networks

## Step 2: Connect with App

### Bluetooth Pairing

1. Open Meshtastic app on phone
2. Ensure Bluetooth is enabled
3. In the app, tap "+" or "Add device"
4. Search for devices
5. Select the T1000-E (appears as "Meshtastic_xxxx")
6. Accept pairing

### Verify Connection

- App will show device information
- Tracker LED should show connection

## Step 3: Configure Region

:::warning Important
The region MUST be the same as the rest of the network.
:::

### In the App

1. Go to Settings → Radio Configuration
2. Select "Region"
3. Choose **US** (915 MHz)
4. Save changes

The device will restart.

## Step 4: Configure Channel

### Join "Test" Channel

1. Go to Settings → Channels
2. Edit Channel 0 (Primary)
3. Configure:
   - **Name**: `Test`
   - **PSK**: `Ml/5IOJQyplnvlzWmnvMrg==`
4. Save

### Verify PSK

The PSK must be **exactly the same** on all devices:
```
Ml/5IOJQyplnvlzWmnvMrg==
```

:::tip
You can scan a QR code from another configured device to copy the channel configuration.
:::

## Step 5: Configure Role

### For End User

1. Go to Settings → Device Configuration
2. Select "Role"
3. Choose **CLIENT_MUTE**
4. Save

This role:
- Allows sending and receiving messages
- Saves battery
- Does not participate in routing

### For Repeater/Router

If the tracker will be a fixed node:

1. Select **ROUTER**
2. Connect permanent power
3. Place in elevated location

## Step 6: Configure Name

### Identify the Device

1. Go to Settings → Device
2. In "Long Name": put descriptive name
   - Example: "Garcia Family"
   - Example: "North School"
3. In "Short Name": 4 characters
   - Example: "GARC"
   - Example: "NSCH"
4. Save

## Step 7: Verify Connectivity

### Test Reception

1. Go to Messages tab
2. Wait for network messages
3. Messages from other nodes should appear

### Test Sending

1. Write test message:
   ```
   Hello, testing new tracker
   ```
2. Send
3. Verify other nodes receive it

### Test Claude

1. Send:
   ```
   @claude hello
   ```
2. Wait for response (5-30 seconds)
3. If it responds, everything is configured correctly

## Step 8: GPS Configuration (Optional)

### For Location Tracking

1. Go to Settings → Position
2. Configure:
   - **GPS Enabled**: On
   - **Update Interval**: 300 (5 minutes)
   - **Broadcast Interval**: 900 (15 minutes)
3. Save

### To Save Battery

If you don't need GPS:
1. **GPS Enabled**: Off
2. This will significantly extend battery life

## Configuration Summary

| Parameter | Value |
|-----------|-------|
| Region | US |
| Channel | Test |
| PSK | Ml/5IOJQyplnvlzWmnvMrg== |
| Role | CLIENT_MUTE (users) |
| GPS | As needed |

## Checklist

- [ ] Tracker charged
- [ ] Bluetooth paired
- [ ] Region: US
- [ ] Channel: Test
- [ ] PSK configured
- [ ] Name assigned
- [ ] Tested send/receive
- [ ] Tested @claude

## Troubleshooting

### Not Appearing in Bluetooth

1. Restart the tracker
2. Restart phone Bluetooth
3. Bring devices closer
4. Try again

### Not Joining Network

1. Verify region = US
2. Verify channel = Test
3. Verify exact PSK
4. Restart tracker

### Not Receiving Claude Responses

1. Verify you include `@claude`
2. Verify gateway is working
3. Wait longer (up to 30 sec)
4. Contact administrator

### Constant Red LED

- Low battery: charge
- Error: restart
- If persists: contact support
