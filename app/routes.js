var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};




function getTodosId(res,id) {

	//var requestedOrder = ["2", "3"]; 
//req.body.order;
Todo.find({_id: id},
function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

function getTodosText(res,text) {

	//var requestedOrder = ["2", "3"]; 
//req.body.order;
Todo.find({text: text},
function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};


function getTodosOrder(res,order) {

	//var requestedOrder = ["2", "3"]; 
//req.body.order;
Todo.find({order: order},
function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

app.get('/api/todos/id/:todo_id', function (req, res) {
        // use mongoose to get all todos in the database
         Todo.find({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodosId(res, req.params.todo_id);
        });
    });

app.get('/api/todos/text/:todo_text', function (req, res) {
        // use mongoose to get all todos in the database
         Todo.find({
            text: req.params.todo_text
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodosText(res, req.params.todo_text);
        });
    });

app.get('/api/todos/order/:todo_order', function (req, res) {
        // use mongoose to get all todos in the database
         Todo.find({
            order: req.params.todo_order
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodosOrder(res, req.params.todo_order);
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
	    order:req.body.order,
	    pixel:req.body.pixel,			
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
