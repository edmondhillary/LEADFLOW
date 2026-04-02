module.exports = {
  apps: [
    {
      name: 'leadflow-bot',
      script: 'npx',
      args: 'tsx src/bot/telegram-runner.ts',
      cwd: './',
      watch: false,
      autorestart: true,       // reinicia si el proceso muere
      max_restarts: 10,        // máximo 10 reinicios consecutivos
      restart_delay: 3000,     // espera 3s entre reinicios
      exp_backoff_restart_delay: 100, // backoff exponencial si falla seguido
      env: {
        NODE_ENV: 'production',
      },
      error_file: 'logs/bot-error.log',
      out_file: 'logs/bot-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
