const express = require("express");
const app = express();

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine
// Make everything inside of public/ available
app.use(express.static('public'));




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

//margarita page
app.get("/pizzas/margarita", (request, res, next) => {
    const dataMargarita = {
        title: 'Pizza Margarita',
        price: null,
        recommendedDrink: 'beer',
        imageFile: '/images/pizza-margarita.jpg',
        ingredients: [
            {
                ingredientName: "mozzarella",
                calories: 400
            },
            {
                ingredientName: "tomato sauce",
                calories: 200
            },
            {
                ingredientName: "basilicum",
                calories: 30
            },
        ],
    };
    res.render("product", dataMargarita);
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
        title: 'Seafood Pizza',
        price: 20,
        recommendedDrink: 'white wine',
        imageFile: '/images/pizza-seafood.jpg',
    };
    res.render("product", dataSeafood)
})


app.listen(3000, () => console.log('My first app listening on port 3000! '));