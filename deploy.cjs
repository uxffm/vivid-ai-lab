const FtpDeploy = require('ftp-deploy');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT || 21,
  localRoot: path.join(__dirname, "dist"),
  remoteRoot: process.env.FTP_REMOTE_ROOT || "/",
  include: ["*", "**/*"],
  exclude: [
    ".DS_Store",
    "Thumbs.db",
    ".git/**",
    ".gitignore",
    "node_modules/**",
    "src/**",
    "*.log"
  ],
  deleteRemote: false,
  forcePasv: false
};

console.log("🚀 Starting deployment to Hostinger...");
console.log(`📁 Uploading from: ${config.localRoot}`);
console.log(`🌐 Uploading to: ${config.host}:${config.port}`);

ftpDeploy.deploy(config)
  .then(res => {
    console.log("✅ Deployment completed successfully!");
    console.log(`📊 Files uploaded: ${res.length}`);
  })
  .catch(err => {
    console.error("❌ Deployment failed:", err);
    process.exit(1);
  });
