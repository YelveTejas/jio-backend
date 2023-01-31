const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Usermodel } = require('./module/user.module')
//const { json } = require('express')

router.post("/register", async (req, res) => {
    const { name, email, number, password, cpassword } = req.body
    if (!name || !email || !number || !password || !cpassword) {
        res.send({ error: 'Fill the data Properly' })

    }
    try {
        const preuser = await Usermodel.findOne({ email: email })
        if (preuser) {
            res.send({ error: 'This user already exist' })
        } else if (password !== cpassword) {
            res.send({ error: 'Password does not match' })
        } else {
            bcrypt.hash(password, 5, async (err, secure_passwprd) => {
                if (err) {
                    console.log(err)
                }
                else {
                    const finaluser = new Usermodel({ name, email, number, password: secure_passwprd, cpassword: secure_passwprd })
                    const data = await finaluser.save()
                    console.log(data)
                    res.send('Data Added Succesfully')
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await Usermodel.find({ email })

        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ course: 'backend' }, 'masai');
                    res.send({"token":token,"name":user[0].name})
                } else {
                    res.send('Wrong Password')
                }
            })

        } else {
            res.send('Wrong Credentials')
        }


    } catch (err) {
        console.log(err)
    }
})




module.exports = {
    router
}