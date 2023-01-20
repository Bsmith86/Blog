const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
console.log(`${process.env.MONGOUSERNAME}`);

// string we get from MongoDB - we hide our username and password in our .env file
const connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongobdtest.vsef73t.mongodb.net/WebsiteContent?retryWrites=true&w=majority`

// by default mongoose 'strictQuery' is true (strict) meaning we cant ask for information not in our schema
// see more here: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);
// connect to our MongoDB database (our Models specify which collections)
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
// function will activate once to let us know we are connected
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

app.post('/create_article', (req,res) => {
    console.log(req.body);
    Article.create(req.body);
    res.send('Good request')
})


app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})