"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserGroupJoin = sequelize.define(
    "UserGroupJoin",
    {
      userId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER
    },
    {}
  );
  UserGroupJoin.associate = function(models) {
    // associations can be defined here
  };
  UserGroupJoin.createEvent = async function({ userId, groupId }) {
    const userGroup = await UserGroupJoin.create({
      userId,
      groupId
    });
    return await UserGroupJoin.findByPk(userGroup.id);
  };

  return UserGroupJoin;
};
