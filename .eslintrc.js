module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        // 優先度A～C
        'plugin:vue/recommended',
        // JavaScript Standard Styleの適用
        'standard'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        // dynamic importのeslintエラー回避
        parser: "babel-eslint"
    },
    plugins: [
        'vue'
    ],
    rules: {
        "no-plusplus":'off'
    }
}
