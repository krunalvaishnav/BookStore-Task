const fs = require("fs").promises;

exports.getUsers = async () => {
  try {
    const users = await fs.readFile("./json/users.json", "utf8");
    return JSON.parse(users);
  } catch (error) {
    return [];
  }
};

exports.addUsers = async (user) => {
  try {
    await fs.writeFile("./json/users.json", JSON.stringify(user, null, 2));
  } catch (err) {
    console.error("Error adding book:", err);
  }
};
