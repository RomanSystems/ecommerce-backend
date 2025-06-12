const CreateClient = require('../../application/useCases/CreateClient');
const GetAllClients = require('../../application/useCases/GetAllClients');
const ClientDTO = require('../../application/dtos/ClientDTO');

class ClientController {
  constructor(clientRepository) {
    this.createClient = new CreateClient(clientRepository);
    this.getAllClients = new GetAllClients(clientRepository);
  }

  async create(req, res) {
    try {
      console.log('>>> Request body:', req.body);
      const client = await this.createClient.execute(req.body);
      res.status(201).json(new ClientDTO(client));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const clients = await this.getAllClients.execute();
      res.status(200).json(clients);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving clients' });
    }
  }

}

module.exports = ClientController;