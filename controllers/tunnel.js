const debug = require('debug')('koa-weapp-demo');
const config = require('../config');
const utils = require('../utils');
const tunnel=require('../tunnel/api');
const tunnelApi=new tunnel();
function getWebSocketUrl(ctx, next) {
    const {data, dataEncode, tcId, tcKey, signature} = ctx.request.body;
    const jsonData = JSON.parse(data);
    if (!checkSignature(signature, data, tcKey)) {
        return ctx.body = {
            code: 6,
            message: '你之前调用过get/wsurl吗?!'
        };
    }
    if (!dataEncode || dataEncode === 'json') {
        console.log('tckey:', tcKey);
        let receiveUrl = jsonData.receiveUrl;
        let protocolType = jsonData.protocolType;
        let host = config.tunnelHostLocation;
        let tunnelId = utils.getTunnelId();
        tunnelApi.addTunnelIds(tunnelId);
        tunnelApi.addBusinessServer(tcId,{receiveUrl:receiveUrl,tcKey:tcKey});
        let connectUrl = `${protocolType}://${host}/ws`;
        let data = JSON.stringify({
            connectUrl: connectUrl,
        });
        let signature = utils.sha1(data + tcKey);
        return ctx.body = {
            code: 0,
            data: data,
            signature: signature,
            message: 'ok'
        };
    }
    return ctx.body = {
        code: 2,
        message: '不支持的格式'
    };

}

function sendMessage(ctx) {
    console.log(ctx);
}

function checkSignature(signature, data, tcKey) {
    let temp = utils.sha1(data + tcKey);
    debug('sign:', temp);
    return temp !== null && temp === signature;
}



module.exports = {
    getWebSocketUrl, sendMessage
};


