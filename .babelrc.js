
const targets = {
    "chrome": "79",
    "edge": "85",
    "firefox": "80"
};
const presets = (api) => {
    return [
        [
            "@babel/preset-env",
            {
                targets: api.caller(caller => caller && caller.target === "node") ? { node: "current", ...targets } : targets
            }
        ],
        "@babel/preset-react",
        [
            "@babel/preset-typescript",
            {
                onlyRemoveTypeImports: !api.caller(caller => caller && caller.target === "node"),
                isTSX: true,
                allExtensions: true,
                allowNamespaces: true
            }
        ]
    ];
};

const plugins = [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties",
    [
        "import",
        {
            'libraryName': '@material-ui/core',
            'libraryDirectory': 'esm',
            'camel2DashComponentName': false
        },
        'core'
    ],
    [
        "import",
        {
            'libraryName': '@material-ui/icons',
            'libraryDirectory': 'esm',
            'camel2DashComponentName': false
        },
        'icons'
    ],
    [
        "import",
        {
            "libraryName": "lodash",
            "libraryDirectory": "",
            "camel2DashComponentName": false,  // default: true
        }
    ],
    // [
    //     "@babel/plugin-transform-typescript",
    //     {
    //         "libraryName": "lodash",
    //         "libraryDirectory": "",
    //         "camel2DashComponentName": false,  // default: true
    //     }
    // ],
    // [
    //     'babel-plugin-transform-imports',
    //     {
    //         '@material-ui/core': {
    //             // Use "transform: '@material-ui/core/${member}'," if your bundler does not support ES modules
    //             'transform': '@material-ui/core/esm/${member}',
    //             'preventFullImport': true
    //         },
    //         '@material-ui/icons': {
    //             // Use "transform: '@material-ui/icons/${member}'," if your bundler does not support ES modules
    //             'transform': '@material-ui/icons/esm/${member}',
    //             'preventFullImport': true
    //         }
    //     }
    // ]
];

// module.exports = { plugins };
module.exports = api => {
    return {
        presets: presets(api),
        plugins
    };
};