var express = require('express');
const route = require('.');
var router = express.Router();

let goals = [{
    'id':'1',
    'name':'Objetivo de 1',
    'description':'Descripcion del Objetivo 1',
    'dueDate':'2025-05-25'
}];

const goalInit = mongoose.model('goals', { name: String, description: String, dueDate: String },'goals');

/* GET users listing. */
router.get('/getGoal', function(req, res, next) {
    goalInit.find().then(
        (response)=> res.status(200).json(response))
        .catch(err=>{
        console.log(err);
        res.status(500).json({});
    });
});

router.delete('/deleteGoal/:id', function(req, res, next) {
    console.log(req.params.id);
    if(req.params && req.params.id){
        let id = req.params.id;
        goalInit.deleteOne({_id:new mongoose.Types.ObjectId(id)}).then((response)=>{
            res.status(200).json(response);
        }).catch((err)=>{
            res.status(500).json(err);
        })
    }else {
        res.status(400).json({})
    }
});


router.post('/addGoal', function(req, res, next) {
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate ){
        const task = new goalInit(req.body);
        goal.save().then(
            () => res.status(200).json(tasks)
        ).catch(
            (err)=>res.status(400).json(tasks)
        );

        
    }else{
        res.status(400).json(tasks);
    }

   // res.send('respond with a resource');
});

module.exports = router;