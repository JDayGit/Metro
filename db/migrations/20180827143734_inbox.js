exports.up = function(knex, Promise) {
  return knex.schema.createTable("inbox",(table)=>{
    table.increments();
    table.string("name");
    table.string("email");
    table.text("content");
    table.string("status").defaultTo('unread');
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("inbox");
};
