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
  Group.createGroup = async function ({ 
    name, avatar, description
  }) {
    const group = await Group.create({
      name, avatar, description
    });
    return await Group.findByPk(group.id);
  }

  return Group;
};