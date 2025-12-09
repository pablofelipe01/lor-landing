---
sidebar_position: 2
---

# Agregar Nuevo Tracker

Guía para configurar y agregar un nuevo tracker T1000-E a la red.

## Materiales Necesarios

- Tracker T1000-E nuevo
- Smartphone con app Meshtastic
- Cable USB-C para cargar
- Acceso a la configuración de la red

## Paso 1: Preparar el Tracker

### Cargar el Dispositivo

1. Conectar cable USB-C
2. Cargar hasta que LED indique carga completa
3. Desconectar cuando esté listo

### Encender

1. Mantener presionado el botón principal
2. Esperar 3 segundos
3. Soltar cuando el LED parpadee
4. El tracker buscará redes

## Paso 2: Conectar con la App

### Emparejar por Bluetooth

1. Abrir app Meshtastic en el móvil
2. Asegurar Bluetooth activado
3. En la app, tocar "+"  o "Add device"
4. Buscar dispositivos
5. Seleccionar el T1000-E (aparece como "Meshtastic_xxxx")
6. Aceptar emparejamiento

### Verificar Conexión

- La app mostrará información del dispositivo
- LED del tracker debe mostrar conexión

## Paso 3: Configurar Región

:::warning Importante
La región DEBE ser la misma que el resto de la red.
:::

### En la App

1. Ir a Settings → Radio Configuration
2. Seleccionar "Region"
3. Elegir **US** (915 MHz)
4. Guardar cambios

El dispositivo se reiniciará.

## Paso 4: Configurar Canal

### Unirse al Canal "Test"

1. Ir a Settings → Channels
2. Editar Canal 0 (Primary)
3. Configurar:
   - **Name**: `Test`
   - **PSK**: `Ml/5IOJQyplnvlzWmnvMrg==`
4. Guardar

### Verificar PSK

El PSK debe ser **exactamente igual** en todos los dispositivos:
```
Ml/5IOJQyplnvlzWmnvMrg==
```

:::tip
Puedes escanear QR code de otro dispositivo configurado para copiar la configuración del canal.
:::

## Paso 5: Configurar Rol

### Para Usuario Final

1. Ir a Settings → Device Configuration
2. Seleccionar "Role"
3. Elegir **CLIENT_MUTE**
4. Guardar

Este rol:
- Permite enviar y recibir mensajes
- Ahorra batería
- No participa en routing

### Para Repetidor/Router

Si el tracker será un nodo fijo:

1. Seleccionar **ROUTER**
2. Conectar alimentación permanente
3. Ubicar en lugar elevado

## Paso 6: Configurar Nombre

### Identificar el Dispositivo

1. Ir a Settings → Device
2. En "Long Name": poner nombre descriptivo
   - Ejemplo: "Familia García"
   - Ejemplo: "Escuela Norte"
3. En "Short Name": 4 caracteres
   - Ejemplo: "GARC"
   - Ejemplo: "ESCN"
4. Guardar

## Paso 7: Verificar Conectividad

### Probar Recepción

1. Ir a pestaña Messages
2. Esperar mensajes de la red
3. Deberían aparecer mensajes de otros nodos

### Probar Envío

1. Escribir mensaje de prueba:
   ```
   Hola, probando nuevo tracker
   ```
2. Enviar
3. Verificar que otros nodos lo reciben

### Probar Claude

1. Enviar:
   ```
   @claude hola
   ```
2. Esperar respuesta (5-30 segundos)
3. Si responde, todo está configurado correctamente

## Paso 8: Configuración GPS (Opcional)

### Para Rastreo de Ubicación

1. Ir a Settings → Position
2. Configurar:
   - **GPS Enabled**: On
   - **Update Interval**: 300 (5 minutos)
   - **Broadcast Interval**: 900 (15 minutos)
3. Guardar

### Para Ahorrar Batería

Si no necesitas GPS:
1. **GPS Enabled**: Off
2. Esto extenderá significativamente la batería

## Resumen de Configuración

| Parámetro | Valor |
|-----------|-------|
| Región | US |
| Canal | Test |
| PSK | Ml/5IOJQyplnvlzWmnvMrg== |
| Rol | CLIENT_MUTE (usuarios) |
| GPS | Según necesidad |

## Lista de Verificación

- [ ] Tracker cargado
- [ ] Bluetooth emparejado
- [ ] Región: US
- [ ] Canal: Test
- [ ] PSK configurado
- [ ] Nombre asignado
- [ ] Probado envío/recepción
- [ ] Probado @claude

## Troubleshooting

### No Aparece en Bluetooth

1. Reiniciar el tracker
2. Reiniciar Bluetooth del móvil
3. Acercar dispositivos
4. Intentar de nuevo

### No Se Une a la Red

1. Verificar región = US
2. Verificar canal = Test
3. Verificar PSK exacto
4. Reiniciar tracker

### No Recibe Mensajes de Claude

1. Verificar que incluyes `@claude`
2. Verificar que el gateway está funcionando
3. Esperar más tiempo (hasta 30 seg)
4. Contactar administrador

### LED Rojo Constante

- Batería baja: cargar
- Error: reiniciar
- Si persiste: contactar soporte
