require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: `${process.env.API}`,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  })
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
