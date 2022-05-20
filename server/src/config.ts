import * as dotenv from "dotenv";

dotenv.config();

const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH0_ISSUER_URL: process.env.AUTH0_ISSUER_URL,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
}

export default config;
