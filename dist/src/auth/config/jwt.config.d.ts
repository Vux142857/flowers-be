declare const _default: (() => {
    secret: string;
    audience: string;
    issuer: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
    googleClientId: string;
    googleClientSecret: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string;
    audience: string;
    issuer: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
    googleClientId: string;
    googleClientSecret: string;
}>;
export default _default;
