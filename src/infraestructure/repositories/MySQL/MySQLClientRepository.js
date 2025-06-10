const pool = require('../database/mysqlConnection.js');

class MySQLClientRepository {

    //para crear un cliente
    async create(clientEntity) {
        // const id = clientEntity.id;
        const name = clientEntity.name;
        const address = clientEntity.address;
        const nitCi = clientEntity.nitCi;
        const email = clientEntity.email;
        const phone = clientEntity.phone;

        const sql = `INSERT INTO client (name,address,nitCi,email,phone) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.execute(sql, [name,address,nitCi,email,phone,]);
        console.log('>>> MySQLClientRepository.create result:', result);
        // Devuelve el objeto “similar” a lo que haría Mongo: { id, ... }
        // MySQL llenará el campo, pero aquí podemos simularlo}
        return { id: result.insertId, name, address, nitCi, email, phone, createdAt: new Date(), updatedAt: new Date() };
    }

    // para obtener todos los clientes
    async getAll() {
        const [rows] = await pool.execute('SELECT * FROM clients');
        return rows;
    }
}

module.exports = MySQLClientRepository;