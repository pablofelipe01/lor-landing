---
sidebar_position: 3
---

# Configuración API Claude

Guía para configurar y usar la API de Claude AI en el sistema.

## Información de la API

| Parámetro | Valor |
|-----------|-------|
| Endpoint | https://api.anthropic.com/v1/messages |
| Modelo | claude-sonnet-4-20250514 |
| Versión API | 2023-06-01 |

## Obtener API Key

1. Ir a [console.anthropic.com](https://console.anthropic.com)
2. Crear cuenta o iniciar sesión
3. Ir a "API Keys"
4. Crear nueva key
5. Copiar y guardar de forma segura

:::warning Seguridad
Nunca compartas tu API key. Nunca la incluyas en código público.
:::

## Configuración en Node-RED

### Headers Requeridos

```javascript
msg.headers = {
    "x-api-key": "sk-ant-api03-TU_API_KEY_AQUI",
    "anthropic-version": "2023-06-01",
    "content-type": "application/json"
};
```

### Body del Request

```javascript
msg.payload = {
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 300,
    "messages": [
        {
            "role": "user",
            "content": "Tu pregunta aquí"
        }
    ],
    "system": "Instrucciones del sistema"
};
```

## Parámetros del Request

### model

Modelo de Claude a usar:

| Modelo | Descripción | Uso |
|--------|-------------|-----|
| claude-sonnet-4-20250514 | Sonnet 4 | **Recomendado** |
| claude-3-haiku-20240307 | Haiku 3 | Más rápido, menor costo |
| claude-3-opus-20240229 | Opus 3 | Más capaz, mayor costo |

### max_tokens

Máximo de tokens en la respuesta:
- **Recomendado**: 300 (suficiente para respuestas cortas)
- **Mínimo**: 100
- **Máximo**: Depende del modelo

### system

Instrucciones del sistema que definen el comportamiento:

```javascript
"system": "Eres un asistente para comunidades rurales de Latinoamérica.
Responde de forma breve, práctica y en español.
Máximo 200 caracteres por limitaciones de la red LoRa.
Enfócate en agricultura, clima, salud básica y educación."
```

### messages

Array de mensajes de la conversación:

```javascript
"messages": [
    {
        "role": "user",
        "content": "¿Cuándo debo regar mis tomates?"
    }
]
```

## Ejemplo Completo de Request

```javascript
// En nodo Function de Node-RED

// Preparar el request
msg.payload = {
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 300,
    "messages": [
        {
            "role": "user",
            "content": msg.payload  // Pregunta del usuario
        }
    ],
    "system": "Eres un asistente para comunidades rurales. Responde brevemente en español. Máximo 200 caracteres."
};

// Headers
msg.headers = {
    "x-api-key": "sk-ant-api03-xxxxx",  // TU API KEY
    "anthropic-version": "2023-06-01",
    "content-type": "application/json"
};

return msg;
```

## Respuesta de la API

### Estructura de Respuesta Exitosa

```json
{
  "id": "msg_01234567890",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Riega tus tomates temprano en la mañana, 2-3 veces por semana. Evita mojar las hojas."
    }
  ],
  "model": "claude-sonnet-4-20250514",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 25,
    "output_tokens": 32
  }
}
```

### Extraer la Respuesta

```javascript
// En nodo Function después del HTTP Request

var response = msg.payload.content[0].text;
return msg;
```

## Manejo de Errores

### Errores Comunes

| Código | Causa | Solución |
|--------|-------|----------|
| 401 | API key inválida | Verificar key |
| 429 | Rate limit | Esperar y reintentar |
| 500 | Error del servidor | Reintentar |
| 529 | API sobrecargada | Esperar |

### Nodo de Manejo de Errores

```javascript
// Después del HTTP Request

if (msg.statusCode !== 200) {
    // Error en la API
    node.error("Error de API: " + msg.statusCode);
    msg.payload = {
        "text": "Error al consultar. Intenta de nuevo."
    };
    return msg;
}

// Procesar respuesta exitosa
var response = msg.payload.content[0].text;
msg.payload = { "text": response };
return msg;
```

## Optimización de Costos

### Reducir Tokens

1. **System prompt corto**: Menos tokens = menor costo
2. **Limitar max_tokens**: 300 es suficiente
3. **Modelo económico**: Usar Haiku para consultas simples

### Filtrar Mensajes

No enviar todo a Claude:
- Solo mensajes con `@claude`
- Ignorar duplicados
- Implementar cooldown entre consultas

```javascript
// Cooldown de 10 segundos entre consultas del mismo usuario
var lastQuery = flow.get("lastQuery_" + msg.sender) || 0;
var now = Date.now();

if (now - lastQuery < 10000) {
    return null; // Ignorar
}

flow.set("lastQuery_" + msg.sender, now);
return msg;
```

## Personalización del Asistente

### Para Agricultura

```javascript
"system": "Eres un agrónomo virtual para pequeños agricultores.
Conoces cultivos tropicales: maíz, frijol, café, plátano.
Responde en español simple, máximo 200 caracteres.
Da consejos prácticos sobre siembra, riego, plagas y cosecha."
```

### Para Educación

```javascript
"system": "Eres un tutor educativo para estudiantes rurales.
Explicas matemáticas, ciencias y español de forma simple.
Responde en español, máximo 200 caracteres.
Usa ejemplos cotidianos de la vida rural."
```

### Para Salud

```javascript
"system": "Eres un asistente de salud básica.
Das información general sobre primeros auxilios y prevención.
Siempre recomiendas consultar médico para casos serios.
Responde en español, máximo 200 caracteres."
```

## Monitoreo de Uso

### En Anthropic Console

1. Ir a console.anthropic.com
2. Ver "Usage" para estadísticas
3. Configurar alertas de gasto

### Logging en Node-RED

```javascript
// Agregar después de cada consulta exitosa
var usage = msg.payload.usage;
node.warn("Tokens usados - Input: " + usage.input_tokens +
          ", Output: " + usage.output_tokens);
```

## Seguridad de la API Key

### Almacenamiento Seguro

1. **No hardcodear** en el flujo visible
2. Usar **environment variables** de Node-RED
3. O usar **credentials** de Node-RED

### Usar Environment Variables

En Node-RED settings.js:
```javascript
process.env.CLAUDE_API_KEY = "sk-ant-api03-xxxxx";
```

En el flujo:
```javascript
var apiKey = env.get("CLAUDE_API_KEY");
msg.headers["x-api-key"] = apiKey;
```

### Rotación de Keys

1. Crear nueva key en console
2. Actualizar en Node-RED
3. Verificar funcionamiento
4. Eliminar key antigua
