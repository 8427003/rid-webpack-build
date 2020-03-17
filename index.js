const DEFAULT_CONFIG = require('./lib/config.js');
const SUPPORT_LIST = ['SPAReact', 'electronReact', 'antAdmin']

function createWebpackConfig(config = {}, name = 'SPAReact') {
    Object.assign(DEFAULT_CONFIG, config);

    if(-1 === SUPPORT_LIST.indexOf(name)) {
        throw Error('name support list:', SUPPORT_LIST);
    }

    switch(name) {
        case 'SPAReat': return require('./lib/SPAReactConfig');
        case 'electronReact': return require('./lib/electronReactConfig');
        case 'antAdmin': return require('./lib/antAdminConfig');
    }
}

module.exports = {
    createWebpackConfig
}
