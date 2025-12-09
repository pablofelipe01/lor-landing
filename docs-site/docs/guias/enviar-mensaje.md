---
sidebar_position: 1
---

# Enviar Mensaje a Claude

Guía paso a paso para enviar mensajes y recibir respuestas de Claude AI.

## Requisitos Previos

- Tracker T1000-E configurado y encendido
- App Meshtastic instalada en tu móvil
- Conexión Bluetooth con el tracker
- Estar dentro del alcance de la red mesh

## Paso a Paso

### 1. Conectar App al Tracker

1. Abrir app Meshtastic
2. Activar Bluetooth si no está activo
3. Seleccionar tu tracker T1000-E de la lista
4. Esperar conexión (LED verde en tracker)

### 2. Ir a Mensajes

1. En la app, tocar pestaña "Messages"
2. Seleccionar canal "Test" o canal primario

### 3. Escribir Mensaje con @claude

Para que Claude responda, **debes incluir @claude** en tu mensaje:

```
@claude ¿Cuándo es mejor sembrar tomates?
```

:::tip Importante
El mensaje DEBE contener `@claude` para ser procesado por la IA.
:::

### 4. Enviar

1. Tocar botón de enviar
2. El mensaje aparecerá en el chat
3. Esperar respuesta (5-30 segundos)

### 5. Recibir Respuesta

La respuesta de Claude aparecerá en el chat:

```
Siembra tomates cuando no haya riesgo de heladas.
Temp ideal 20-25°C. En zona tropical: todo el año.
En zona templada: primavera.
```

## Ejemplos de Consultas

### Agricultura

```
@claude ¿Cada cuánto riego el maíz?
```

```
@claude ¿Cómo controlo las plagas en mi cafetal?
```

```
@claude ¿Qué abono natural puedo hacer?
```

### Clima y Siembra

```
@claude ¿Qué puedo sembrar en época seca?
```

```
@claude ¿Cómo protejo mis cultivos del exceso de lluvia?
```

### Educación

```
@claude Explica las fracciones de forma simple
```

```
@claude ¿Por qué el cielo es azul?
```

### Salud Básica

```
@claude ¿Qué hago para un dolor de estómago leve?
```

```
@claude ¿Cómo prevengo la deshidratación?
```

## Tips para Mejores Respuestas

### Sé Específico

❌ Malo:
```
@claude plantas
```

✅ Bueno:
```
@claude ¿Cómo cuido plantas de tomate en clima caliente?
```

### Haz Una Pregunta a la Vez

❌ Malo:
```
@claude ¿Cuándo siembro y cómo riego y qué abono uso?
```

✅ Bueno:
```
@claude ¿Cuándo es mejor sembrar frijol?
```

### Menciona el Contexto

```
@claude Tengo gallinas. ¿Qué les doy si no ponen huevos?
```

```
@claude Mi maíz tiene hojas amarillas. ¿Qué puede ser?
```

## Limitaciones

### Longitud de Respuesta

- Las respuestas se limitan a ~200 caracteres
- Por limitaciones de la red LoRa
- Si necesitas más detalle, haz preguntas de seguimiento

### Tiempo de Respuesta

- Típico: 5-25 segundos
- Depende de:
  - Distancia al gateway
  - Número de saltos en la mesh
  - Carga de la API de Claude

### Sin Internet = Sin Claude

- Claude requiere internet
- Si Starlink está offline, no habrá respuestas
- Los mensajes entre trackers seguirán funcionando

## Troubleshooting

### No Recibo Respuesta

1. **Verificar @claude**: ¿Incluiste `@claude` en el mensaje?
2. **Esperar más**: Puede tomar hasta 30 segundos
3. **Verificar conexión**: ¿Tu tracker está en la mesh?
4. **Reintentar**: Envía el mensaje de nuevo

### Respuesta Cortada

- Normal por límite de caracteres
- Haz una pregunta más específica
- O pide que continúe: `@claude continúa`

### Respuesta "Error" o Similar

- Puede haber problema con internet
- Reintentar en unos minutos
- Si persiste, el gateway puede estar offline

## Mensajes que NO Usan Claude

Puedes enviar mensajes normales sin `@claude`:

```
Hola familia, llegué bien
```

Estos mensajes:
- Se envían a todos en el canal
- No son procesados por Claude
- No requieren internet
- Funcionan aunque Starlink esté offline

## Práctica

Intenta estos mensajes de práctica:

1. Saludo normal (sin @claude):
   ```
   Hola, probando la red mesh
   ```

2. Consulta simple a Claude:
   ```
   @claude ¿Qué hora es buena para regar?
   ```

3. Pregunta educativa:
   ```
   @claude ¿Cuántos planetas hay en el sistema solar?
   ```
