exports.up = function(knex, Promise) {
  return knex.schema.createTable("clock",(table)=>{
    table.increments();
    table.integer("employee_id")
    .references("id")
    .inTable("employee")
    .onDelete("CASCADE")
    .index();
    table.date('date').defaultTo(knex.fn.now(1));
    table.time('clockout_time',1).defaultTo(knex.fn.now(1));
    table.time('clockin_time',1).defaultTo(knex.fn.now(1));
    table.text("nowtime").defaultTo(Date.now())
    table.float('workingtime');
    table.timestamps(true,true);
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("clock");
};
