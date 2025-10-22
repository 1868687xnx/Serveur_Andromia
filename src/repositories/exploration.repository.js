import { Ally } from '../models/ally.model.js';



class ExplorationRepository {

    transform(expense) {
        expense.href = `${process.env.BASE_URL}/expenses/${expense.base64}`;

        expense.account = {
            href: `${process.env.BASE_URL}/accounts/${expense.account.base64}`
        };

        delete expense.base64;
        delete expense._id;
        delete expense.__v;

        return expense;
    }
}

export default new AllyRepository();
