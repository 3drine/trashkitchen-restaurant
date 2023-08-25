const mongoose = require('mongoose');
const Drink = require("../models/Drink.model");

//data 
const newDrinksArr = [
    {
        title: "gin tonic",
        price: 8,
        containsAlcohol: true,
        category: "long drink",
        imageFile: 'gin-tonic.png',
        stock: 999
    },
    {
        title: "coca-cola",
        price: 3,
        containsAlcohol: false,
        category: "soft",
        imageFile: 'coca-cola.png',
        stock: 32
    },
    {
        title: "pina colada",
        price: 12,
        containsAlcohol: true,
        category: "cocktail",
        imageFile: 'pina-colada.png',
        stock: 55
    },
    {
        title: "corona",
        price: 5,
        containsAlcohol: true,
        category: "beer",
        imageFile: 'corona.png',
        stock: 36
    },
]

async function drinksSeed() {
    let result;
    try {
        result = await mongoose.connect('mongodb://127.0.0.1:27017/pizza-restaurant');
        console.log(`Connected! Database name: "${result.connections[0].name}"`)
        await Drink.deleteMany({});
        console.log("Drinks deleted")
        result = await Drink.insertMany(newDrinksArr);
        console.log(result.length + " Drinks inserted")
        await mongoose.connection.close();
        console.log("Connection Closed")
    }
    catch {
        console.error('Error... ', err)
    }
}

drinksSeed();