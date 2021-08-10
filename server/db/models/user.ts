import {Model} from 'sequelize';
interface UserAttributes {
  id: number,
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  address: string,
}
//incase of 3rd party library like sequelize - ignore type checking - can use any
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //need to put ! to tell ts compiler not null
    id!: number;
    firstName!: string;
    middleName!: string;
    lastName!: string;
    email!: string;
    phoneNumber!: string;
    address!: string;
    

    static associate(models: any) {
      // define association here
      User.belongsTo(models.Role,{ as: 'role' })
      User.belongsTo(models.Customer,{ as: 'customer' })
    }
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    middleName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type :DataTypes.STRING,
      unique:true,
      allowNull: false
    },
    phoneNumber:{
      type :DataTypes.STRING,
      unique:true,
      allowNull: false
    },
    address:{
      type :DataTypes.STRING,
      allowNull: false
      
    }

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};