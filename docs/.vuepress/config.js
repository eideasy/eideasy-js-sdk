const { path } = require('@vuepress/utils');
const { version, sri } = require('../../package');

module.exports = {
  title: 'eideasy-browser-client',
  description: 'eID Easy Browser Client allows consuming eID Easy API\'s in web browsers',
  head: [['link', { rel: 'icon', href: '/assets/img/eid-easy-icon.png' }]],
  themeConfig: {
    repo: 'eideasy/eideasy-browser-client',
    docsBranch: 'master',
    docsDir: 'docs',
    logo: '/assets/img/eid-easy-logo.png',
    version: version,
    sri: sri,
    navbar: [
      { text: 'Home', link: '/'},
      { text: 'Guide', link: '/guide/'},
      { text: 'Contributing', link: '/contributing/'},
    ],
    sidebar: 'auto',
  },
  plugins: [
    [
      '@vuepress/plugin-search',
    ],
  ],
}
