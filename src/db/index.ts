import knex from 'knex';
import 'dotenv/config';

const { PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWORD } = process.env;
const dbOptions = {
  host: PG_HOST,
  port: Number(PG_PORT),
  database: PG_DB,
  user: PG_USER,
  password: PG_PASSWORD,
};

export default knex({
  client: 'pg',
  connection: dbOptions,
});
