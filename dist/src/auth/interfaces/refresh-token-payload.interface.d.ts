export interface RefreshTokenPayload {
    sub: string;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
}
