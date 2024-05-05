import { domain, clientId, userPoolId, userPoolWebClientId } from '../../auth_config.json';

export const environment = {
    production: false,
    auth: {
      domain,
      clientId,
      redirectUri: window.location.origin,
    },
    cognito: {
        userPoolId,
        userPoolWebClientId
    }
};