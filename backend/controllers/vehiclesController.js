const pool = require("../db");

const createVehicle = async (req, res) => {
    try {
      const query = `INSERT INTO vehicles(vehicle_type, base_distance, base_rate, rate_per_KM) VALUES 
      ($1,$2,$3,$4) RETURNING *`;
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


  module.exports = {
    createVehicle
  };