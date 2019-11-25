module.exports = (isDev) => {
    return {
        // preserveWhitespace: true,
        // extractCss: !isDev,
        cssModules: {
            localIdentName: '[path][name]---[local]---[hash:base64:5]',
            camelCase: true
        }
    }
}