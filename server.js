//Підключаємо бібліотеки
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const port = 8000;

//Клієнтська частина сайту знаходитиметься у папці public
app.use(express.static(__dirname + '/public'));
//Стандарти кодування
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

//MYSQL
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'test'
});



//var arr =[{
//	login: "admin",
//	pass: "123"
//},{
//	login: "admin2",
//	pass: "123"
//},{
//	login: "admin3",
//	pass: "123"
//}]
//
//app.post('/login', function (req,res) {
//	for (var i=0; i<arr.length; i++){
//    if(arr[i].login == req.body.login){
//        if(arr[i].pass == req.body.pass){
//            res.status(200).send("Welcome "+req.body.login);
//        }
//        else {
//            res.status(200).send("Wrong password");
//        }
//        
//    }
//    else {
//		if(i==arr.length-1){
//             res.status(200).send("Wrong login");
//        }
//	}
//	}
//})

//авторизація 
app.post('/login-auth', function(req, res) {
	connection.query('SELECT * FROM users WHERE login=?', req.body.login, function (err,rows){
		if (err) throw err;
		if (rows[0] !=undefined) {
			if (rows[0].password == req.body.pass) {
				res.status(200).send("welcome");
			} else {
				res.status(200).send("wrong password");
			}
		} else {
			res.status(200).send("wrong login");
		}
	});
});

//реєстрація
app.post('/login-reg', function(req, res){
	connection.query('INSERT INTO users SET ?', req.body,
					function(err,result) {
		if (err) throw err;
		console.log('user added to database with id: '+result.insertId);
	}
	);
	res.sendStatus(200);
});

//змінити пароль 
app.post('/login-change', function(req, res){
	connection.query('UPDATE users SET password = ? WHERE login = ?', [req.body.password,req.body.login],
					function(err) {
		if (err) throw err;
	         }
	);
	res.sendStatus(200);
});

//видалити юзера 
app.post('/login-del', function(req, res) {
	connection.query('DELETE FROM users WHERE login = ?',req.body.login,
					function(err) {
		if (err) throw err;
		console.log('user deleted id: ' + req.body.id)
	         }
	);
	res.sendStatus(200);
})


//Завантажити дані авторизованого юзера
app.post('/user-prof', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
             connection.query('SELECT * FROM userpage  WHERE users_id = ?', rows[0].id,
                function (err, result) {
                    if (err) throw err;
                    res.status(200).send(result);
                }
            );
        } else {
            res.status(200).send("User is undefined");
        }
    });
});






















//Усі адреси контролюються клієнтським ангуляром
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//Запуск серверу
app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});
