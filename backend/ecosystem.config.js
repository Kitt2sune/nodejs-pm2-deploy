require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_SSH_KEY, DEPLOY_REF, DEPLOY_REPO, DEPLOY_PATH,
} = process.env;

module.exports = {
    apps: [{
    name: 'api-sevice',
    script: './dist/app.js',
  }],
  deploy: {
    production: {
      ssh_options: 'StrictHostKeyChecking=no',
      key: DEPLOY_SSH_KEY,
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp -i ${DEPLOY_SSH_KEY} .env .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/backend/`,
      'post-deploy': 'cd backend && . ~/.nvm/nvm.sh && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
    },
  },
};

