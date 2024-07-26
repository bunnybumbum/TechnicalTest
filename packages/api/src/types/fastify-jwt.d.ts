import { FastifyPluginCallback } from 'fastify';

interface FastifyJWTOptions {
  secret: string;
  sign?: SignOptions;
  verify?: VerifyOptions;
}

interface SignOptions {
  expiresIn?: string | number;
  notBefore?: string | number;
  audience?: string | string[];
  subject?: string;
  issuer?: string;
  jwtid?: string;
  mutatePayload?: boolean;
  noTimestamp?: boolean;
  header?: object;
  encoding?: string;
}

interface VerifyOptions {
  audience?: string | RegExp | (string | RegExp)[];
  issuer?: string | string[];
  subject?: string;
  jwtid?: string;
  clockTolerance?: number;
  maxAge?: string;
  clockTimestamp?: number;
  nonce?: string;
}

const fastifyJwt: FastifyPluginCallback<FastifyJWTOptions>;

export default fastifyJwt;

export interface FastifyJWT {
  payload: { id: number; role: string };
}

declare module 'fastify' {
  interface FastifyInstance {
    jwt: {
      sign(payload: object, options?: SignOptions): string;
      verify(token: string, options?: VerifyOptions): { [key: string]: any };
      decode(token: string): { [key: string]: any } | null;
    };
  }

  interface FastifyRequest {
    jwtVerify(): Promise<{ [key: string]: any }>;
    user: { id: number; role: string };  // Add this line
  }
}
