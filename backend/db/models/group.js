'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    const columnMapping = {
      through: 'UserGroupJoin',
      otherKey: 'userId',
      foreignKey: 'groupId',
    }
    // associations can be defined here
    Group.belongsToMany(models.User, columnMapping);
  };
  return Group;
};