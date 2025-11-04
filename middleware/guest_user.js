const set_guest_user = (req, res, next) => {
  if (!req.user) {
    req.user = {
      name: "Mingma Tenzing Sherpa",
      userId: "66f62943361e9f97964127e7",
    };
  }
  next();
};

module.exports = set_guest_user;
