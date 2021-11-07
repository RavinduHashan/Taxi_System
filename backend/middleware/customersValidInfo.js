module.exports = function (req, res, next) {
  const { full_name, email, phone_number, city, password } = req.body;

  function validEmail(customerEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customerEmail);
  }

  if (req.path === "/register") {
    console.log(!email.length);
    if (![full_name, email, phone_number, city, password].every(Boolean)) {
      return res.status(200).json({done: false, message:"Missing Credentials"});
    } else if (!validEmail(email)) {
      return res.status(200).json({done: false, message:"Invalid Email"});
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(200).json({done: false, message:"Missing Credentials"});
    } else if (!validEmail(email)) {
      return res.status(200).json({done: false, message:"Invalid Email"});
    }
  }

  next();
};
