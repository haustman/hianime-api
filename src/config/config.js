const getEnv = (key, defaultValue = '') => {
  if (typeof globalThis.CLOUDFLARE_ENV !== 'undefined') {
    return globalThis.CLOUDFLARE_ENV[key] || defaultValue;
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  return defaultValue;
};

const REDIS_URL = getEnv('UPSTASH_REDIS_REST_URL', '');
const REDIS_TOKEN = getEnv('UPSTASH_REDIS_REST_TOKEN', '');

const config = {
  baseurl: getEnv('HIANIME_BASE_URL', 'https://hianime.vc'),
  baseurl_v2: getEnv('HIANIME_BASE_URL_V2', 'https://aniwatchtv.to'),
  baseUrl: getEnv('BASE_URL', 'https://api.animo.qzz.io'),
  origin: getEnv('ORIGIN', '*'),
  port: parseInt(getEnv('PORT', '5000')),

  apiVersion: 'v1',

  documentation: {
    githubUrl: 'https://github.com/haustman/hianime-api/blob/main/README.md',
  },

  // Redis is only enabled when BOTH env vars are explicitly set
  redis: {
    url: REDIS_URL,
    token: REDIS_TOKEN,
    enabled: REDIS_URL !== '' && REDIS_TOKEN !== '',
  },

  providers: {
    megacloud: getEnv('MEGACLOUD_URL', 'https://megacloud.blog'),
    megaplay: getEnv('MEGAPLAY_URL', 'https://megaplay.buzz'),
    vidwish: getEnv('VIDWISH_URL', 'https://vidwish.live'),
  },

  rateLimit: {
    windowMs: parseInt(getEnv('RATE_LIMIT_WINDOW_MS', '60000')),
    limit: parseInt(getEnv('RATE_LIMIT_LIMIT', '1000000000')),
    enabled: getEnv('RATE_LIMIT_ENABLED', 'true') !== 'false',
  },

  headers: {
    'User-Agent': getEnv(
      'USER_AGENT',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    ),
  },

  logLevel: getEnv('LOG_LEVEL', 'INFO').toUpperCase(),
  enableLogging: getEnv('ENABLE_LOGGING', 'false') === 'true',

  isProduction: getEnv('NODE_ENV', 'production') === 'production',
  isDevelopment: getEnv('NODE_ENV', '') === 'development',
  isCloudflare: true,
};

export default config;
