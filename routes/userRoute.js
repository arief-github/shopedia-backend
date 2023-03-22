const express = require('express');
const router = express.Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRound = 10;

router.post("/register", (req, res) => {

    // check for existing email 
    User.find({ email: req.body.email }, (err, docs) => {
        if(docs.length > 0) {
            return res.status(400).json({ message: 'Something went wrong' })
        } else {

            bcrypt.hash(req.body.password, saltRound, (err, hash) => {
                const newuser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                });
            
                newuser.save(err => {
                    if(!err) {
                        res.send('User Registration Success')
                    } else {
                        res.send('Something went wrong')
                    }
                })
            })

            if(err) {
                return res.status(400).json({ message: 'Something went wrong' })
            }
        }

    })
});

router.post('/login', (req, res) => {
    User.find({ email: req.body.email }, (err, docs) => {
        if(docs.length > 0) {
            bcrypt.compare(req.body.password, docs[0].password, (err, result) => {
                if(result === true) {
                    const user = {
                        name: docs[0].name,
                        _id: docs[0]._id,
                        email: docs[0].email,
                        isAdmin: docs[0].isAdmin
                    }
            
                    res.send(user);
                } else {
                    return res.status(400).json({ message: 'Invalid Credentials' });
                }
            });
        } else {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
    })
});

router.post('/update', (req, res) => {
    const { userid, updateduser } = req.body;

    bcrypt.hash(updateduser.password, saltRound, (err, hash) => {
        if(err) {
            return res.status(400).json({ message: err })
        } else {
            User.findByIdAndUpdate({_id: userid}, {
                name: updateduser.name,
                email: updateduser.email,
                password: hash,
            }, (err) => {
                if(err) {
                    return res.status(400).json({ message: "Something went wrong" })
                } else {
                    res.send('User details updated successfully')
                }
            })
        }
    })

    
})

module.exports = router;