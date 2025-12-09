# Red Mesh LoRa + Claude AI - Documentación

Documentación técnica del proyecto de conectividad rural basado en redes mesh LoRa integradas con Claude AI.

## Inicio Rápido

### Instalación

```bash
cd docs-site
npm install
```

### Desarrollo

```bash
npm start
```

Esto inicia un servidor de desarrollo local en `http://localhost:3000/docs/`.

### Build para Producción

```bash
npm run build
```

Los archivos estáticos se generarán en el directorio `build/`.

### Servir Build de Producción

```bash
npm run serve
```

## Estructura del Proyecto

```
docs-site/
├── docs/                    # Archivos de documentación Markdown
│   ├── intro.md            # Página de inicio
│   ├── arquitectura.md     # Arquitectura del sistema
│   ├── credenciales.md     # Credenciales y accesos
│   ├── hardware/           # Documentación de hardware
│   ├── configuracion/      # Guías de configuración
│   ├── claude/             # Integración con Claude AI
│   ├── guias/              # Guías de uso
│   └── troubleshooting/    # Solución de problemas
├── src/
│   └── css/
│       └── custom.css      # Estilos personalizados
├── static/
│   └── img/                # Imágenes estáticas
├── docusaurus.config.js    # Configuración de Docusaurus
├── sidebars.js             # Configuración del sidebar
└── package.json            # Dependencias
```

## Tecnologías

- [Docusaurus 3](https://docusaurus.io/) - Generador de documentación
- [React](https://reactjs.org/) - Framework de UI
- [MDX](https://mdxjs.com/) - Markdown con componentes

## Despliegue

### GitHub Pages

```bash
GIT_USER=<GITHUB_USERNAME> npm run deploy
```

### Netlify / Vercel

1. Conectar repositorio
2. Build command: `npm run build`
3. Publish directory: `build`

## Contribuir

1. Editar archivos en `docs/`
2. Previsualizar con `npm start`
3. Hacer commit de los cambios

## Licencia

Documentación propietaria del proyecto Conectividad Rural LATAM.
