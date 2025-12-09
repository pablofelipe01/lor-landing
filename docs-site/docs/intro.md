---
sidebar_position: 1
slug: /
---

# Introduction

Welcome to the technical documentation for the **LoRa Mesh Network + Claude AI** for rural connectivity.

## What is this project?

This project implements a mesh communication network based on LoRa (Long Range) technology integrated with artificial intelligence (Claude AI) to provide connectivity in rural areas without traditional mobile coverage.

## General Architecture

The system consists of:

1. **Raspberry Pi 5 Gateway** - Central node that connects the mesh network to the internet
2. **reComputer R1025-10** - Access point and Node-RED server for Claude AI integration
3. **T1000-E Trackers** - Portable devices for end users
4. **LoRa Modules** - For long-range communication

## How does it work?

```
[User with T1000-E] → [LoRa Mesh] → [Gateway RPi5] → [MQTT] → [reComputer] → [Claude API]
                                                                    ↓
[User with T1000-E] ← [LoRa Mesh] ← [Gateway RPi5] ← [MQTT] ← [Response]
```

1. User sends message with `@claude` from their tracker
2. Message travels through mesh network to gateway
3. Gateway publishes to MQTT
4. Node-RED processes and sends to Claude API
5. Response returns through the same path

## Key Features

- **No cellular coverage required** - Works with LoRa radio
- **Mesh network** - Messages hop between nodes
- **AI Integration** - Claude answers questions
- **Range up to 10km** - Between nodes with line of sight

## Quick Start

1. [Configure your tracker](/guides/send-message)
2. [Send a message to Claude](/guides/send-message#send-to-claude)
3. [Monitor the network](/guides/monitoring)
