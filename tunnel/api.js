/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2018/4/28
 * 历史修订：
 */

let webSocketHanlder = function () {
    this.tunnelList = [];
    this.sessionMap = [];
    this.businessServerMap = [];
};
webSocketHanlder.prototype.addTunnelIds = function (tunnelId) {
    this.tunnelList.push(tunnelId);
};
webSocketHanlder.prototype.addBusinessServer = function (key, value) {
    let obj = {};
    obj[key] = value;
    this.businessServerMap.push(obj);
};
module.exports=webSocketHanlder;
