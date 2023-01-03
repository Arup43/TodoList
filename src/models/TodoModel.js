const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    UserName: {type: String},
    TodoSubject: {type: String},
    TodoDescription: {type: String},
    TodoStatus: {type: String},
    TodoCreatedDate: {type: Date},
    TodoUpdatedDate: {type: Date},
}, {versionKey: false});

const TodoModel = mongoose.model('Todo', DataSchema, 'TodoList');

module.exports = TodoModel;