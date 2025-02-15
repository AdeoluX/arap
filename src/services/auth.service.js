const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')
const serviceResponse = require("../helper/service.error.utils");
const { EntityModel, UserModel } = require("../models");
const agenda = require("../helper/queue.helper");
/**
 * Auth Service
 */
class AuthService {
  // TODO: add auth logic with passport

  async signup({name, password, confirmPassword, type, email}) {
    try{
      // todo
      let entity = await EntityModel.findOne({
        email
      });
      if(entity) return serviceResponse(false, 'Entity already exists', null);
      if(password !== confirmPassword) return serviceResponse(false, 'Passwords do not match', null);
      entity = await EntityModel.create({
        name, email, password: bcryptjs.hashSync(password, 10), type
      });
      // await agenda.start();
      await agenda.schedule('in 2 minutes', 'create-wallet', { userId: entity._id });
      return serviceResponse(true, 'Signup successfull', entity)
    }catch(e){
      return serviceResponse(false, e.message, {})
    }
  }

  async addUser({
    email, username, entity
  }) {
    try{
      let user = await UserModel.findOne({
        email
      });
      if(user) return serviceResponse(false, 'User with email already exists', null);
      user = await UserModel.create({
        username, email, entity, password: bcryptjs.hashSync('o', 10)
      })
      return serviceResponse(true, 'user added successfully', user)
    }catch(e){
      return serviceResponse(false, e.message, {})
    }
  }

  async signin({ email, password }) {
    try{
      let client = (await EntityModel.findOne({
        email
      })) ? {
        clientType: 'entity',
        doc: await EntityModel.findOne({
          email
        })
      } : {
        clientType: 'user',
        doc: await UserModel.findOne({
          email
        })
      }
      if(!client?.doc) return serviceResponse(false, 'Invalid credentials', {});
      const passwordCheck = bcryptjs.compare(password, client.doc.password);
      if(!passwordCheck) return serviceResponse(false, 'Invalid credentials', { });
      const token = jwt.sign({
        email: client.doc.email,
        id: client.doc._id,
        type: client.clientType
      }, process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      })
      return serviceResponse(true, 'Signed In successfully', {
        token,
        client: client?.doc
      })
    }catch(e){
      return serviceResponse(false, e.message, {})
    }
  }
}

module.exports = new AuthService() // export singleton instance
exports.AuthService = AuthService // export class for tests
