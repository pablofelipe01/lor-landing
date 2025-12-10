// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'LoRa Mesh + Claude AI',
  tagline: 'Rural Connectivity with Artificial Intelligence',
  favicon: 'favicon.ico',

  url: 'https://www.inverseneurallab.com',
  baseUrl: '/docs/',

  organizationName: 'conectividad-rural-latam',
  projectName: 'lora-mesh-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.jpg',
      navbar: {
        title: 'LoRa Mesh + Claude AI',
        logo: {
          alt: 'Conectividad Rural LATAM',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://www.inverseneurallab.com',
            label: 'Main Site',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/',
              },
              {
                label: 'Hardware',
                to: '/hardware/raspberry-pi',
              },
              {
                label: 'Configuration',
                to: '/configuration/meshtastic',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord Meshtastic',
                href: 'https://discord.gg/meshtastic',
              },
              {
                label: 'Meshtastic Forum',
                href: 'https://meshtastic.discourse.group/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Main Site',
                href: 'https://www.inverseneurallab.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/conectividad-rural-latam',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} LoRa Mesh + Claude AI. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'python'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
