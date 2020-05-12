const router = require('express').Router();
let Child = require('../models/child.model');

router.route('/').get((req, res) => {
    Child.find()
    .then(childs => res.json(childs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const id = req.body.id;

  const newChild = new Child({title, description, id});

  newChild.save()
    .then(() => res.json('Child circle added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Child.findById(req.params.id)
        .then(child => res.json(child))
        .catch(error => res.status(400).json('message error from action get circle by id : ' + error))
});

router.route('/:id').delete((req, res) => {
    Child.findByIdAndDelete(req.params.id)
        .then(() => res.json('Child circle deleted'))
        .catch( error => res.status(400).json('Error from action delete: ' + error))
});

router.route('/update/:id').post((req, res) => {
    Child.findById(req.params.id)
        .then(child => {
            child.title = req.body.title
            child.description = req.body.description
            child.id = Number(req.body.id)

        child.save()
            .then(() => res.json('child circle uptdated!!'))
            .catch(error => res.status(400).json('message error SAVE from action TO update circle : ' + error))
        })
        .catch(error => res.status(400).json('message error from action TO update circle : ' + error))
});

module.exports = router;