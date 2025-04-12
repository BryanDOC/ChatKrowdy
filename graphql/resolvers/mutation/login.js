const db = require("../../../db");
const bcrypt = require("bcrypt");

const loginResolvers = {
    
  Mutation: {
    login: async (_, { email, password }) => {
        return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM users WHERE email = ?";
          db.query(sql, [email], async (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return reject(new Error("Usuario no encontrado"));
  
            const user = results[0];
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return reject(new Error("Contraseña incorrecta"));
  
            resolve({
              id: user.id,
              username: user.username,
              email: user.email,
              });
          });
        });
      },
},
};

module.exports = loginResolvers;