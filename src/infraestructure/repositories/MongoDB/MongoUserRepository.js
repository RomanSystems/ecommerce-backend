const UserModel = require('../../database/models/User');
const UserRepository = require('../../../domain/repositories/UserRepository');

class MongoUserRepository extends UserRepository {
  /**
   * Busca un usuario por su ID en MongoDB.
   * @param {string} id - ID del usuario a buscar
   * @returns {Promise<Object|null>} documento del usuario encontrado o null si no existe
   */
  async findById(id) {
    return UserModel.findById(id).lean().exec();
  }

  async findByEmail(email) {
    return UserModel.findOne({ email }).lean().exec();
  }

  async findByUsername(username) {
    return UserModel.findOne({ username }).lean().exec();
  }

   /**
   * Crea y guarda un nuevo usuario en Mongo.
   * @param {{ username: string, password: string, roles?: string[] }} userData
   * @returns {Promise<Object>} documento creado en la base de datos
   * @throws {Error} si ocurre un error al guardar el usuario
   */
  async create({ username, password, roles = ['user'] }) {
    const user = new UserModel({ username, password, roles });
    return user.save();
  }

}

module.exports = MongoUserRepository;