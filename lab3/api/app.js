const express = require("express")
const bodyParser = require("body-parser")
const app = express();

const {mongoose} = require("./db/mongoose")

const {Task} = require("./db/models/task.model")

app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000, () => {
    console.log("server start")
})

app.get("/tasks", (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    })
})

app.post("/tasks", (req, res) => {
   let title = req.body.title;

   let newTask = new Task({
       title
   })
   newTask.save().then((taskDoc) => {
       res.send(taskDoc)
   }) 
})

app.patch('/tasks/:id', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }).then(() => {
        res.send({
            message: "Updated"
        });
    })
});

app.delete('/tasks/:id', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.id
    }, {
        $set: req.body
    }).then((removeTaskDoc) => {
        res.send(removeTaskDoc);
    })
});