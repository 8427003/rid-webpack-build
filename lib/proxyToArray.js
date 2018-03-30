module.exports = function filterConfigProxy(config, env) {
    if(!config || !env.p) {
        return
    }

    let proxys = get(config, 'devServer.proxy')
    let pValue = get(env, 'p');

    if (isPlainObject(proxys) && pValue) {

        const proxyArr = [];
        const pKeys = Object.keys(proxys);
        const target = pValue.split('@')[1];
        if (target) {
            pValue = pValue.split('@')[0];
        }

        let index = -1;
        if(-1 !== (index = pKeys.indexOf(pValue))) {
            let proxyObj = proxys[pKeys[index]];

            if (target) {
                if (/^https?:\/\//.test(target)) {
                    proxyObj.target = target;
                }
                else {
                    proxyObj.target = `http://${target}`;
                }
            }
            proxyArr.push(proxyObj);
        }

        config.devServer.proxy = proxyArr;
    }
}
