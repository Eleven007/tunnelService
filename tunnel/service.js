/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2018/4/28
 * 历史修订：
 */
const utils = require('../utils');
const WebSocketServer = require('ws');
// 包类型枚举
const PACKET_TYPE_MESSAGE = 'message';
const PACKET_TYPE_PING = 'ping';
const PACKET_TYPE_PONG = 'pong';
const PACKET_TYPE_TIMEOUT = 'timeout';
const PACKET_TYPE_CLOSE = 'close';


//新建一个新的chat对象
let tunnel = {};
tunnel.ws = false;
tunnel.clients = [];
tunnel.initialize = function (server) {
    this.ws = new WebSocketServer.Server({server, path: '/ws'});
    this.wsListen();
};
let clientIndex = 1;
tunnel.wsListen = function () {
    let that = this;
    this.ws.on('connection', function (wsConnect) {
        let roomId = utils.getTunnelId();
        let nickname = "AnonymousUser" + clientIndex;
        clientIndex += 1;
        that.clients.push({"id": roomId, "ws": wsConnect, "nickname": nickname});
        wsConnect.on('message', function (message) {
            that.resolvePacket(wsConnect, message);
        });
        wsConnect.on('close', function (message) {
            that.closeSocket(roomId, message);
        });

    });
};
tunnel.handleMessagePacket = function (ws, packet) {
    console.log("执行消息事件,类型：",packet.content.type);
    let message=packet.content.content;
    let type=packet.content.type;
    for (let i = 0; i < this.clients.length; i++) {
        let clientSocket = this.clients[i].ws;
        if (clientSocket.readyState === WebSocketServer.OPEN) {
            clientSocket.send("message:" + JSON.stringify({
                    content: message,
                    type: type,
                }));
        }
    }
};
tunnel.handlePingPacket = function (ws, packet) {
    console.log("执行ping事件：");
    ws.send('pong');
};

tunnel.closeSocket = function (roomId, customMessage) {
    let that = this;
    for (let i = 0; i < that.clients.length; i++) {
        if (that.clients[i].id === roomId) {
            let disconnect_message;
            if (customMessage) {
                disconnect_message = customMessage;
            } else {
                disconnect_message = roomId + " has disconnected";
            }
            that.clients.splice(i, 1);
        }
    }
};
tunnel.resolvePacket = function (ws, raw) {
    let _this = this;
    let packetParts = raw.split(':');
    let packetType = packetParts.shift();
    let packetContent = packetParts.join(':') || null;
    let packet = {type: packetType};

    if (packetContent) {
        try {
            packet.content = JSON.parse(packetContent);
        } catch (e) {
        }
    }
    switch (packet.type) {
        case PACKET_TYPE_MESSAGE:
            _this.handleMessagePacket(ws, packet);
            break;
        case PACKET_TYPE_PING:
            _this.handlePingPacket(ws, packet);
            break;
        case PACKET_TYPE_TIMEOUT:
            // handleTimeoutPacket(packet);
            break;
        case PACKET_TYPE_CLOSE:
            // handleClosePacket(packet);
            break;
        default:
            // handleUnknownPacket(packet);
            break;
    }
};
module.exports = tunnel;