type Environment = 'local';

const ENV = {
  local: {
    apiUrl: 'http://localhost:5093/api',
  },
};

const environment = (env: Environment = 'local') => ENV[env];

export default environment;
