"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("../../db/models"));
const router = express_1.default.Router();
//SENDS ALL MEMBERS
router.get("/", (req, res) => {
    models_1.default.User.findAll({
        include: [{ model: models_1.default.Customer, required: true, as: 'customer' }]
    }).then((result) => {
        // console.log(result)
        // console.log(result[0].dataValues.customer.name)
        let returnObject = [];
        for (let i = 0; i < result.length; i++) {
            const customerName = result[i].dataValues.customer.name;
            const ithObject = {
                id: result[i].dataValues.id,
                firstName: result[i].dataValues.firstName,
                middleName: result[i].dataValues.middletName,
                lastName: result[i].dataValues.lastName,
                email: result[i].dataValues.email,
                phoneNumber: result[i].dataValues.phoneNumber,
                address: result[i].dataValues.address,
                role: result[i].dataValues.roleId,
                customerName: customerName
            };
            returnObject.push(ithObject);
        }
        res.status(200).json(returnObject);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Unexpected Error Occured !' });
    });
});
//EDIT USER
router.put("/:id", (req, res) => {
    let id = +req.params.id;
    const editUser = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        address: req.body.address,
        customerName: req.body.customerName
    };
    if (!editUser.firstName || !editUser.lastName || !editUser.email || !editUser.phoneNumber || !editUser.role || !editUser.address) {
        res.status(400).json({ message: `Give Correct Input` });
    }
    else if (editUser.phoneNumber.length !== 10) {
        res.status(400).json({ message: `Give Correct Input` });
    }
    else {
        models_1.default.Role.findAll({
            where: {
                id: editUser.role
            }
        }).then((result) => {
            if (result.length == 0) {
                res.status(400).json({ message: `Role does not exist` });
            }
        }).then(() => {
            let customerId = -1;
            //Server Side check for customer
            models_1.default.Customer.findAll({
                where: {
                    name: editUser.customerName
                }
            }).then((result) => {
                if (result.length == 0) {
                    res.status(400).json({ message: `Customer does not exist` });
                }
                else {
                    customerId = result[0].id;
                    // console.log(customerId)
                }
            }).then(() => {
                //object to be updated into db
                const updateObject = {
                    firstName: editUser.firstName,
                    middleName: editUser.middleName,
                    lastName: editUser.lastName,
                    email: editUser.email,
                    phoneNumber: editUser.phoneNumber,
                    roleId: editUser.role,
                    address: editUser.address,
                    customerId: customerId
                };
                models_1.default.User.update(updateObject, {
                    where: { id: id }, returning: true,
                    plain: true
                }).then((message) => {
                    res.status(200).json({ message: `User with id ${id} edited Successfully !`, updatedRecord: message[1].dataValues });
                    console.log(message);
                }).catch((err) => {
                    console.log(err);
                    res.status(500).json({ message: `${err}` });
                });
            });
        }).catch((err) => {
            res.status(500).json({ message: `${err}` });
        });
    }
});
//DELETE USER
router.delete("/:id", (req, res) => {
    let id = req.params.id;
    models_1.default.User.destroy({
        where: {
            id: id
        }
    }).then((noOfRowsDeleted) => {
        if (noOfRowsDeleted) {
            res.status(200).json({ message: `User with id ${id} deleted Successfully!` });
        }
        else {
            res.status(400).json({ message: `User with id ${id} does not exist` });
        }
    }).catch(() => {
        res.status(500).json({ message: 'Unexpected Error Occured !' });
    });
});
//INSERT USER
router.post("/", (req, res) => {
    const newMember = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        address: req.body.address,
        customerName: req.body.customerName
    };
    if (!newMember.firstName || !newMember.lastName || !newMember.email || !newMember.phoneNumber || !newMember.role || !newMember.address) {
        res.status(400).json({ message: `Give Correct Input` });
    }
    else if (newMember.phoneNumber.length !== 10) {
        res.status(400).json({ message: `Give Correct Input` });
    }
    else {
        //Server side check for role
        models_1.default.Role.findAll({
            where: {
                id: newMember.role
            }
        }).then((result) => {
            if (result.length == 0) {
                res.status(400).json({ message: `Role does not exist` });
            }
        }).then(() => {
            let customerId = -1;
            //Server Side check for customer
            models_1.default.Customer.findAll({
                where: {
                    name: newMember.customerName
                }
            }).then((result) => {
                if (result.length == 0) {
                    res.status(400).json({ message: `Customer does not exist` });
                }
                else {
                    customerId = result[0].id;
                    // console.log(customerId)
                }
            }).then(() => {
                //object to be inserted into db
                const insertObject = {
                    firstName: newMember.firstName,
                    middleName: newMember.middleName,
                    lastName: newMember.lastName,
                    email: newMember.email,
                    phoneNumber: newMember.phoneNumber,
                    roleId: newMember.role,
                    address: newMember.address,
                    customerId: customerId
                };
                models_1.default.User.create(insertObject).then((message) => {
                    res.status(200).json({ message: `User added Successfully !`, addedRecord: message.dataValues });
                    // console.log(message)
                }).catch((err) => {
                    // console.log(err)
                    res.status(500).json({ message: `${err}` });
                });
            });
        }).catch((err) => {
            res.status(500).json({ message: `${err}` });
        });
    }
});
module.exports = router;
