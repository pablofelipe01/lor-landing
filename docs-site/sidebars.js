/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Hardware',
      items: [
        'hardware/raspberry-pi',
        'hardware/recomputer-r1025',
        'hardware/trackers-t1000',
        'hardware/modulos-lora',
      ],
    },
    {
      type: 'category',
      label: 'Configuración de Red',
      items: [
        'configuracion/meshtastic',
        'configuracion/mqtt',
        'configuracion/red-interna',
      ],
    },
    {
      type: 'category',
      label: 'Integración Claude AI',
      items: [
        'claude/node-red',
        'claude/flujo-mensajes',
        'claude/api-config',
      ],
    },
    {
      type: 'category',
      label: 'Guías de Uso',
      items: [
        'guias/enviar-mensaje',
        'guias/agregar-tracker',
        'guias/monitoreo',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/problemas-comunes',
        'troubleshooting/diagnostico',
        'troubleshooting/errores-conocidos',
      ],
    },
    'credenciales',
    'arquitectura',
  ],
};

export default sidebars;
