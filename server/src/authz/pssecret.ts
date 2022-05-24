import { passportJwtSecret } from 'jwks-rsa';
import axios from 'axios';
import config from '../config';

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
        return res.data as { keys: any };
      })
      .catch((err) => {
        console.error(err);
        return {} as { keys: any };
      });
  },
  jwksRequestsPerMinute: 5,
  jwksUri: `${config.AUTH0_ISSUER_URL}.well-known/jwks.json`,
});
