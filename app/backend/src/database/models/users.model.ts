import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class modelUsers extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
  // usando ! para avisar o typeScript que o valor irá vir
}

modelUsers.init({
  // propriedades oriundas da migration
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default modelUsers;
