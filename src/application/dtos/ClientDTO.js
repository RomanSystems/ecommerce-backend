class ClientDTO {
  constructor(client) {
    // this.id = client.id;
    this.name = client.name;
    this.address = client.address;
    this.nitCi = client.nitCi
    this.email = client.email;
    this.phone = client.phone;
  }
}

module.exports = ClientDTO;