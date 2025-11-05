import express from "express";
import HttpErrors from "http-errors";
import allyRepository from "../repositories/ally.repository.js";
import explorationRepository from "../repositories/exploration.repository.js";

import explorateurRepository from "../repositories/explorateur.repository.js";
import axios from "axios";
import { EXPLORATION_URL } from "../core/constants.js";
import { guardAuthorizationJWT } from "../middlewares/authorization.jwt.js";

const router = express.Router();

//router.post("/Ally", addAlly);
//router.get("/", retrieveAll);
router.post("/:uuid/explorations/:key", guardAuthorizationJWT, addExploration);

async function addAlly(req, res, next) {
  try {
    let explorateur = await explorateurRepository.retrieveByCredentials(
      req.auth.email
    );
    let newAlly = await explorateurRepository.addAlly(
      req.body,
      explorateur._id
    );

    if (req.query._body === "false") {
      return res.status(204).end();
    }

    newAlly = newAlly.toObject({ getters: false, virtuals: false });
    newAlly = allyRepository.transform(newAlly);
    res.status(201).json(newAlly);
  } catch (err) {
    return next(err);
  }
}
async function addExploration(req, res, next) {
  try {
    const explorateur = await explorateurRepository.retrieveByUUID(
      req.params.uuid
    );
    if (!explorateur) {
      return next(HttpErrors.NotFound());
    } else {
        console.log("ROUTE EXPLORATION :", EXPLORATION_URL + req.params.key);
      const newExploration = await axios.get(EXPLORATION_URL + req.params.key);

      await explorationRepository.addForOneUser(
        newExploration.data,
        explorateur._id
      );
      res.status(200).json(newExploration.data);
      if (req.query._body === "false") {
        return res.status(204).end();
      }
    }

  } catch (err) {
    return next(err);
  }
}

export default router;
