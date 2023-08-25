//const { mongoose, Schema } = require("mongoose");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const pizzaSchema = new Schema({
    title: {
        type: String,
        required: true},
    price: Number,
    isVeggie: {
        type:Boolean,
        default:false},
    dough: {
        type: String,
        enum: ["classic","extra thin", "with garlic","with cheese"]
    },
    imageFile: String,
    size: {
        type: String,
        enum: ["Small","Medium","Large"]
    },
    ingredients: [String]
});

//Crate model
const Pizza = mongoose.model("Pizza", pizzaSchema)

module.exports = Pizza; 