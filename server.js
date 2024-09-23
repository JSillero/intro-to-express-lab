// Imports
const express = require('express')

// Create an Express app
const app = express();
/* Declare array with data */
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


/* app.use((req, res, next) => {
    res.append("<h1>Express intro lab</h1>") 
    next();
}) */

/* 1. Be Polite, Greet the User
Task: Create a route that responds to URLs like /greetings/<username-parameter>.

Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.

Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.” */
app.get("/greetings/:name", (req, res) => {

    res.send(`<h2>1. Be polite</h2><p>Hello there ${req.params.name}!</h2> `);
})


/* 2. Rolling the Dice
Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.

Examples: Matches routes like /roll/6 or /roll/20.

Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.

Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with “You rolled a 14.” */
app.get("/roll/:number", (req, res) => {

    res.send(`<h2>2.  Rolling the Dice</h2><p>You rolled a: ${Math.floor(Math.random() * (req.params.number)) + 1}!</p> `);
})

/* 3. I Want THAT One!
Task: Create a route for URLs like /collectibles/<index-parameter>.

Examples: Matches routes such as /collectibles/2 or /collectibles/0.

Data Array: */
app.get("/collectibles/:number", (req, res) => {
    const coll = collectibles[req.params.number];
    if (coll) {
        res.send(`<h2>3. I Want THAT One!</h2><p>So you want a ${coll.name}? For ${coll.price} it can be yours!</p> `);
    } else {
        res.send(`<h2>3. I Want THAT One!</h2><p>Not yet in stock. Come back soon!</p> `);
    }
})

/*4. Filter shoes 
Task: Create a route /shoes that filters the list of shoes based on query parameters.

Query Parameters:

min-price: Excludes shoes below this price.
max-price: Excludes shoes above this price.
type: Shows only shoes of the specified type.
No parameters: Responds with the full list of shoes. */
app.get("/shoes", (req, res) => {
    const min = req.query.min;
    const max = req.query.max;
    const shoetype = req.query.type;
    console.log(max);

    let initialArray = shoes.filter((shoe) => (shoe.price <= ((max) ? max : 999999) && shoe.price >= ((min) ? min : 0)));
    if (shoetype) {
        initialArray = initialArray.filter((shoe) => shoe.type == shoetype);
    }

    let htmlResponse = "";
    initialArray.forEach(shoe => {
        htmlResponse += `<p>Name: ${shoe.name} Type: ${shoe.type} Price: ${shoe.price} </p>`;
    });

    res.send("<h2>4 Filter shoes</h2>" + htmlResponse);
})


// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
})
