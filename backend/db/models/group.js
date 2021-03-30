'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};