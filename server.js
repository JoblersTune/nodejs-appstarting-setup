const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let userGoal = 'Learn Docker!';

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// CSS file loaded autmatically as node server redirects file requests to public folder which contains CSS - see href="styles.css"
app.use(express.static('public'));

// Handle incoming requests to two URLs - get requests and post requests
// if the get request comes in to our domain / nothing then this html code is returned
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <section>
          <h2>My Course Goal</h2>
          <h3>${userGoal}</h3>
        </section>
        <form action="/store-goal" method="POST">
          <div class="form-control">
            <label>Course Goal</label>
            <input type="text" name="goal">
          </div>
          <button>Set Course Goal</button>
        </form>
      </body>
    </html>
  `);
});

// post requests to store goal 
// Try to retreive a goal key to get a value from the incoming request body
// Log this goal to the console
// And set a userGoal variable equal to that extracted value
// Finally redirecting to / again and render html code which utalises the userGoal variable
app.post('/store-goal', (req, res) => {
  const enteredGoal = req.body.goal;
  console.log(enteredGoal);
  userGoal = enteredGoal;
  res.redirect('/');
});

// Strats a web server with Node.js listening on port 80
app.listen(80);
