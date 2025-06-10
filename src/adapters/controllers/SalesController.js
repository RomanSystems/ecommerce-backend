const CreateSale = require('../../application/useCases/CreateSale');
const SaleDTO = require('../../application/dtos/SaleDTO');

class SaleController {
  constructor(saleRepository) {
    this.createSale = new CreateSale(saleRepository);
  }

  async create(req, res) {
    try {
      console.log('>>> Request body:', req.body);
      const sale = await this.createSale.execute(req.body);
      res.status(201).json(new SaleDTO(sale));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async getAll(req, res) {
    try {
      const sales = await this.saleRepository.getAll();
      res.status(200).json(sales);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving sales' });
    }
  }
}
module.exports = SaleController;