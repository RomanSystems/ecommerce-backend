const pool = require('../../database/mysqlConnection');

class MySQLCustomerRepository {

    //para crear un cliente
    async create(customerEntity) {
        // const id = customerEntity.id;
        const name = customerEntity.name;
        const address = customerEntity.address;
        const nitCi = customerEntity.nitCi;
        const email = customerEntity.email;
        const phone = customerEntity.phone;

        const sql = `INSERT INTO customer (name,address,nitCi,email,phone) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.execute(sql, [name,address,nitCi,email,phone,]);
        console.log('>>> MySQLCustomerRepository.create result:', result);
        // Devuelve el objeto “similar” a lo que haría Mongo: { id, ... }
        // MySQL llenará el campo, pero aquí podemos simularlo}
        return { id: result.insertId, name, address, nitCi, email, phone, createdAt: new Date(), updatedAt: new Date() };
    }

    // para obtener todos los clientes
    async getAll() {
        const [rows] = await pool.execute('SELECT * FROM customers');
        return rows;
    }
}

module.exports = MySQLCustomerRepository;