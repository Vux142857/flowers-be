declare const _default: (() => {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    autoLoadEntities: boolean;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    autoLoadEntities: boolean;
}>;
export default _default;
