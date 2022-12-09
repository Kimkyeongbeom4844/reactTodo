"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todolist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todolist.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      complete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Todolist",
      tableName: "todolist", //기본값은 모델이름 lowercase후 뒤에 s
      charset: "utf8",
      timestamps: false,
    }
  );
  return Todolist;
};
