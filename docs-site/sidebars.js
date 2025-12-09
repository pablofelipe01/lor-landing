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
        'hardware/lora-modules',
      ],
    },
    {
      type: 'category',
      label: 'Network Configuration',
      items: [
        'configuration/meshtastic',
        'configuration/mqtt',
        'configuration/internal-network',
      ],
    },
    {
      type: 'category',
      label: 'Claude AI Integration',
      items: [
        'claude/node-red',
        'claude/message-flow',
        'claude/api-config',
      ],
    },
    {
      type: 'category',
      label: 'User Guides',
      items: [
        'guides/send-message',
        'guides/add-tracker',
        'guides/monitoring',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/common-problems',
        'troubleshooting/diagnostics',
        'troubleshooting/known-errors',
      ],
    },
    'credentials',
    'architecture',
  ],
};

export default sidebars;
