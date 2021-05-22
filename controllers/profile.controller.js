const Profile = require('../models/profile.model')
const { Task } = require('../models/task.model')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')


require('dotenv').config()
const jwt_secret = process.env.JWT_SECRET

router.route('/login').post((req, res) => {
    const { name, password } = req.body

    if (!name || !password) {
        return res.status(400).json({ msg: 'Please enter all field' })
    }

    Profile.findOne({ name })
        .then(profile => {
            if (!profile) return res.status(400).json({ msg: 'Name does not exist' })

            // validate password
            bcrypt.compare(password, profile.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' })

                    jwt.sign(
                        { id: profile.id },
                        jwt_secret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err
                            res.json({
                                token,
                                profile: {
                                    id: profile.id,
                                    name: profile.name,
                                    task: profile.task
                                }
                            })
                        }
                    )
                })


        })

})

router.route('/register').post((req, res) => {
    const { name, password } = req.body

    if (!name || !password) {
        return res.status(400).json({ msg: 'Please enter all field' })
    }

    Profile.findOne({ name })
        .then(profile => {
            if (profile) return res.status(400).json({ msg: 'Name already exists' })

            const newProfile = new Profile({
                name,
                password,
                task: []
            })

            // create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newProfile.password, salt, (err, hash) => {
                    if (err) throw err
                    newProfile.password = hash
                    newProfile.save()
                        .then(profile => {
                            jwt.sign(
                                { id: profile.id },
                                jwt_secret,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err
                                    res.json({
                                        token,
                                        profile: {
                                            id: profile.id,
                                            name: profile.name,
                                            task: profile.task
                                        }
                                    })
                                }
                            )
                        })
                })
            })


        })

})

router.route('/logout').get((req, res) => {
    res.send('logout')
})

router.use(auth)

router.route('/delete').post((req, res) => {
    Profile.findByIdAndDelete(req.profile.id)
        .then(() => res.json('Delete success!'))
        .catch(err => res.status(400).json("Error! " + err))
})

router.route('/task').post((req, res) => {
    Profile.findById(req.profile.id)
        .then(profile => {
            const newTask = new Task(req.body.task)

            profile.task.push(newTask)

            profile.save()
                .then(profile => res.json({
                    profile: {
                        id: profile.id,
                        name: profile.name,
                        task: profile.task
                    }
                }))
                .catch(err => res.status(400).json("Error! " + err))
        })
})

router.route('/task').put((req, res) => {

    Profile.findById(req.profile.id)
        .findOneAndUpdate({ 'task._id': req.body.task._id },
            { '$set': { 'task.$': req.body.task } },
            { new: true })
        .select('-password')
        .then(profile => {
            res.json({ profile })
        })
        .catch(err => res.status(400).json("Error! " + err))

})

router.route('/task/:id').delete((req, res) => {

    Profile.findById(req.profile.id)
        .then(profile => {
            profile.task.pull({ _id: req.params.id })
            profile.save()
                .then(profile => res.json({
                    profile: {
                        id: profile.id,
                        name: profile.name,
                        task: profile.task
                    }
                }))
                .catch(err => res.status(400).json("Error! " + err))
        })
})

// get user data
router.route('/').get((req, res) => {
    Profile.findById(req.profile.id)
        .select('-password')
        .then(profile => {
            res.json({ profile })
        })
        .catch(err => res.status(400).json("Error! " + err))
})


module.exports = router