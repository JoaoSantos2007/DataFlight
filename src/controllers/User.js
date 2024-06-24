/* eslint-disable dot-notation */
import defineCookies from '../utils/defineCookies.js';
import Token from '../services/Token.js';
import Service from '../services/User.js';

class User {
  static async create(req, res, next) {
    try {
      const info = req.body;
      const user = await Service.register(info);

      return res.status(201).json({ success: true, user });
    } catch (err) {
      return next(err);
    }
  }

  static async read(req, res, next) {
    try {
      const id = req.params?.id;
      if (!id) return res.status(200).json({ success: true, user: req.user });
      const user = await Service.readById(id);

      return res.status(200).json({ success: true, user });
    } catch (err) {
      return next(err);
    }
  }

  static async readAll(req, res, next) {
    try {
      const users = await Service.readAll();

      return res.status(200).json({ success: true, users });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params?.id;
      const info = req.body;
      const { user } = req;

      const userUpdated = await Service.update(id || user['_id'], info);

      return res.status(200).json({ success: true, updated: true, user: userUpdated });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params?.id;
      const { user } = req;
      const { accessToken, refreshToken } = req.cookies;

      const userDeleted = await Service.delete(id || user['_id']);

      if (!id) {
        await Token.revokeUserTokens(accessToken, refreshToken);
        defineCookies(req, res);
      }

      return res.status(200).json({ success: true, user: userDeleted });
    } catch (err) {
      return next(err);
    }
  }
}

export default User;
