// react-scripts 버전이 2 이상인 경우 proxy 설정
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/customers", { target: "http://localhost:5000" }));
};