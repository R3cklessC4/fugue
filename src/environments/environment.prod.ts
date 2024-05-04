import { domain, clientId } from '../../auth_config.json';

export const environment = {
    production: true,
    auth: {
      domain,
      clientId,
      redirectUri: window.location.origin,
    },
    cognito: {
        userPoolId: 'us-east-1_3iQeWKinA',
        userPoolWebClientId: '6j4d9ottq68or5pg04e5fntats'
    }
  };