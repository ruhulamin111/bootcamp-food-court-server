const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('food court server')
})
app.listen(port, () => {
    console.log('food court server running');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zjrcntk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const appitizersCollection = client.db('foodcourt').collection('appitizers')
        const desartCollection = client.db('foodcourt').collection('desart')
        const mainCourseCollection = client.db('foodcourt').collection('maincourse')

        app.get('/appitizers', async (req, res) => {
            const result = await appitizersCollection.find({}).toArray();
            res.send(result)
        })







        console.log('connect');

    }
    catch (error) {
        console.log(error);
    }
    finally {

    }
}
run().catch(console.dir)
