module.exports = (sequelize, {UUID, UUIDV4, STRING, INTEGER}) => {
  const User = sequelize.define('user', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    name: {
      type: STRING,
      required: true
    },
    age: {
      type: INTEGER,
      required: true
    }
  });
  return User;
};
