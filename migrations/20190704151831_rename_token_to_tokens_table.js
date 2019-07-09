
exports.up = function(knex) {
  return knex.schema.renameTable('token', 'tokens');
};

exports.down = function(knex) {
  
};
