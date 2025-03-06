const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');
// const bodyParser = require("body-parser");
require('dotenv').config()
const jwt = require('jsonwebtoken');
const cors = require('cors')
const app = express()
const cookieparser = require("cookie-parser")


const port = process.env.PORT || 4000
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(cors(
    // {
    //     //     for permission
    //         origin: [ 'http://localhost:4000' ],
    //         credentials: true
    //     }
))
// {
//     for permission
//     origin: [ 'http://localhost:4000' ],
//     credentials: true
// }
app.use(express.json())
app.use(cookieparser())


// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);


// coffestore
// 7tKS93sZkwZH5zMP


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6plf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        const jobCollection = client.db('jobprtal').collection('jobs')
        const jobCollectionApplication = client.db('jobprtal').collection('job_application')

        // console.log(jobCollection);





        // jwt auth related apis


        app.post('/jwt', async (req, res) => {
            const user = req.body
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.cookie('token', token, {
                httpOnly: true,
                secure: false        // http://localhost:5173/ this not secure
            })
                .send({ success: true })
        })

        app.post('/job', async (req, res) => {
            const newjob = req.body
            const result = await jobCollection.insertOne(newjob)
            res.send(result)
        })



        //   accept data from mongoDB side for read data
        app.get('/job', async (req, res) => {

            const email = req.body.email
            let query = {}
            if (email) {
                query = { hr_email: email }
            }
            const curser = await jobCollection.find(query).toArray()
            // console.log(curser);
            res.send(curser)
        })



        //   get data by id only

        app.get('/job/:id', async (req, res) => {
            const id = req.params.id
            const quarry = { _id: new ObjectId(id) }
            const result = await jobCollection.findOne(quarry)
            // console.log(result);
            res.send(result)
        })


        // 

        app.get('/job-application', async (req, res) => {
            const email = req.query.email
            // console.log(email);

            const query = { applicant_email: email }
            const result = await jobCollectionApplication.find(query).toArray()
            // console.log(result);

            for (const application of result) {
                const query1 = { _id: new ObjectId(application.job_id) }
                const job = await jobCollection.findOne(query1)
                if (job) {
                    application.title = job.title
                    application.location = job.location
                    application.company = job.company
                    application.company_logo = job.company_logo
                }
            }
            res.send(result)
        })

        // read data  

        app.get('/job-application/job_id/:id', async (req, res) => {
            const jobid = req.params.job_id
            const query = { job_id: jobid }
            // console.log(query);
            const result = await jobCollectionApplication.find(query).toArray()
            res.send(result)
        })

        // application data from apply form

        app.post('/job-application', async (req, res) => {
            const application = req.body
            const result = await jobCollectionApplication.insertOne(application)
            res.send(result)
        })


        // delete  my application data

        app.delete('/job/:id', async (req, res) => {
            const id = req.params.id
const query= {_id:new ObjectId(id)}
const result= await jobCollection.deleteOne(query)
            res.send(result)

        })

        app.delete('/job-application/:id', async (req, res) => {
            const id = req.params.id

            // console.log(id);

            const quarry = { _id: new ObjectId(id) }
            const result = await jobCollectionApplication.deleteOne(quarry)
            res.send(result)
        })


        // update
        // app.put('/coffee/:id',async(req,res)=>{
        //     const id = req.params.id
        //     const newCoffee = req.body
        //     const quarry = {_id: new ObjectId(id)}
        //     // const options = { ordered: true };
        //     const updateCoffe = {
        //         $set: {
        //             name:  newCoffee.name,
        //        supplier:  newCoffee.supplier,
        //        categoty:  newCoffee.categoty,
        //        chef:  newCoffee.chef,
        //        teste:  newCoffee.teste,
        //        photo:  newCoffee.photo,
        //        details:  newCoffee.details,
        //         },
        //       };
        //       const result = await  coffeeCollection.findOne(filter, updateCoffe,);
        //     res.send(result)
        // })




        // accept data from client side
        // app.post('/coffee',async ( req,res) => {
        // const newCoffee = req.body
        // console.log(newCoffee);
        // const result = await coffeeCollection.insertOne(newCoffee,);
        // res.send(result)

        // })



        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('  all job is here fot you ')
})

app.listen(port, () => {
    console.log(` all job for at prt${port}`)
})