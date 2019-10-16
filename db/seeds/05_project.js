exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('project').del()
    .then(function () {
      // Inserts seed entries
      return knex('project').insert([
        {name: 'University of Phoenix Stadium', address: '1 Cardinals Dr, Glendale, AZ 85305', description:'Glendale Pedestrian bridge project was constructed in 2018 to connect the new "black" parking lot to the University of Phoenix Stadium. The pedestrian bridge and tunnel will carry passengers across Bethany Home Road and over the Grand Canal.', img_url:'/images/cards.jpeg'},
        {name: 'Ehrenberg Port of Entry', address: 'Ehrenberg, AZ 85334', description:'Ehrenberg Port of Entry Phase 1 and Phase 2 constructed a new operations building and credentials booth. Also added an auxilliary lane on EB I-10.', img_url: '/images/ehrenberg.jpeg'},
        {name: 'Arizona State Route 303', address: 'West Valley, Arizona', description:"Loop 303 Outfall drainage system was constructed for Maricopa County Flood Control District in 2015, it was a 4.5 mile concrete reinforced channel which also included 13 box culverts, storm drain improvements spanning from Southern Ave. to Van Buren Rd. along the 303 corridor." ,img_url:'/images/303.jpeg'},
        {name: 'Tanger Outlets', address: '4250 W Anthem Way, Phoenix, AZ 85086', description:'Shopping-mall chain featuring a variety of brand-name & designer outlet stores.', img_url:'/images/mall.jpeg'},
      ]);
    });
};
