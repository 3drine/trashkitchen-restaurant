const express = require("express");
const hbs = require("hbs");
const app = express();
const bodyParser = require('body-parser');


app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials

// Make everything inside of public/ available
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

const { mongoose, Schema } = require("mongoose");


const Pizza = require("./models/Pizza.model");
const Drink = require("./models/Drink.model");

mongoose.connect("mongodb://127.0.0.1:27017/pizza-restaurant")
    .then((response) => {
        console.log(`connected! Database: ${response.connections[0].name}`)
    })




// app.get(path, code)

//homepage
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views/homepage.html');
})

//Contact page
app.get("/contact", (request, res, next) => {
    res.sendFile(__dirname + '/views/contact.html')
    console.log('hello!')
})

//product page
app.get("/pizzas/:type", (request, res, next) => {
    let type = request.params.type
    async function getPizza(type) {
        const pizzaData = await Pizza.findOne({ 'title': type });
        res.render("product", pizzaData);
    }
    getPizza(type);
})

//drinks page
app.get("/drinks/:type", (request, res, next) => {
    let type = request.params.type
    async function getDrink(type) {
        const drinkData = await Drink.findOne({ 'title': type });
        console.log(drinkData);
        res.render("product", drinkData);
    }
    getDrink(type);
})

//veggie page
app.get("/pizzas/veggie", (request, res, next) => {
    const dataVeggie = {
        title: 'Veggie Pizza',
        price: 15,
        recommendedDrink: 'power smoothie',
        imageFile: '/images/pizza-veggie.jpg',
        ingredients: [
            {
                ingredientName: "cherry tomatoes",
                calories: 400
            },
            {
                ingredientName: "basilicum",
                calories: 200
            },
            {
                ingredientName: "olives",
                calories: 30
            },
        ],
    };
    res.render("product", dataVeggie)
})

//seafood page
app.get("/pizzas/seafood", (request, res, next) => {
    const dataSeafood = {
        title: null,
        price: 20,
        recommendedDrink: 'white wine',
        imageFile: '/images/pizza-seafood.jpg',
    };
    res.render("product", dataSeafood)
})

//summary page
app.get("/pizzas", (req, res, next) => {
    console.log(req.query.maxPrice);
    let maxPrice = req.query.maxprice;
    maxPrice = Number(maxPrice);
    let filter = {}
    console.log(filter)
    if (maxPrice) {
        filter = { price: { $lte: maxPrice } }
    }

    async function getAllPizzas() {
        const allPizzas = { listOfPizzas: await Pizza.find(filter) };
        res.render("summary", allPizzas);
    }
    getAllPizzas();
})

//summary page
// app.get("/summary/:object", (request, res, next) => {
//     let object = request.params.object
//     console.log(object);
//     async function getAllItems() {
//         let allItems;
//         if(object === "drinks") {allItems = await Drink.find({})}
//         else {allItems = await Pizza.find({})};
//         res.render("summary",{main: object, data:allItems});
//         console.log(allItems)
//     }
//     getAllItems();
// })

app.post("/login", (req, res, next) => {
    console.log(req.body.pwd);
    if (req.body.pwd === "ilovepizza"){ res.send("welcome") }
    else { res.send("Sorry, not allowed")}
})

app.listen(3000, () => console.log('My first app listening on port 3000! '));