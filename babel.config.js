module.exports = {
    'presets': [
        ['@babel/preset-env',
            {
                'useBuiltIns': 'usage' // 'entry', 'usage', 'false'
            }
        ]
    ],
    'plugins': [
        '@babel/plugin-proposal-class-properties'
    ]
};
