import {Model} from "sequelize"
interface CustomerAttributes {
  id: number,
  name: string,
  website: string,
  address:string
}
module.exports = (sequelize:any, DataTypes:any) => {
  class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: number;
     name!: string;
     website!: string;
     address!:string;
    static associate(models:any) {
      // define association here
    }
  };
  Customer.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};