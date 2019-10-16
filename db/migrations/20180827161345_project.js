exports.up = function(knex, Promise) {
  return knex.schema.createTable("project",(table)=>{
    table.increments();
    table.string("name");
    table.string("address");
    table.text("description");
    table.text('img_url')
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("project");
};
