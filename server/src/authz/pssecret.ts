import { passportJwtSecret } from 'jwks-rsa';
import axios from 'axios';

export const pssecret = passportJwtSecret({
  cache: true,
  rateLimit: true,
  handleSigningKeyError: (err) => {
    console.log(err);
  },
  fetcher(jwksUri: string): Promise<{ keys: any }> {
    return axios
      .get(jwksUri)
      .then((res) => {
        console.log('>> ', res.data);
        return res.data as { keys: any };
      })
      .catch((err) => {
        console.error(err);
        return {} as { keys: any };
      });
  },
  jwksRequestsPerMinute: 1,
  jwksUri: `https://learn-auth-today.eu.auth0.com/.well-known/jwks.json`,
});
