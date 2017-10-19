interface MysqlConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
}

export const config: MysqlConfig = {
    host: 'mysql',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'developers',
    synchronize: true
};
