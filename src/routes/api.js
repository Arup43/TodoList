const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware');
const TodoListController = require('../controllers/TodoListController');

//Routes
router.post('/register', ProfileController.RegisterUser);
router.post('/login', ProfileController.LoginUser);

router.post('/updateProfile', AuthVerifyMiddleware, ProfileController.UpdateProfile);


router.post('/createTodo', AuthVerifyMiddleware, TodoListController.createTodo);
router.get('/getTodoList', AuthVerifyMiddleware, TodoListController.getTodoList);
router.post('/updateTodo', AuthVerifyMiddleware, TodoListController.updateTodo);
router.post('/updateTodoStatus', AuthVerifyMiddleware, TodoListController.updateTodoStatus);
router.post('/deleteTodo', AuthVerifyMiddleware, TodoListController.deleteTodo);
router.get('/filterTodoByStatus', AuthVerifyMiddleware, TodoListController.filterTodoByStatus);
router.get('/filterTodoByDate', AuthVerifyMiddleware, TodoListController.filterTodoByDate);
router.get('/searchTodo', AuthVerifyMiddleware, TodoListController.searchTodo);

module.exports = router;