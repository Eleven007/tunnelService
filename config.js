const CONF = {
    port: '6666',
    rootPathname: '',

    // 微信小程序 App ID
    appId: '',

    // 微信小程序 App Secret
    appSecret: '',


    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: '',
        char: 'utf8mb4'
    },
    tunnelSignatureKey: '',
    tunnelHostLocation: '',
    tunnelUser : '',
};

module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;
