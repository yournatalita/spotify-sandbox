import proxy from 'http-proxy-middleware';

module.exports = (app: any) => {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:8888',
      changeOrigin: true
    })
  );
};
