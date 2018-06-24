const path = require('path');
const CONFIG = require('../config.js');

module.exports = {
    resolve: {
        //  可以利用别名来指向min.js，防止require三方依赖时，解析三方内部依赖！
        alias: {
            react$: path.resolve(CONFIG.PROJECT_ROOT, 'node_modules/react/cjs/react.development.js'),
            "react-dom$": path.resolve(CONFIG.PROJECT_ROOT, 'node_modules/react-dom/cjs/react-dom.development.js'),
        },
    },
}
