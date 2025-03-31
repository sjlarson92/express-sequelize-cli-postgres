import {Dialect} from "sequelize";

/**
 * Config file to get environment variables
 * and will throw error if not present
 */
type EnvironmentEnv = 'LOCAL' | 'TEST'

type Config = {
    PORT: string;
    ENVIRONMENT: EnvironmentEnv
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DIALECT: Dialect;
}

const getEnvVar = (name: keyof Config): string => {
    const env = process.env[name]
    if (!env) {
        throw new Error(`Environment variable for ${name} is missing`)
    }
    return env
}

export const getEnvironmentVariables = (): Config => {
    return {
        PORT: getEnvVar('PORT'),
        ENVIRONMENT: getEnvVar('ENVIRONMENT') as EnvironmentEnv,

        DB_HOST: getEnvVar('DB_HOST'),
        DB_NAME: getEnvVar('DB_NAME'),
        DB_USER: getEnvVar('DB_USER'),
        DB_PASSWORD: getEnvVar('DB_PASSWORD'),
        DB_DIALECT: getEnvVar('DB_DIALECT') as Dialect
    }
}