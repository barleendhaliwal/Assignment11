import express, { Request, Response } from "express";
import db from '../../db/models'
const router = express.Router();
//type of data recieved from client
type User = {

    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: number; //role has enum value
    address: string;
    customerName: string;
}
//type of data inserted/retrived from server in user table
type ServerUser={
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    roleId: number; 
    address: string;
    customerId: number;
}

//SENDS ALL MEMBERS
router.get("/", (req: Request, res: Response) => {

    db.User.findAll({
        include: [{ model: db.Customer, required: true, as: 'customer' }]
    }).then((result: any) => {

        // console.log(result)

        // console.log(result[0].dataValues.customer.name)
        let returnObject: User[] = [];
        for (let i = 0; i < result.length; i++) {
            const customerName = result[i].dataValues.customer.name
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

            }
            returnObject.push(ithObject)
        }

        res.status(200).json(returnObject)
    }).catch((err: any) => {
        console.log(err)
        res.status(500).json({ message: 'Unexpected Error Occured !' })
    })


});
//EDIT USER
router.put("/:id", (req: Request, res: Response) => {

    let id = +req.params.id;
    const editUser:User= {

        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        address: req.body.address,
        customerName: req.body.customerName


    }
    if (!editUser.firstName || !editUser.lastName || !editUser.email || !editUser.phoneNumber || !editUser.role || !editUser.address) {
        res.status(400).json({ message: `Give Correct Input` })
    }
    else if (editUser.phoneNumber.length !== 10) {
        res.status(400).json({ message: `Give Correct Input` })
    }
    else {
        db.Role.findAll({
            where: {
                id: editUser.role
            }
        }).then((result: any) => {
            if (result.length == 0) {
                res.status(400).json({ message: `Role does not exist` })
            }

        }).then(() => {

            let customerId = -1;

            //Server Side check for customer
            db.Customer.findAll({
                where: {
                    name: editUser.customerName
                }
            }).then((result: any) => {
                if (result.length == 0) {
                    res.status(400).json({ message: `Customer does not exist` })
                }
                else {
                    customerId = result[0].id;
                    // console.log(customerId)
                }

            }).then(() => {

                //object to be updated into db
                const updateObject:ServerUser = {
                    firstName: editUser.firstName,
                    middleName: editUser.middleName,
                    lastName: editUser.lastName,
                    email: editUser.email,
                    phoneNumber: editUser.phoneNumber,
                    roleId: editUser.role,
                    address: editUser.address,
                    customerId: customerId

                }


                db.User.update(updateObject, {
                    where: { id: id }, returning: true,
                    plain: true
                }).then((message: any) => {

                    res.status(200).json({ message: `User with id ${id} edited Successfully !`, updatedRecord: message[1].dataValues })
                    console.log(message)
                }).catch((err: any) => {
                    console.log(err)
                    res.status(500).json({ message: `${err}` })

                });

            })
        }).catch((err: any) => {
            res.status(500).json({ message: `${err}` })
        }

        )
    }

})
//DELETE USER
router.delete("/:id", (req: Request, res: Response) => {
    let id = req.params.id;
    db.User.destroy({
        where: {
            id: id
        }
    }).then((noOfRowsDeleted: number) => {

        if (noOfRowsDeleted) {
            res.status(200).json({ message: `User with id ${id} deleted Successfully!` })
        }
        else {
            res.status(400).json({ message: `User with id ${id} does not exist` })
        }
    }
    ).catch(() => {
        res.status(500).json({ message: 'Unexpected Error Occured !' })
    }
    )

})

//INSERT USER
router.post("/", (req: Request, res: Response) => {

    const newMember: User = {

        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        address: req.body.address,
        customerName: req.body.customerName


    }


    if (!newMember.firstName || !newMember.lastName || !newMember.email || !newMember.phoneNumber || !newMember.role|| !newMember.address) {
        res.status(400).json({ message: `Give Correct Input` })
    }
    else if (newMember.phoneNumber.length !== 10) {
        res.status(400).json({ message: `Give Correct Input` })
    }
    else {

        //Server side check for role
        db.Role.findAll({
            where: {
                id: newMember.role
            }
        }).then((result: any) => {
            if (result.length == 0) {
                res.status(400).json({ message: `Role does not exist` })
            }

        }).then(() => {

            let customerId = -1;

            //Server Side check for customer
            db.Customer.findAll({
                where: {
                    name: newMember.customerName
                }
            }).then((result: any) => {
                if (result.length == 0) {
                    res.status(400).json({ message: `Customer does not exist` })
                }
                else {
                    customerId = result[0].id;
                    // console.log(customerId)
                }

            }).then(() => {

                //object to be inserted into db
                const insertObject:ServerUser = {
                    firstName: newMember.firstName,
                    middleName: newMember.middleName,
                    lastName: newMember.lastName,
                    email: newMember.email,
                    phoneNumber: newMember.phoneNumber,
                    roleId: newMember.role,
                    address: newMember.address,
                    customerId: customerId

                }


                db.User.create(insertObject).then((message: any) => {

                    res.status(200).json({ message: `User added Successfully !`, addedRecord: message.dataValues })
                    // console.log(message)
                }).catch((err: any) => {
                    // console.log(err)
                    res.status(500).json({ message: `${err}` })

                });

            })
        }).catch((err: any) => {
            res.status(500).json({ message: `${err}` })
        }

        )
    }
})
module.exports = router;
