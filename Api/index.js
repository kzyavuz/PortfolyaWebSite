const express = require('express');
const cors = require('cors');
require('./db/config');

const aboutRoutes = require('./api/About');
const projectRoutes = require('./api/Project');
const messageRoutes = require('./api/Message');
const technologyRoutes = require('./api/Technology');
const homeRoutes = require('./api/Home');
const workRoutes = require('./api/Work');
const educationRoutes = require('./api/Education');
const userRoutes = require('./api/Users');

const Token = require('./Token');
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Api Çalısıyor.');
});

// About methods
app.get('/getOneAbout', aboutRoutes.getOneAbout);
app.get('/listAbout', Token, aboutRoutes.listAbout);
app.post('/detailsAbout', Token, aboutRoutes.datailsAbout);
app.post('/addAbout', Token, aboutRoutes.addAbout);
app.post('/updateAbout', Token, aboutRoutes.updateAbout);
app.post('/deleteAbout', Token, aboutRoutes.deleteAbout);

//Project methodss
app.get('/listProject', projectRoutes.listProject);
app.post('/detailsProject', Token, projectRoutes.datailsProject);
app.post('/addProject', Token, projectRoutes.addProject);
app.post('/updateProject', Token, projectRoutes.updateProject);
app.post('/deleteProject', Token, projectRoutes.deleteProject);

//Technelogy methods
app.get('/listTechnology', technologyRoutes.listTechnology);
app.post('/addTechnology', Token, technologyRoutes.addTechnology);
app.post('/updateTechnology', Token, technologyRoutes.updateTechnology);
app.post('/deleteTechnology', Token, technologyRoutes.deleteTechnology);
app.post('/datailsTechnology', Token, technologyRoutes.datailsTechnology);

// Home methods
app.get('/listHome', Token, homeRoutes.listHome);
app.get('/getOneHome', homeRoutes.getOneHome);
app.post('/addHome', Token, homeRoutes.addHome);
app.post('/updateHome', Token, homeRoutes.updateHome);
app.post('/deleteHome', Token, homeRoutes.deleteHome);
app.post('/datailsHome', Token, homeRoutes.datailsHome);

// Work methods
app.get('/listWork', workRoutes.listWork);
app.post('/addWork', Token, workRoutes.addWork);
app.post('/updateWork', Token, workRoutes.updateWork);
app.post('/deleteWork', Token, workRoutes.deleteWork);
app.post('/datailsWork', Token, workRoutes.datailsWork);

// Education methods
app.get('/listEducation', educationRoutes.listEducation);
app.post('/addEducation', Token, educationRoutes.addEducation);
app.post('/updateEducation', Token, educationRoutes.updateEducation);
app.post('/deleteEducation', Token, educationRoutes.deleteEducation);
app.post('/datailsEducation', Token, educationRoutes.datailsEducation);

// Mesajları methods.
app.post('/addMessage', messageRoutes.addMessage);
app.get('/listMessage', Token, messageRoutes.listMessage);
app.get('/newListMessage', Token, messageRoutes.newListMessage);
app.post('/readMessage', Token, messageRoutes.readMessage);
app.post('/detailsMessage', Token, messageRoutes.datailsMessage);
app.post('/countMessage', Token, messageRoutes.countMessage);

// User methods
app.post('/SignIn', userRoutes.SignIn);
app.post('/listUser', Token, userRoutes.listUser);
app.post('/SignUp', Token, userRoutes.SignUp);

app.listen(4000);
