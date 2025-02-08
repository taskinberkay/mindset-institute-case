const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use("/users", createProxyMiddleware({ target: "http://user-management:3000", changeOrigin: true }));
app.use("/customers", createProxyMiddleware({ target: "http://customer-management:3001", changeOrigin: true }));
app.use("/sales", createProxyMiddleware({ target: "http://sales-tracking:3002", changeOrigin: true }));

app.listen(8080, () => console.log("API Gateway running on port 8080"));