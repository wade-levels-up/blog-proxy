require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  `https://coblog.netlify.app/app`,
  `https://coblogauthor.netlify.app/app`,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(
  "/app",
  createProxyMiddleware({
    target: `${process.env.API}`,
    changeOrigin: true,
    pathRewrite: {
      "^/app": "",
    },
    onError: (err, req, res) => {
      console.error("Proxy error:", err);
      res.status(500).send("Proxy error occurred");
    },
  })
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
