require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_SSH_KEY, DEPLOY_REF, DEPLOY_REPO, DEPLOY_PATH,
} = process.env;

module.exports = {
  deploy: {
    production: {
      ssh_options: 'StrictHostKeyChecking=no',
      key: DEPLOY_SSH_KEY,
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'post-deploy': `cd ${DEPLOY_PATH}/frontend && . ~/.nvm/nvm.sh && export NODE_OPTIONS=--openssl-legacy-provider && npm i && npm run build`
    },
  },
};

