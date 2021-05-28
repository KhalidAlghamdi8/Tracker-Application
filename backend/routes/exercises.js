const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//First end point gets http req on the last /
router.route('/').get((req, res) => {
    Exercise.find() // mongoose method
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error:' + err));
})

// incoming http req on the /add
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const data = Date.parse(req.body.data);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        data,
    });

    //save on DB
    newExercise.save()
        .then(() => res.json('newExercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//fine the exercise by get id
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete the exe by the id
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Exercise Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));

});

//find the current exe and update it
router.route('/update/:id').post((req, res) =>{
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.data = Date.parse(req.body.data);

            exercise.save()
                .then(() => res.json('Exercise updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;