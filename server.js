const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname)));

app.use('/feishu-api', createProxyMiddleware({
  target: 'https://open.feishu.cn',
  changeOrigin: true,
  pathRewrite: { '^/feishu-api': '' },
  on: {
    proxyReq: (proxyReq) => {
      proxyReq.setHeader('Origin', 'https://open.feishu.cn');
    }
  }
}));

app.listen(8080, () => {
  console.log('✅ 看板已启动：http://localhost:8080/kanban_feishu.html');
});
