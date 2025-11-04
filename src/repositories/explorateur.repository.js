import crypto from "crypto";
import jwt from "jsonwebtoken";
import HttpErrors from "http-errors";
import argon from "argon2";
import parseDuration from "parse-duration";

import { Explorateur } from "../models/explorateur.model.js";

class ExplorateurRepository {
  async login(credential, password) {
    const explorateur = await this.retrieveByCredentials(credential);
    console.log(explorateur);
    if (!explorateur) {
      throw HttpErrors.Unauthorized();
    }

    if (!(await this.validatePassword(password, explorateur))) {
      throw HttpErrors.Unauthorized();
    }

    return explorateur;
  }

  async validatePassword(password, explorateur) {
    return await argon.verify(explorateur.passwordHash, password);
  }

  async create(explorateur) {
    try {
      explorateur.passwordHash = await argon.hash(explorateur.password);
      delete explorateur.password;
      return Explorateur.create(explorateur);
    } catch (err) {
      throw err;
    }
  }

  retrieveByUUID(uuid) {
    const retrieveQuery = Explorateur.findOne({ uuid: uuid });
    return retrieveQuery;
  }

  retrieveById(idAccount) {
    return Explorateur.findById(idAccount);
  }

  retrieveByEmail(email) {
    return Explorateur.findOne({ email: email });
  }

  retrieveByCredentials(credential) {
    return Explorateur.findOne({
      $or: [{ email: credential }, { username: credential }],
    });
  }

  generateJWT(uuid) {
    const access = jwt.sign(
      {
        uuid: uuid,
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_TOKEN_LIFE,
        issuer: process.env.BASE_URL,
      }
    );
    const refresh = jwt.sign({ uuid }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_LIFE,
      issuer: process.env.BASE_URL,
    });
    const expiresIn = parseDuration(process.env.JWT_TOKEN_LIFE);

    return { access, refresh, expiresIn };
  }

  async validateRefreshToken(email, headerBase64) {
    //TODO:
  }

  transform(explorateur) {
    explorateur.href = `${process.env.BASE_URL}/explorers/${explorateur.uuid}`;

    delete explorateur._id;
    delete explorateur.__v;
    delete explorateur.password;
    delete explorateur.passwordHash;

    return explorateur;
  }
}

export default new ExplorateurRepository();
