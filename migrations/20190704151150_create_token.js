
exports.up = function(knex) {
  return knex.schema.createTable ('token',(table)=>{
    table.increments();
    table.integer('useID');
    table.string('token');
    table.string('status');
    table.timestamps();
  })
};

exports.down = function(knex) {
  
};
