import {authorize, refresh} from 'react-native-app-auth';

class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      clientId: 'be02be8587024bd69760fc0ba970e30f',
      clientSecret: 'a9f71a2a154b40b8b6213997c3c3a122',
      redirectUrl: 'com.spotifytest://oauthredirect',
      scopes: [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
  }

  async onLogin() {
    try {
      const result = await authorize(this.spotifyAuthConfig);
      // console.log('SUCCESS');
      // console.log(result);
      return {code: result, status: true};
    } catch (error) {
      console.log('ERROR');
      console.log(JSON.stringify(error));
      return {code: error, status: false};
    }
  }

  async refreshLogin(refreshToken) {
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    return result;
  }
}

const authHandler = new AuthenticationHandler();

export default authHandler;
