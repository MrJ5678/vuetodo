module.exports = (isDev) => {
    return {
        preserverWhitespace: true,
        extractCss: !isDev,
        cssModules: {}
    }
}