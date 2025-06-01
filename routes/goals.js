var express = require('express');
//const route = require('.');
var router = express.Router();
const mongoose = require('mongoose');

let goals = [{
    'id':'1',
    'name':'Objetivo de 1',
    'description':'Descripcion del Objetivo 1',
    'dueDate':'2025-05-25'
}];

const goalInit = mongoose.model('goals', { name: String, description: String, dueDate: String },'goals');

/* GET goals */
router.get('/getGoal', function(req, res, next) {
    goalInit.find()
        .then(response => res.status(200).json(response))
        .catch(err => {
            console.log(err);
            res.status(500).json({});
        });
});

/* DELETE goal */
router.delete('/deleteGoal/:id', function(req, res, next) {
    const id = req.params.id;
    if (id) {
        goalInit.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
            .then(response => res.status(200).json(response))
            .catch(err => res.status(500).json(err));
    } else {
        res.status(400).json({});
    }
});

/* POST goal */
router.post('/addGoal', function(req, res, next) {
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        const goal = new goalInit(req.body);
        goal.save()
            .then(() => res.status(200).json({ message: 'Objetivo guardado correctamente' }))
            .catch(err => res.status(400).json({ error: err.message }));
    } else {
        res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
});

module.exports = router;