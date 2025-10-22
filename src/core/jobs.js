import schedule from 'node-schedule';
import { Explorateur } from '../models/explorateur.model.js';

const jobAddInox = schedule.scheduleJob('*/1 * * * *', async function(){
    //Ajouter 2 inox à tous les explorateurs chaque 5 minutes
    await Explorateur.updateMany({}, { $inc: { 'inventory.vault.inox': 2 } })
        console.log('2 inox added to all explorateurs');
});

export default jobAddInox;