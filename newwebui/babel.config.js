module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            },
            '@babel/preset-typescript'
        ]
    ],
    plugins: [
        ['@babel/plugin-syntax-typescript', { isTSX: true }],
        ['@babel/plugin-syntax-dynamic-import'],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }]
    ]
};