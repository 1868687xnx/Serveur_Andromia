import schedule from 'node-schedule';
import { Explorateur } from '../models/explorateur.model.js';
import { TABLE_ELEMENT } from './constants.js';

const jobAddInox = schedule.scheduleJob('*/1 * * * *', async function(){
    //Ajouter 2 inox à tous les explorateurs chaque 5 minutes
    await Explorateur.updateMany({}, { $inc: { 'inventory.vault.inox': 2 } })
        console.log('2 inox added to all explorateurs');
});


// Ajout entre 1 et 3 de quantités de chaques éléments à chaque explorateurs toutes les heures
const jobAddElements = schedule.scheduleJob('0 */1 * * *', async function() {
    // Récupérer tous les explorateurs
    const explorateurs = await Explorateur.find({});
    
    // Pour chaque explorateur, incrémenter chaque élément d'une quantité aléatoire entre 1 et 3
    for (const explorateur of explorateurs) {
        const updateObj = {};
        TABLE_ELEMENT.forEach((element, index) => {
            const randomQuantity = Math.floor(Math.random() * 3) + 1;
            updateObj[`inventory.vault.elements.${index}.quantity`] = randomQuantity;
        });
        
        await Explorateur.updateOne(
            { _id: explorateur._id },
            { $inc: updateObj }
        );
    }
    
    console.log('Random elements added to all explorateurs');
});

export { jobAddInox, jobAddElements };

export default jobAddInox;