import express from "express";
import db from '../db/models'

const app = express();
let cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//Seed values for roles and Customers
const roles = [{ name: 'SUPERADMIN', description: 'User will have SUPERADMIN related permissions' },
{ name: 'ADMIN', description: 'User will have ADMIN related permissions' },
{ name: 'SUBSCRIBER', description: 'User will have SUBSCRIBER related permissions' }
]
const customers = [{ name: 'Customer A', website: 'www.a.com', address: 'Flat A, Building A, Chd' },
{ name: 'Customer B', website: 'www.b.com', address: 'Flat B, Building B, Chd' },
{ name: 'Customer C', website: 'www.c.com', address: 'Flat C, Building C, Chd' }]

//makes models/tables in db and inserting seed values
db.sequelize.sync({force:true}).then(() => {
    app.listen(3000, () => {
        console.log('The application is listening on port 3000!');
    })
    db.Role.bulkCreate(roles).catch((err: any) => console.log(err));
    db.Customer.bulkCreate(customers).catch((err: any) => console.log(err));
})

// define a route handler 
app.use('/api', require('./routes/api.js'));