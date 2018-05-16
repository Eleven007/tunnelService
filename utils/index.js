/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2018/4/28
 * 历史修订：
 */
const CRYPTO = require('crypto');
const UUID = require('node-uuid');
module.exports = {
    getTunnelId: () => {
        return UUID.v4().replace(/-/g, "");
    },
    sha1: (message) => {
        return CRYPTO.createHash('sha1').update(message, 'utf8').digest('hex')
    },
    md5: () => {
        return CRYPTO.createHash('md5').update(message, 'utf8').digest('hex');
    },
    ResponseObject(){

    }
};