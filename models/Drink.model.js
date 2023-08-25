//const { mongoose, Schema } = require("mongoose");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const drinkSchema = new Schema({
    title: {
        type: String,
        required: true},
    price: Number,
    containsAlcohol: {
        type:Boolean,
        default:false},
    category: {
        type: String,
        enum: ["long drink","beer", "cocktail","soft"]
    },
    imageFile: String,
    stock: Number,
    ingredients: [String]
});

//Crate model
const Drink = mongoose.model("Drink", drinkSchema)

module.exports = Drink; 