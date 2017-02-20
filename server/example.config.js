if (process.env.NODE_ENV !== 'production') {
  // i.e. you are working from localhost
  module.exports.keys = {
    gitHubClientId: 'Your Github Client ID',
    gitHubSecretKey: 'Your Github Secret Key',
    gitCallbackUrl: 'http://localhost:3000/callback'
  };
}
