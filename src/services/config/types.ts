export interface IDatabaseConfig {
  database: string;
  dialect: string;
  host: string;
  username: string;
  password: string;
  port: number;
}

export interface IMailConfig {
  mail: string;
  password: string;
}
