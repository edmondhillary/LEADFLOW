const fs = require('fs');
const path = require('path');

// Cargar .env.local manualmente
const envLocal = {};
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  content.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const eq = line.indexOf('=');
    if (eq === -1) return;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    envLocal[key] = val;
  });
}

module.exports = {
  apps: [
    {
      name: 'leadflow-bot',
      script: 'npx',
      args: 'tsx src/bot/telegram-runner.ts',
      cwd: './',
      watch: false,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
      exp_backoff_restart_delay: 100,
      env: {
        NODE_ENV: 'production',
        AUTO_PIPELINE_ENABLED: '1',
        SCRAPE_ECO_MODE: '0',
        DAILY_LEAD_CAP: '500',
        DAILY_APIFY_BUDGET_USD: '2.00',
        AUTO_PIPELINE_TARGET_WEBS: '30',
        AUTO_PIPELINE_MAX_COMBOS: '3',
        ...envLocal,
      },
      error_file: 'logs/bot-error.log',
      out_file: 'logs/bot-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      name: 'leadflow-web',
      script: 'npx',
      args: 'next start -p 3000',
      cwd: './',
      watch: false,
      autorestart: true,
      max_restarts: 5,
      restart_delay: 5000,
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        ...envLocal,
      },
      error_file: 'logs/web-error.log',
      out_file: 'logs/web-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
