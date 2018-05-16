const CONF = {
    port: '6666',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx84be17593fa77bef',

    // 微信小程序 App Secret
    appSecret: 'd0d9fffee19e3f2b5bc4d0a905086488',


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
        pass: 'gy110708',
        char: 'utf8mb4'
    },
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    tunnelHostLocation: 'tunnel.ytx.com',
    tunnelUser : 'gongyi:123456;u2:p2',
};

module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;
