module.exports = {
  title: 'eID Easy javascript SDK',
  description: 'eideasy-js-sdk provides you with a simple set of functions to get the user\'s identity.',
  head: [['link', { rel: 'icon', href: '/assets/img/eid-easy-icon.png' }]],
  themeConfig: {
    repo: 'eideasy/eideasy-js-sdk/',
    logo: '/assets/img/eid-easy-logo.png',
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
