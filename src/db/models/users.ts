import {
  AllowNull,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Unique,
  Model,
  Validate,
  Length,
  Default
} from "sequelize-typescript";
@Table({
  timestamps: true,
  tableName: "users",
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    { fields: ["name"] },
    { fields: ["email"], unique: true },
    { fields: ["username"], unique: true }
  ]
})
export class Users extends Model {
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  user_id: string;

  @Unique({ name: "email", msg: "Email already exists." })
  @Validate({
    notEmpty: { msg: "Email is required." },
    isEmail: { msg: "Email isn't a valid email." }
  })
  @Column(DataType.STRING)
  email: string;

  @Unique({ name: "user_name", msg: "Username already exists." })
  @Column(DataType.STRING)
  username: string;

  @Length({ min: 6, msg: "Password must be at least 6 characters" })
  @Validate({ notEmpty: { msg: "Password is required." } })
  @Column(DataType.STRING)
  password: string;
}
