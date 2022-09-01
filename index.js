const express = require("express");
const { Pool } = require('pg');
const app = express();
const pool = new Pool({
  user: 'rscsichfurorjt',
  host: 'ec2-35-168-122-84.compute-1.amazonaws.com',
  database: 'ddc5nmjn0unhqo',
  password: 'baf5c85d46d5bbbbe602b7ce3438793bb1a59370ab10edc29a4bf9567a63c846',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  }
})
pool.connect();


app.get("/", function (req, res) {
  res.send("WORKING!!!");
});

app.listen(process.env.PORT || 5000);
