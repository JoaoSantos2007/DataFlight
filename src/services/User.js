import NotFoundError from '../errors/notFoundError.js';
import Model from '../models/User.js';
import hashPassword from '../utils/hashPassword.js';

class User {
  static async register({ name, email, password }) {
    const user = new Model({
      name,
      email,
      password: hashPassword(password),
      admin: false,
    });

    await user.save();
    return user;
  }

  static async readById(id) {
    const user = await Model.findById(id);

    if (!user) throw new NotFoundError('User not found!');

    return user;
  }

  static async readAll() {
    const users = await Model.find();

    return users;
  }

  static async update(id, { name, email }) {
    const user = await User.readById(id);

    if (name) user.set('name', name);
    if (email) user.set('email', email);

    await user.save();
    return user;
  }

  static async delete(id) {
    const user = await User.readById(id);
    await user.deleteOne();

    return user;
  }
}

export default User;
