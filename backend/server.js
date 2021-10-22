const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admins", require("./routes/adminsRoute"));
app.use("/customers", require("./routes/customersRoute"));
app.use("/drivers", require("./routes/driversRoute"));
app.use("/orders", require("./routes/ordersRoute"));

app.listen(5000, () => {
  console.log("Severe has started on port 5000");
});
