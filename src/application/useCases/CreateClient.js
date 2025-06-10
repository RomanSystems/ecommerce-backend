const Client = require('../../domain/entities/Client');

class CreateClient {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(clientData) {
    const client = new Client(clientData);
    return await this.clientRepository.create(client);
  }
}

module.exports = CreateClient;