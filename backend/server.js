const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express()

app.use(cors());
app.use(express.json());
//app.use(bodyParser.json())
//app.use(cors({ origin: 'http://localhost:4200' }));

app.use("/users", require('./routes/usersRoute'))
app.use("/customers", require('./routes/customersRoute'))
app.use("/drivers", require('./routes/driversRoute'))
app.use("/orders", require('./routes/ordersRoute'))


app.listen(5000, () => {
    console.log("Severe has started on port 5000")
})
