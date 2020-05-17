const Users = require("./users.model");

async function getAllUsers(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const projection = {
    kids: 0,
    maritalStatus: 0,
    age: 0,
  };

  try {
    const users = await Users.find(null, projection)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Users.countDocuments();
    res.status(200).json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
}

async function getUserDetails(req, res) {
  const { id } = req.query;
  if (!id) {
    res.status(400).json("Missing id");
    return;
  }

  try {
    const user = await Users.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

async function addUser(req, res) {
  const user = req.body;

  if (!user) {
    res.status(400).json("Missing user data");
    return;
  }

  try {
    const newUser = new Users(user);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

async function updateUser(req, res) {
  const user = req.body;

  if (!user || !user._id) {
    res.status(400).json("Missing user data");
    return;
  }

  try {
    await Users.findByIdAndUpdate(user._id, user);
    res.status(200).end();
  } catch (err) {
    res.status(500).json(err.message);
  }
}

module.exports = {
  getAllUsers,
  getUserDetails,
  addUser,
  updateUser,
};
