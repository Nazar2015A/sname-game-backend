const { Pool } = require('pg');

const urlString = 'postgres://default:3zC7JNUcWyrX@ep-old-dust-89487568.eu-central-1.postgres.vercel-storage.com:5432/verceldb';
const myURL = new URL(urlString);

const auth = myURL.username + ':' + myURL.password;
const host = myURL.hostname;
const database = myURL.pathname.slice(1); 

const pool = new Pool({
  user: auth.split(':')[0],
  host: host,
  database: database,
  password: auth.split(':')[1],
  port: myURL.port,
  ssl: true 
});

module.exports = pool;