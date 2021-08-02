"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("../db/models"));
const app = express_1.default();
let cors = require('cors');
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//Seed values for roles and Customers
const roles = [{ name: 'SUPERADMIN', description: 'User will have SUPERADMIN related permissions' },
    { name: 'ADMIN', description: 'User will have ADMIN related permissions' },
    { name: 'SUBSCRIBER', description: 'User will have SUBSCRIBER related permissions' }
];
const customers = [{ name: 'Customer A', website: 'www.a.com', address: 'Flat A, Building A, Chd' },
    { name: 'Customer B', website: 'www.b.com', address: 'Flat B, Building B, Chd' },
    { name: 'Customer C', website: 'www.c.com', address: 'Flat C, Building C, Chd' }];
//makes models/tables in db and inserting seed values
models_1.default.sequelize.sync({ force: true }).then(() => {
    app.listen(3000, () => {
        console.log('The application is listening on port 3000!');
    });
    models_1.default.Role.bulkCreate(roles).catch((err) => console.log(err));
    models_1.default.Customer.bulkCreate(customers).catch((err) => console.log(err));
});
// define a route handler 
app.use('/api', require('./routes/api.js'));
