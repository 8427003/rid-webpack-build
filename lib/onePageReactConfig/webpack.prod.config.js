const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    output: {
        library: 'SSR',
        libraryTarget: 'commonjs2',
        globalObject: "(typeof window !== 'undefined' ? window : global)"
    },
    plugins:[
        new StatsPlugin('stats.json', {
            chunks: true,
            chunkOrigins: true,
            entrypoints: true,

            // 以下为false 为了是json最小
            modules: false,
            chunkGroups: false,
            chunkModules: false,
            source: false,
            chunkRelations: false,
            warnings: false,
            usedExports: false,
            timings: false,
            reasons: false,
            providedExports: false,
            performance: false,
            moduleTrace: false,
            children: false,
            loggingTrace: false,
            depth: false,
            assets: false,
            logging: false,
        })
    ]
}
