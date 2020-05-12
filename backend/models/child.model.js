const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const childSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String},
    id: {type: Number, required: true},
    
}, {timestamps: true,});

const Child = mongoose.model('Child', childSchema);

module.exports = Child;