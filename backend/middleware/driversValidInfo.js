module.exports = function (req, res, next) {
  const {
    full_name,
    email,
    phone_number,
    vehicle_type,
    vehicle_number,
    city,
    password,
  } = req.body;

  function validEmail(driverEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(driverEmail);
  }

  if (req.path === "/register") {
    console.log(!email.length);
    if (
      ![
        full_name,
        email,
        phone_number,
        vehicle_type,
        vehicle_number,
        city,
        password,
      ].every(Boolean)
    ) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  next();
};
