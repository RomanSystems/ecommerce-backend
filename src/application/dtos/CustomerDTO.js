class CustomerDTO {
  constructor(customer) {
    // this.id = customer.id;
    this.name = customer.name;
    this.address = customer.address;
    this.nitCi = customer.nitCi
    this.email = customer.email;
    this.phone = customer.phone;
  }
}

module.exports = CustomerDTO;