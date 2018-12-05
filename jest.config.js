const tsJestPresets = require('ts-jest/presets');

const preset = tsJestPresets.jsWithBabel;

module.exports = {
    globals: {
        'ts-jest': {
            babelConfig: true,
            useBabelrc: true,
            enableTsDiagnostics: true,
        }
    },

    moduleDirectories: [
        "./node_modules",
        "./src"
    ],

    moduleFileExtensions: [
        'js',
        'ts',
        'tsx',
    ],

    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf||svg|ttf|woff|woff2)$': '<rootDir>/src/fileMock.js',
        '\\.(css|less)$': 'identity-obj-proxy',
    },

    testRegex: '(test.tsx?)$',

    testPathIgnorePatterns: [
        '/node_modules/',
    ],

    verbose: true,
    testURL: "http://localhost/",

    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    }
};
