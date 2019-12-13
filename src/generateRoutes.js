const fs = require('fs')
const {generateRoutes} = require('vue-route-generator')

const code = generateRoutes({
    pages: 'src/views',
    importPrefix: '@/views/'
})

fs.writeFileSync('./src/routes.js', code)