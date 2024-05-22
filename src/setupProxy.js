const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // You can change this to match the endpoint you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // This will remove `/api` from the path before forwarding the request
      },
      onProxyReq: (proxyReq, req, res) => {
        // Add CORS headers to the proxy request
        proxyReq.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        proxyReq.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      }
    })
  );
};
