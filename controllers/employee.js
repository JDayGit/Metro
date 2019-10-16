const knex = require("../db/knex.js");
const moment = require('moment');

module.exports = {


// LOGIN AND LOGOUT
  loginPage:(req,res)=>{
    res.render("login")
  },
  registerPage:(req,res)=>{
    res.render("registerPage")
  },
  register:(req, res)=>{
    knex('employee').insert({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
    }).then(()=>{
      res.redirect("/register");
    })
  },

  login:(req,res)=>{
    knex('employee').where("email",req.body.email)
    .then((result)=>{
      let employee = result[0];
      if(employee.password===req.body.password){
        req.session.employee_id=employee.id;
        req.session.save(() =>
        res.redirect('/clock'))
        // res.send('ok')
      }else{
        res.redirect("/");
        // ADD~SHOW WRONG PASSWORD
      }
    })
  },
  logout:(req,res)=>{
    req.session.employee_id=null;
    req.session.save(()=>{
      // res.send('ok')
      res.redirect("/")
    })
  },

// CLOCKIN
  clockPage:(req,res)=>{
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();
  if(dd<10) {
      dd = '0'+dd
  }
  if(mm<10) {
      mm = '0'+mm
  }
  today = yyyy + '-' + mm + '-' + dd;
    knex('clock').where({'date':today,
    'employee_id':req.session.employee_id
  })
    .then((result)=>{
      if(result.length){
        result.forEach(item=>{
          item.date=moment(result[0].date).format("YYYY-MM-DD")

        })

      }
      res.render("clockin",{result})
    })
  },
  clockIn:(req, res)=>{
    let nowtime = Date.now();
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    todayDate = yyyy + '-' + mm + '-' + dd;
    knex('clock').insert({
      clockout_time:null,
      employee_id:req.session.employee_id,
      nowtime:nowtime ,
      date:todayDate
    }).then(()=>{
      res.redirect("/clock");
    })
  },
  clockOut:(req, res)=>{
    let nowtime =Date.now();
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    todayDate = yyyy + '-' + mm + '-' + dd;
    knex('clock').where('id',req.params.final_id)
    .then((result_final_id)=>{
      knex('clock').insert({
        employee_id:req.session.employee_id,
        clockin_time:null,
        nowtime:nowtime,
        workingtime:((today-result_final_id[0].nowtime)/3600000).toFixed(1),
        date:todayDate
      }).then(()=>{
        res.redirect("/clock");
      })

    })

  },
// INBOX PAGES

  //INBOX DEFAULT IS UNREAD PAGE
  inbox:(req,res)=>{
    knex('inbox').where('status','unread')
    .then((result)=>{
      res.render('inbox',{result})
    })
  },

  //INBOX ACHIVE PAGE
  inboxread:(req,res)=>{
    knex('inbox').where('status','read')
    .then((result)=>{
      res.render('inboxread',{result})
    })
  },
  // INBOX COMPLETED PAGE
  inboxcompleted:(req,res)=>{
    knex('inbox').where('status','completed')
    .then((result)=>{
      res.render('inboxcompleted',{result})
    })
  },

// UNREAD PAGE ACTION
  toAchiveinUnread:(req,res)=>{
    knex('inbox').where('id',req.params.message_id).update(
      {
        status:'read',
      }
    ).then(()=>{
      res.redirect('/inbox/unread')
    })
  },
  todeleteinUnread:(req,res)=>{
    knex('inbox').where('id',req.params.message_id).del()
    .then(()=>
    res.redirect('/inbox/unread'))
  },

// THE ACTION IN ARCHIVE PAGE
  theCompleteinArhive:(req,res)=>{
    knex('inbox').where('id',req.params.message_id).update(
  {
        status:'completed',
      }
    ).then(()=>{
      res.redirect('/inbox/achive')
    })
  },
  theDeleteinArchive:(req,res)=>{
    knex('inbox').where('id',req.params.message_id).del()
    .then(()=>
    res.redirect('/inbox/achive'))
  },
  theUnReadinArchived:(req,res)=>{
    knex('inbox').where('id',req.params.message_id).update(
  {
        status:'unread',
      }
    ).then(()=>{
      res.redirect('/inbox/achive')
    })
  },

// THE ACTION IN COMPLETED PAGE
  theDeleteinCompleted:(req,res)=>{
    knex('inbox').where('id',req.params.message_id).del()
    .then(()=>
    res.redirect('/inbox/completed'))
  },
  theArchiveinCompleted:(req,res)=>{
    knex('inbox').where('id',req.params.message_id).update(
  {
        status:'read',
      }
    ).then(()=>{
      res.redirect('/inbox/completed')
    })
  },
// //TODAY'S WORKING HOURS
//
//
// // INBOX
//
// //INBOX DEFAULT IS UNREAD
//   inbox:(req,res)=>{
//     knex('inbox').where('status','unread')
//     .then((result)=>{
//       res.render('inbox',{result})
//     })
//   },
//
// //INBOX READ
//   inboxread:(req,res)=>{
//     knex('inbox').where('status','read')
//     .then((result)=>{
//       res.render('inboxread',{result})
//     })
//   },
// // INBOX COMPLETED
//   inboxcompleted:(req,res)=>{
//     knex('inbox').where('status','completed')
//     .then((result)=>{
//       res.render('inboxcompleted',{result})
//     })
//   },
//   toread:(req,res)=>{
//     knex('inbox').where('id',req.params.message_id).update(
//       {
//         status:'read',
//       }
//     ).then(()=>{
//       res.redirect('/inbox')
//     })
//   },
//   tocomplete:(req,res)=>{
//     knex('inbox').where('id',req.params.message_id).update(
//   {
//         status:'completed',
//       }
//     ).then(()=>{
//       res.redirect('/inbox/read')
//     })
//   },
//   todelete:(req,res)=>{
//     knex('inbox').where('id',req.params.message_id).del()
//     .then(()=>
//     res.redirect('/inbox/completed'))
//   },
}
