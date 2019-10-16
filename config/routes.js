//Update the name of the controller below and rename the file.
const employee = require("../controllers/employee.js");
const metro = require("../controllers/metro.js");
const admin = require("../controllers/admin.js")
module.exports = function(app) {
  app.use(addisEmployee);
    app.get('/test', metro.test);


// FOR EVERYONE CAN SEE
  app.get('/', metro.index);
  app.get('/login', employee.loginPage);
  app.get('/about', metro.about);
  app.get('/projects', metro.projects);

  // app.post('/contactus', metro.contactus);
  app.post('/contactus', metro.contactus);
  app.get('/leadership', metro.leadership);
  app.get('/equipment', metro.equipment);
  //
  // app.get('/test',metro.test);


//LOGIN AND LOGOUT
  app.get('/register', employee.registerPage);
  app.post('/register', employee.register);
  app.post('/login', employee.login);
  app.post('/admin', admin.login);
  app.get('/logout', admin.logout);
  app.get('/contact', metro.contact);
  // app.get('/project',metro.project);


  app.use(authenticateEmployee);

  //EMPLOYEE AUTHORIZATION
  // CLOCK
  app.get('/clock', employee.clockPage);
  app.post('/clock/in', employee.clockIn);
  app.post('/clock/out/:final_id', employee.clockOut);
  // INBOX
  app.get('/inbox/unread',employee.inbox);
  app.get('/inbox/achive',employee.inboxread);
  app.get('/inbox/completed',employee.inboxcompleted);

  //THE ACTION FROM UNREAD INBOX TO SOMEWHERE
  app.post('/inbox/unread/achive/:message_id',employee.toAchiveinUnread);
  app.get('/inbox/unread/delete/:message_id',employee.todeleteinUnread);

  //THE ACTION  FROM ACHIVE INBOX TO SOMEWHERE
  app.post('/inbox/archive/complete/:message_id',employee.theCompleteinArhive);
  app.get('/inbox/archive/delete/:message_id',employee.theDeleteinArchive);
  app.post('/inbox/archive/unread/:message_id',employee.theUnReadinArchived);

  //THE ACTION FROM COMPLETED INBOX TO SOMEWHERE
  app.get('/inbox/completed/delete/:message_id',employee.theDeleteinCompleted);
  app.post('/inbox/completed/archive/:message_id',employee.theArchiveinCompleted);
//
// //EMPLOYEE AUTHORIZATION
//
//   // CLOCK
//   app.get('/clock', employee.clockPage);
//   app.post('/clock/in', employee.clockIn);
//   app.post('/clock/out/:final_id', employee.clockOut);
//   // INBOX
//   app.get('/inbox',employee.inbox);
//   app.get('/inbox/read',employee.inboxread);
//   app.get('/inbox/completed',employee.inboxcompleted);
//   // INBOX ACTION
//   app.post('/inbox/read/:message_id',employee.toread);
//   app.post('/inbox/complete/:message_id',employee.tocomplete);
//   app.get('/inbox/delete/:message_id',employee.todelete);
//
//BOSS AUTHORIZATION
  app.use(authenticateAdmin);

  app.get('/projects/add', admin.addProjectPG);
  app.post('/projects/add', admin.addProject);
  app.get('/control',admin.control);
  app.get('/control/logtime/:employee_id',admin.timeLog);
  // app.get('/control/clock/search/:employee_id',admin.test);
  // app.get('/test/:employee_id',admin.test);
}


function authenticateEmployee(req, res, next) {
  if (!req.session.employee_id && !req.session.admin_id) {
    res.redirect('/')
  } else {
    next();
  }
}
function addisEmployee(req,res,next){
  console.log(req.url)
  res.locals ={
    isemployee:(req.session.employee_id),
    isBoss:(!!req.session.admin_id),
  }
  next();
}


function authenticateAdmin(req, res, next) {
  if (!(req.session.admin_id)) {
    res.redirect('/')
  } else {
    next();
  }
}
