const knex = require("../db/knex.js");
const moment = require('moment');

module.exports = {
  login: (req, res) => {
    console.log("HELLO!!")
    knex('admin').where("email", req.body.email)
      .then((result) => {
        console.log(result)
        let admin = result[0];
        if (admin.password === req.body.password) {
          req.session.admin_id = admin.id;
          req.session.save(() =>
          res.redirect('/control'))
          // res.send('ok')
        } else {
          res.redirect("/");
          // ADD~SHOW WRONG PASSWORD
        }
      })
  },

  logout: (req, res) => {
    // res.send('ok')
    req.session.admin_id = null;
    req.session.employee_id = null;
    req.session.save(() => {
      res.redirect("/")
    })
  },
  addProjectPG: (req, res) => {
    res.render('addProject')
  },
  addProject: (req, res) => {
    knex('project').insert({
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        img_url: req.body.img_url,
      })
      .then(() => {
        res.redirect('/projects')
      })
  },
  delProject: (req, res) => {
    knex("project")
      .del()
      .where('id', req.params.id)
      .then(() => {
        res.redirect("/projects")
      })
  },
  control:(req,res)=>{
    knex('employee')
    .then((result)=>{
      // res.send(result)
      res.render('control',{result})
    })
  },
// WAIT FOR DELETE
  employeeInfo:(req,res)=>{
    knex('employee').where('id',req.params.employee_id)
    .then((emeplyresult)=>{
      return knex('clock').where('employee_id',req.params.employee_id)
          .then((result)=>{
            if(result.length){
              result.forEach(item=>{
                item.date=moment(item.date).format("YYYY-MM-DD")
              })
              res.render("employeeData",{result,employeename:emeplyresult[0]})
            }
          })
    })
  },
// WAIT FOR DELETE
  searchDate:(req,res)=>{
    console.log(req.query)
    knex('clock').where({
      "employee_id":req.params.employee_id,
      'date':req.query.clock_date
    })
    .then((result)=>{
      // res.send(result)
      result.forEach(item=>{
        item.date=moment(item.date).format("YYYY-MM-DD")
      })
      res.render('afterSearchData',{result})
    })
  },
  timeLog:(req,res)=>{
    knex('employee').where('id',req.params.employee_id)
    .then((emeplyresult)=>{
      return knex('clock').where('employee_id',req.params.employee_id)
          .then((result)=>{
            if(result.length){
              result.forEach(item=>{
                item.date=moment(item.date).format("YYYY-MM-DD")
              })
              res.render("timeLog",{result,employeename:emeplyresult[0]})
            }
          })
    })
  },

}
