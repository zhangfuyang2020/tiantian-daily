// vue.config.js
module.exports = {
    configureWebpack: {
        plugins: [
            new resolveWebpackConfig()
        ],
        devServer: {
            proxy: {
                // 获取最新新闻
                "/news": {
                    target: "https://news-at.zhihu.com/api",
                    changeOrigin: true,
                    pathRewrite: { "^/news": "" }
                },
                "/sac": {
                    target: "https://daily.zhihu.com/story",
                    changeOrigin: true,
                    pathRewrite: { "^/sac": "" }
                }
            }
        }
    }

}
