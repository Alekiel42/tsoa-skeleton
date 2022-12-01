//to study

import { Client, ClientConfig, QueryResult } from 'pg';
import { AbstractContext } from '../context/AbstractContext';

export class PostgresClient {
  private static instance: PostgresClient;

  private clientConfig: ClientConfig;

  constructor(private readonly context: AbstractContext) {
    this.clientConfig = this.init(context);
  }

  private init(context: AbstractContext) {
    const env = context.getEnv().toUpperCase();

    const portEnv = context.get(`DB_PORT_POSTGRES_${env}`);
    const host = context.get(`DB_HOST_POSTGRES_${env}`);
    const user = context.get(`DB_USER_POSTGRES_${env}`);
    const database = context.get(`DB_NAME_POSTGRES_${env}`);
    const password = context.get(`DB_PASSWORD_POSTGRES_${env}`);
    return {
      host,
      user,
      password,
      database,
      port: parseInt(portEnv)
    };
  }

  public static getInstance(context: AbstractContext): PostgresClient {
    if (!PostgresClient.instance) {
      PostgresClient.instance = new PostgresClient(context);
    }
    return PostgresClient.instance;
  }

  async query(text: string, values?: Array<any>): Promise<QueryResult<any>> {
    const client = new Client(this.clientConfig);
    try {
      await client.connect();
      return await client.query(text, values);
    } catch (err) {
      console.log(
        '[PostgresClient] query ' + JSON.stringify(err),
        this.context.correlationId
      );
      throw err;
    } finally {
      await client.end();
    }
  }
}
