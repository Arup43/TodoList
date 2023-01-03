const TodoModel = require('../models/TodoModel');

exports.createTodo = (req, res) => {
    let reqBody = req.body;

    let TodoSubject = reqBody["TodoSubject"];
    let TodoDescription = reqBody["TodoDescription"];
    let TodoStatus = "New";
    let UserName = req.headers['username'];
    let TodoCreatedDate = Date.now();
    let TodoUpdatedDate = Date.now();

    let PostBody = {
        UserName: UserName,
        TodoSubject: TodoSubject,
        TodoDescription: TodoDescription,
        TodoStatus: TodoStatus,
        TodoCreatedDate: TodoCreatedDate,
        TodoUpdatedDate: TodoUpdatedDate
    }

    TodoModel.create(PostBody, (err, data) => {
        if(err){
            res.status(400).json({
                status: "fail",
                data: err
            });
        } else{
            res.status(200).json({
                status: "success",
                data: data
            });
        }
    });
}

exports.getTodoList = (req, res) => {
    let UserName = req.headers['username'];
    TodoModel.find({
        UserName: UserName
    }, (err, data) => {
        if(err){
            res.status(400).json({
                status: "fail",
                data: err
            });
        } else{
            res.status(200).json({
                status: "success",
                data: data
            });
        }
    })
}

exports.updateTodo = (req, res) => {
    let TodoSubject = req.body["TodoSubject"];
    let TodoDescription = req.body["TodoDescription"];
    let _id = req.body["_id"];
    let TodoUpdatedDate = Date.now();

    let PostBody = {
        TodoSubject: TodoSubject,
        TodoDescription: TodoDescription,
        TodoUpdatedDate: TodoUpdatedDate
    }

    TodoModel.updateOne({_id: _id} , {$set: PostBody}, {upsert: true}, (err, data) => {
        if(err){
            res.status(400).json({
                status: "fail",
                data: err
            });
        } else{
            res.status(200).json({
                status: "success",
                data: data
            });
        }
    })
}

exports.updateTodoStatus = (req, res) => {
    let TodoStatus = req.body["TodoStatus"];
    let _id = req.body["_id"];
    let TodoUpdatedDate = Date.now();

    let PostBody = {
        TodoStatus: TodoStatus,
        TodoUpdatedDate: TodoUpdatedDate
    }

    TodoModel.updateOne({_id: _id} , {$set: PostBody}, {upsert: true}, (err, data) => {
        if(err){
            res.status(400).json({
                status: "fail",
                data: err
            });
        } else{
            res.status(200).json({
                status: "success",
                data: data
            });
        }
    })
}

exports.deleteTodo = (req, res) => {
    let _id = req.body["_id"];
    TodoModel.remove({_id: _id}, (err, data) => {
        if(err){
            res.status(400).json({
                status: "fail",
                data: err
            });
        } else{
            res.status(200).json({
                status: "success",
                data: data
            });
        }
    });
}

exports.filterTodoByStatus = (req, res) => {
    let UserName = req.headers['username'];
    let TodoStatus = req.body["TodoStatus"];
    TodoModel.find({
        UserName: UserName,
        TodoStatus: TodoStatus
    }, (err, data) => {
        if(err){
            res.status(400).json({
                status: "fail",
                data: err
            });
        } else{
            res.status(200).json({
                status: "success",
                data: data
            });
        }
    })
}

exports.filterTodoByDate = (req, res) => {
    let UserName = req.headers['username'];
    let FromDate = req.body["FromDate"];
    let ToDate = req.body["ToDate"];

    TodoModel.find({
        UserName: UserName,
        TodoCreatedDate: {
            $gte: new Date(FromDate),
            $lte: new Date(ToDate)
        }
    }, (err, data) => {
        if(err){
            res.status(400).json({
                status: "fail",
                data: err
            });
        } else{
            res.status(200).json({
                status: "success",
                data: data
            });
        }
    })
}

exports.searchTodo = (req, res) => {
    let UserName = req.headers['username'];
    let SearchText = req.body["SearchText"];

    TodoModel.find({
        UserName: UserName,
        $or: [
            {TodoSubject: {$regex: SearchText, $options: 'i'}},
            {TodoDescription: {$regex: SearchText, $options: 'i'}}
        ]
    }, (err, data) => {
        if(err){
            res.status(400).json({
                status: "fail",
                data: err
            });
        } else{
            res.status(200).json({
                status: "success",
                data: data
            });
        }
    })
}