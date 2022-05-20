import {Injectable} from "@nestjs/common";
import {Strategy,ExtractJwt} from "passport-jwt"
import {PassportStrategy} from "@nestjs/passport";
import {passportJwtSecret} from "jwks-rsa";
import config from "../config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${config.AUTH0_ISSUER_URL}.well-known/jwks.json`,
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: config.AUTH0_AUDIENCE,
            issuer: `${config.AUTH0_ISSUER_URL}`,
            algorithms: ['RS256'],
        });
    }

    validate(payload: unknown): unknown {
        return payload;
    }
}
