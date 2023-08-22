const express = require("express");
const app = express();

// Make everything inside of public/ available
app.use(express.static('public'));


// app.get(path, code)

//homepage
app.get('/', (req,res,next) => {
    res.sendFile(__dirname + '/views/homepage.html');
})

//Contact page
app.get("/contact", (request, res, next) => {
    res.sendFile(__dirname + '/views/contact.html')
    console.log('hello!')
})

app.listen(3000, () => console.log('My first app listening on port 3000! '));