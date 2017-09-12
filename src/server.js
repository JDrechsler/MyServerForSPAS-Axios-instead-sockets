//My Server for spas

var express = require('express')
var app = express()
var server = require('http').Server(app)
var exec = require('child_process').exec
const WPM = "C:\\Users\\AdminUS\\Documents\\TheForestHackCPP\\MyServerForSPAs-master\\src\\cpp\\WPM.exe"
var port = process.env.PORT || 3000

server.listen(port, function () {
	console.log(`Listening on Port: ${port}, localhost:${port}`);
})

app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.use(express.static(__dirname))

app.get('/', function (request, response) {
	response.send("Server is up and running. Yay!")
})

app.get('/findWindowStatus', function (req, res) {
	var className = req.query.className
	console.log(req.query.className);
	console.log('Client will findWindowStatus ' + className)
	getFindWindowStatus(className, res)
});

app.post('/bacon', function name(req, res) {
	console.log('Bacooon requested')
	console.log(req + res)
})

app.get('/writeProcessMemory', function (req, res) {
	var procName = req.query.procName
	var address = req.query.address
	var newValue = req.query.newValue
	console.log(procName);
	console.log(address);
	console.log(newValue);
	executeWriteProcessMemory(procName, address, newValue, res)
});

function getFindWindowStatus(className, res) {
	var child = exec(`C:\\Users\\AdminUS\\Documents\\TheForestHackCPP\\MyServerForSPAs-master\\src\\cpp\\FindWindow.exe ${className}`);
	child.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});
	child.stderr.on('data', function (data) {
		console.log('stdout: ' + data);
	});
	child.on('exit', function (code) {
		console.log('exit code: ' + code);
		res.send(code.toString())
	});
}

function executeWriteProcessMemory(procName, address, newValue, res) {
	var child = exec(`${WPM} -writeProcessMemory procName:${procName} address:${address} newValue:${newValue}`);
	child.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});
	child.stderr.on('data', function (data) {
		console.log('stdout: ' + data);
	});
	child.on('exit', function (code) {
		console.log('exit code: ' + code);
		res.send(code.toString())
	});
}