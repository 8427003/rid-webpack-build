const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    output: {
        library: 'SSR',
        libraryTarget: 'umd',
        globalObject: "(typeof window !== 'undefined' ? window : global)"
    },
    plugins:[
        new StatsPlugin('stats.json', {
            chunks: true,
            chunkOrigins: true,
            entrypoints: true,

            // 以下为false 为了是json最小
            modules: false,
            chunkGroups: true,
            chunkModules: true,
            source: false,
            chunkRelations: false,
            warnings: false,
            usedExports: false,
            timings: false,
            reasons: false,
            providedExports: false,
            performance: false,
            moduleTrace: true,
            children: false,
            loggingTrace: false,
            depth: false,
            assets: false,
            logging: false,
        })
    ]
}
