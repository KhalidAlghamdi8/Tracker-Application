const router = require('express').Router();
let User = require('../models/user.model');


//First end point gets http req on the last /
router.route('/').get((req,res) => {
    User.find() // mongoose method
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:' + err));
})

// incoming http req on the /add
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const newUser = new User({username});

    //save on DB
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;