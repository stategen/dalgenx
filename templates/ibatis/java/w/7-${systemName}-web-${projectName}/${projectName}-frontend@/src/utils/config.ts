// const APIV1 = '/api/v1'
// const APIV2 = '/api/v2'


const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

const config = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2018 zuiidea',
  logo: './static/public/logo.svg',
  iconFontCSS: './static/public/iconfont.css',
  iconFontJS: './static/public/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: `${'$'}{APIV1}/user/login`,
    users: `${'$'}{APIV1}/user/users`,
    user: `${'$'}{APIV1}/user/:userId`,

    posts: `${'$'}{APIV1}/posts`,
    dashboard: `${'$'}{APIV1}/dashboard`,
    menus: `${'$'}{APIV1}/menus`,
    weather: `${'$'}{APIV1}/weather`,
    v1test: `${'$'}{APIV1}/test`,
    v2test: `${'$'}{APIV2}/test`,
  },
}

export  default  config;
