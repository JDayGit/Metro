exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('employee').del()
    .then(function () {
      // Inserts seed entries
      return knex('employee').insert([
        {name: 'Albert', email: 'albert@test.com', password:'1234'},
        {name: 'Jake', email: 'jake@test.com', password:'1234'},
        {name: 'Lauren', email: 'Lauren@test.com', password:'1234'}
      ]);
    });
};
