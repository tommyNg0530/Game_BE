const express = require('express');
const fs = require('fs');
const app = express();

var cors = require('cors');
app.use(cors());

//Middleware for parsing req.body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: [
      'http://localhost:3001',
    ],
};
const configuredCors = cors(corsOptions);
app.options('*', configuredCors);

app.get('/player_scores', (req, res) => {
    const data = fs.readFileSync('player_scores.json', 'utf8');
    res.json(JSON.parse(data));

});

app.post('/player_scores', configuredCors, (req, res) => {
    
    const existingData = JSON.parse(fs.readFileSync('player_scores.json', 'utf8'));
    existingData.push({
        name: req.body.name,
        score: req.body.score
    });
    fs.writeFileSync('player_scores.json', JSON.stringify(existingData));
    res.json({ message: JSON.stringify(req.body) }); //check if the data is pass correctly
});



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

