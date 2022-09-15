const express = require ('express'); 
const { fstat } = require('fs');
const path = require ('path');
const { allowedNodeEnvironmentFlags } = require('process');
const db = require('./db/db.json')
// const script = require("./public/assets/js/index");
const fs= require("fs");
const app = express();
const PORT = 3001; 

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static('public'));

app.get('/', (req, res) => 
    res.send(path.join(__dirname,"public/index.html"))
);


app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname,"public/notes.html"))
);


app.post('/notes', (req, res)=> {
    const { title, text } = req.body;

    if (title && text){
        const newNote = {
            title,
            text,
        }
        const stringnote = JSON.stringify(newNote);

        fs.writeFile('./db/db.json', stringnote, (err)=>
        err
            ? console.error(err)
            : console.log(
                'New note has been written'
            )
        )

        const response = {
            status: 'success',
            body: stringnote,
        };

        console.log(response)
        res.status(201).json(response)
    }
}
)




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

