const express = require("express");
const cors = require("cors");
const { Pool } = require('pg');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "*/*" }));
app.use(express.json());
app.use(cors());
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


app.get("/login", (req, res) => {
  const getRegistro = async () => {
    try {
      await pool.connect();
      const reg = await pool.query('select * from registro');//(await) es para decir que es asincrona y que se ejecute mientras algo mas se ejecute
      //(query) es para traer o llamar las cosas de la base de datos
      res.send(reg.rows);
    } catch (e) {
      console.log(e);
    }
  };
  getRegistro();
});

app.post("/registro", (req, res) => {
  let datos = req.body;
  let nombre = "" + req.body.nombre;
  //
  console.log('me llego algoooo!!!');
  console.log(req.body);
  console.log(nombre);
  //
  const setRegistro = async () => {
    try {
      await pool.connect();
      const Registro_bd = 'insert into registro(nombre,apellido,correo,fecha,contraseña,formulario,formulario2) VALUES($1,$2,$3,$4,$5,$6,$7)';
      const balores = [req.body.nombre1, req.body.apellido1, req.body.gmail, req.body.fechanaci1, req.body.password1, 'a', 'c'];
      const reg = await pool.query(Registro_bd, balores);
      console.log('si inserto la tabla');
    } catch (e) {
      console.log('El correo ya existe');
    }
  };
  setRegistro();
});
/////////////////////////////////////////////////////////////////////////////
app.post("/update", (req, res) => {
  const setRegistro = async () => {
    try {
      await pool.connect();
      const Registro_bd = 'delete from registro where correo in (SELECT correo from registro where correo like $1)';
      const balores = [req.body.gmail];
      const reg = await pool.query(Registro_bd,balores);
      console.log('si inserto la tabla');
    } catch (e) {
      console.log('El correo ya existe');
    }
  };
  const setRegistro2 = async () => {
    try {
      await pool.connect();
      const Registro_bd = 'insert into registro(nombre,apellido,correo,fecha,contraseña,formulario,formulario2) VALUES($1,$2,$3,$4,$5,$6,$7)';
      const balores = [req.body.nombre1, req.body.apellido1, req.body.gmail, req.body.fechanaci1, req.body.password1, 'a', 'c'];
      const reg = await pool.query(Registro_bd, balores);
      console.log('si inserto la tabla');
    } catch (e) {
      console.log('El correo ya existe');
    }
  };
  setRegistro();
  setRegistro2();
});
