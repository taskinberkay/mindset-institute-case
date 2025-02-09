const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`[Gateway] Incoming Request: ${req.method} ${req.originalUrl}`);
    next();
});

// Logging function for proxy middleware
const logProxy = {
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[ProxyReq] Forwarding ${req.method} request to ${proxyReq.path}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log(`[ProxyRes] Response ${proxyRes.statusCode} received from ${req.originalUrl}`);
    },
};

// Proxy routes with logging
app.use("/users", createProxyMiddleware({ target: "http://user-management:3000", changeOrigin: true, ...logProxy }));
app.use("/customers", createProxyMiddleware({ target: "http://customer-management:3001", changeOrigin: true, ...logProxy }));
app.use("/sales", createProxyMiddleware({ target: "http://sales-tracking:3002", changeOrigin: true, ...logProxy }));

app.listen(8080, () => console.log("API Gateway running on port 8080"));