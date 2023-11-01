import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class AppConfig extends ConfigService {
    /**
     *
     * @param env
     */
    constructor(private env: { [k: string]: string | undefined }) {
        super();
    }

    /**
     *
     * @param key
     * @param throwOnMissing
     */
    private getValue(key: string, throwOnMissing = true): any {
        const value = this.get(key);
        if (!value && throwOnMissing) {
            throw new InternalServerErrorException(
                `config error - missing env.${key}`,
            );
        }
        return value;
    }

    /**
     *
     * @param keys
     */
    public ensureValues(keys: string[]): AppConfig {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }

    /**
     *
     */
    public getTypeOrmConfig(): any {
        const config: any = {
            type: 'postgres',
            host: this.getValue('DB_HOST'),
            port: parseInt(this.getValue('DB_PORT')),
            username: this.getValue('DB_USERNAME'),
            password: this.getValue('DB_PASSWORD'),
            database: this.getValue('DB_NAME'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        };

        return config;
    }
}

const configService = new AppConfig(process.env).ensureValues([
    'DB_PORT',
    'DB_HOST',
    'DB_NAME',
    'DB_USERNAME',
    'DB_PASSWORD',
]);

export { configService };
