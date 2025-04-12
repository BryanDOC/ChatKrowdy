const db = require("../../../db");
const bcrypt = require("bcrypt");

const registerUserResolvers = {
    
  Mutation: {
    registerUser: async (_, { username, email, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
          const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
          db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) return reject(err);
            resolve({
              id: result.insertId,
              username,
              email,
              });
          });
        });
      },
},
};

module.exports = registerUserResolvers;