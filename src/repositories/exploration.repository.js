import { all } from "axios";
import { Ally } from "../models/ally.model.js";
import { Explorateur } from "../models/explorateur.model.js";
import { Exploration } from "../models/exploration.model.js";
import allyRepository from "./ally.repository.js";
import { body } from "express-validator";

class ExplorationRepository {
  async addForOneUser(body, explorateur_id) {
    const explorateur = await Explorateur.findById(explorateur_id);
    if (!explorateur) {
      throw new Error("Explorateur not found");
    }
    body.explorateur = explorateur_id;
    console.log("BODY EXPLORATION REPO :", body);

    const ally = await this.createAlly(body.ally, explorateur_id);
    if (ally) {
      body.ally = ally._id;
    }
    const exploration = await Exploration.create(body);
    this.addToExplorateurInventory(explorateur, exploration.vault);
    await explorateur.save();
    this.transform(exploration);
    return exploration;
  }

  transform(exploration) {
    exploration.href = `${process.env.BASE_URL}/explorations/${exploration.uuid}`;
    return exploration;
  }

  addToExplorateurInventory(explorateur, vault) {
    try {
      explorateur.inventory.vault.inox += vault.inox;
      for (const element of vault.elements) {
        for (const ExpElement of explorateur.inventory.vault.elements) {
          if (ExpElement.symbol === element.symbol) {
            ExpElement.quantity += element.quantity;
          }
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async createAlly(ally, explorateur_id) {
    try {
      if (ally) {
        ally = allyRepository.transform(ally, explorateur_id);
        return Ally.create(ally);
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new ExplorationRepository();
