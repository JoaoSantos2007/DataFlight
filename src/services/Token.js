import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Allowlist from '../models/Allowlist.js';
import Blocklist from '../models/Blocklist.js';
import User from '../models/User.js';
import { ACCESSTOKEN_LIFETIME, SECRET } from '../utils/env.js';
import UnathorizedError from '../errors/unathorizedError.js';
import NotFoundError from '../errors/notFoundError.js';
// eslint-disable-next-line import/no-cycle
import refresh from '../utils/refresh.js';
import defineCookies from '../utils/defineCookies.js';

class Token {
  static createAccessToken(email) {
    const accessToken = jwt.sign({
      email,
    }, SECRET, {
      expiresIn: `${ACCESSTOKEN_LIFETIME}m`,
    });

    return accessToken;
  }

  static async createRefreshToken(email) {
    try {
      const refreshToken = crypto.randomBytes(24).toString('hex');

      await Allowlist.create({
        key: refreshToken,
        value: email,
      });

      return refreshToken;
    } catch (err) {
      return err;
    }
  }

  static async verifyExpiredTokensAndRefresh(req, res) {
    const { accessToken, refreshToken } = req.cookies;

    try {
      if (jwt.decode(accessToken).exp <= Math.trunc(Date.now() / 1000)) {
        const { newAccessToken, newRefreshToken } = await refresh(refreshToken);
        defineCookies(req, res, newAccessToken, newRefreshToken);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
      }

      return { accessToken, refreshToken };
    } catch (err) {
      return err;
    }
  }

  static async verifyAccessToken(accessToken) {
    const accessTokenInBlockList = await Blocklist.findOne({ key: accessToken });
    if (accessTokenInBlockList) throw new UnathorizedError('Invalid access token!');

    return jwt.verify(accessToken, SECRET);
  }

  static async verifyRefreshToken(refreshToken) {
    if (!refreshToken) throw new UnathorizedError('Invalid refresh token!');

    const refreshTokenData = await Allowlist.findOneAndDelete({ key: refreshToken });
    if (!refreshTokenData) throw new UnathorizedError('Invalid refresh token!');

    const refreshTokenValue = refreshTokenData.value;

    const user = await User.findOne({ email: refreshTokenValue });
    if (user === null) throw new NotFoundError('User not found!');

    return refreshTokenValue;
  }

  static async revokeUserTokens(accessToken, refreshToken) {
    try {
      await Blocklist.create({
        key: accessToken,
      });

      await Allowlist.deleteOne({
        key: refreshToken,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default Token;
