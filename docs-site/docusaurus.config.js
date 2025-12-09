// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Red Mesh LoRa + Claude AI',
  tagline: 'Conectividad Rural con Inteligencia Artificial',
  favicon: 'img/favicon.ico',

  url: 'https://docs.conectividadrurallatam.com',
  baseUrl: '/docs/',

  organizationName: 'conectividad-rural-latam',
  projectName: 'red-mesh-lora-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localeConfigs: {
      es: {
        label: 'Español',
        htmlLang: 'es',
      },
      en: {
        label: 'English',
        htmlLang: 'en',
      },
    },
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
        title: 'Red Mesh LoRa + Claude AI',
        logo: {
          alt: 'Conectividad Rural LATAM',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentación',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://conectividadrurallatam.com',
            label: 'Sitio Principal',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentación',
            items: [
              {
                label: 'Introducción',
                to: '/',
              },
              {
                label: 'Hardware',
                to: '/hardware/raspberry-pi',
              },
              {
                label: 'Configuración',
                to: '/configuracion/meshtastic',
              },
            ],
          },
          {
            title: 'Comunidad',
            items: [
              {
                label: 'Discord Meshtastic',
                href: 'https://discord.gg/meshtastic',
              },
              {
                label: 'Foro Meshtastic',
                href: 'https://meshtastic.discourse.group/',
              },
            ],
          },
          {
            title: 'Más',
            items: [
              {
                label: 'Sitio Principal',
                href: 'https://conectividadrurallatam.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/conectividad-rural-latam',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Red Mesh LoRa + Claude AI. Built with Docusaurus.`,
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
