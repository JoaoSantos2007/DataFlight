import UserModel from '../models/User.js';
import defineCookies from '../utils/defineCookies.js';
import hashPassword from '../utils/hashPassword.js';
import TokenService from '../services/Token.js';

class User {
  // create user
  static async create(req, res, next) {
    try {
      const {
        name, email, password,
      } = req.body;

      const user = new UserModel({
        name,
        email,
        password: hashPassword(password),
        admin: false,
      });

      await user.save();

      return res.status(201).json({ success: true, user });
    } catch (err) {
      return next(err);
    }
  }

  // read user
  static get(req, res) {
    return res.status(200).json({ success: true, user: req.user });
  }

  // updtate user
  static async update(req, res, next) {
    try {
      const { user } = req;
      const { name, img } = req.body;

      if (name) {
        user.set('name', name);
        user.set('img', img);
      }

      await user.validate();
      await user.save();

      return res.status(200).json({ success: true, user });
    } catch (err) {
      return next(err);
    }
  }

  // delete user
  static async delete(req, res, next) {
    try {
      const { user } = req;
      const { accessToken, refreshToken } = req.cookies;

      await user.deleteOne({ _id: user.id });
      await TokenService.revokeUserTokens(accessToken, refreshToken);
      defineCookies(req, res);

      return res.status(200).json({ success: true, user });
    } catch (err) {
      return next(err);
    }
  }
}

export default User;
