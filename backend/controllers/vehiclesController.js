const pool = require("../db");

const createVehicle = async (req, res) => {
    try {
      const query = `INSERT INTO vehicles(vehicle_type, base_distance, base_rate, 
        rate_per_KM) VALUES ($1,$2,$3,$4) RETURNING *`;
      const result = await pool.query(query, [
        req.body.vehicle_type,
        req.body.base_distance,
        req.body.base_rate,
        req.body.rate_per_KM
      ]);
      res.status(200).json({done: true, body:result.rows});
    } catch (err) {
      console.log(err);
      res.status(500).json({done: false, body:"Someing went worng"});
    }
  };

const getVehicles = async (req, res) => {
  try {
    const query = `SELECT * from vehicles;`;
    const result = await pool.query(query);
    const data = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    console.log(err)
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

const getOneVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM vehicles WHERE id = $1`;
    const result = await pool.query(query, [id]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    console.log(err)
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

const updateVehicles = async (req, res) => {
  try {
    const query = `UPDATE vehicles SET vehicle_type = $1, base_distance = $2, base_rate = $3, rate_per_km = $4, updated = now() WHERE id = $5 RETURNING *`;
    const result = await pool.query(query, [
      req.body.vehicle_type,
      req.body.base_distance,
      req.body.base_rate,
      req.body.rate_per_km,
      req.params.id,
    ]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    console.log(err)
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};

//Delete orders(Admin)
const deleteVehicles = async (req, res) => {
  try {
    const query = `DELETE FROM vehicles WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [req.params.id]);
    const [data] = result.rows;
    res.status(200).send({ done: true, body: data });
  } catch (err) {
    console.log(err)
    res.status(500).send({ done: false, message: "Something went wrong!" });
  }
};


  module.exports = {
    createVehicle,
    getVehicles,
    getOneVehicle,
    updateVehicles,
    deleteVehicles
  };