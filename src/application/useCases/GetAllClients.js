class GetAllProduct {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute() {
    console.log('>>> Retrieving all clients from use case');
    const clients = await this.clientRepository.getAll();
    console.log('Clients retrieved from use case:', clients);
    return clients;
  }
}

module.exports = GetAllProduct;