import mongoose from 'mongoose';

const ElementSchema = new mongoose.Schema({
    element: { type: String, default: '' },
    quantity: { type: Number, default: 0 }
}, { _id: false });

export { ElementSchema };
