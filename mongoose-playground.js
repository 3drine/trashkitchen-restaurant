const { mongoose, Schema } = require("mongoose");

const Pizza = require("./models/Pizza.model")

mongoose.connect("mongodb://127.0.0.1:27017/pizza-restaurant")
    .then((response) => {
        console.log(`connected! Database: ${response.connections[0].name}`);

        //create a new document (record)
        return Pizza.create({
            title: "margarita",
            price: 11,
        })
    })
    .then((something) => {
        console.log("pizza created" + something);
        return Pizza.insertMany([
            { title: "seafood", price: 15 },
            { title: "cheese", price: 10 }
        ])
    })
    .then((result) => {
        console.log(result.length + " pizzas created");
        return Pizza.find();
    })
    .then((pizzasFromDB) => {
        console.log('number of pizza in our database ' + pizzasFromDB.length);
        return Pizza.findOneAndUpdate({title:"margarita"}, {price:22})
    })
    .then(() => {
        console.log("you pizza was upadated");
    })


    .catch((err) => console.error('error:', err))
