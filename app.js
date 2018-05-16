const Koa = require('koa')
const app=new Koa();
const http = require('http');
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('./middlewares/bodyparser')
const logger=require('koa-logger');
const config = require('./config');
const tunnelService=require('./tunnel/service');
// 使用响应处理中间件
app.use(response);
// 解析请求体
app.use(bodyParser());
// 引入路由分发
const router = require('./routes');
app.use(router.routes());
app.use(logger);
let server = http.createServer(app.callback());
tunnelService.initialize(server);
server.listen(config.port, function listening() {
  console.log('服务器启动成功！');
});

// app.listen(config.port, () => debug(`listening on port ${config.port}`));
