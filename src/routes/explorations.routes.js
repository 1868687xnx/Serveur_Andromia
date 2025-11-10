import express from "express";
import HttpErrors from "http-errors";
import explorationRepository from "../repositories/exploration.repository.js";
import explorateurRepository from "../repositories/explorateur.repository.js";
import axios from "axios";
import { EXPLORATION_URL } from "../core/constants.js";
import { guardAuthorizationJWT } from "../middlewares/authorization.jwt.js";

const router = express.Router();

router.post("/:uuid/explorations/:key", addExploration);

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
