
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clock').del()
    .then(function () {
      // Inserts seed entries
      return knex('clock').insert([
        {employee_id: 1,clockin_time:"8:00",clockout_time:null,workingtime:10,nowtime:Date.now(),date:'2018-7-20'},
        {employee_id: 1,clockout_time:"15:00",clockin_time:null,workingtime:null,nowtime:Date.now(),date:'2018-7-20'},
        {employee_id: 1,clockout_time:"15:00",clockin_time:null,workingtime:null,nowtime:Date.now(),date:'2018-7-21'},
        {employee_id: 1,clockin_time:"8:00",clockout_time:null,workingtime:10,nowtime:Date.now(),date:'2018-7-21'},
        {employee_id: 1,clockin_time:"8:00",clockout_time:null,workingtime:null,nowtime:Date.now(),date:'2018-7-22'},
        {employee_id: 1,clockout_time:"14:00",clockin_time:null,workingtime:10,nowtime:Date.now(),date:'2018-7-22'},
        {employee_id: 1,clockin_time:"8:00",clockout_time:null,workingtime:null,nowtime:Date.now(),date:'2018-7-23'},
        {employee_id: 1,clockout_time:"18:00",clockin_time:null,workingtime:10,nowtime:Date.now(),date:'2018-7-23'},
        {employee_id: 1,clockin_time:"8:00",clockout_time:null,workingtime:10,nowtime:Date.now(),date:'2018-7-24'},
        {employee_id: 2,clockout_time:"16:00",clockin_time:null,workingtime:10,nowtime:Date.now(),date:'2018-7-24'},
        {employee_id: 2,clockin_time:"8:00",clockout_time:null,workingtime:10,nowtime:Date.now(),date:'2018-7-20'},
        {employee_id: 2,clockout_time:"15:00",clockin_time:null,workingtime:null,nowtime:Date.now(),date:'2018-7-20'},
        {employee_id: 2,clockout_time:"15:00",clockin_time:null,workingtime:null,nowtime:Date.now(),date:'2018-7-21'},
        {employee_id: 2,clockin_time:"8:00",clockout_time:null,workingtime:10,nowtime:Date.now(),date:'2018-7-21'},
        {employee_id: 2,clockin_time:"8:00",clockout_time:null,workingtime:null,nowtime:Date.now(),date:'2018-7-22'},
        {employee_id: 2,clockout_time:"14:00",clockin_time:null,workingtime:10,nowtime:Date.now(),date:'2018-7-22'},
        // {employee_id: 1,clockin_time:"5:00",clockout_time:null,nowtime:Date.now()},

      ]);
    });
};
