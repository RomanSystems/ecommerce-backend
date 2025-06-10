const ClientRepository = require('../../../domain/repositories/ClientRepository');
const ClientModel = require('../../database/models/ClientModel');
const Client = require('../../../domain/entities/Client');

class MongoClientRepository extends ClientRepository {
  async getAll() {
    const clients = await ClientModel.find();
    console.log('Clients retrieved from MongoDB:', clients);
    return clients.map(p => new Client(p.toObject()));
  }

  async create(client) {
    const newClient = await ClientModel.create(client);
    return new Client(newClient.toObject());
  }
}

module.exports = MongoClientRepository;