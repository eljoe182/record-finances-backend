import { prop, getModelForClass, modelOptions, pre } from "@typegoose/typegoose";
import { comparePassword } from './methods/user.methods.model';
import { encryptPassword, encryptPasswordUpdateOne } from './middleware/user.middleware.model';

@pre<User>("save", encryptPassword)
@pre<User>("updateOne", encryptPasswordUpdateOne)
@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'user',
  }
})
export class User {
  @prop({ required: true, unique: true, index: true, lowercase: true, trim: true })
  username!: string;

  @prop({ required: true })
  password!: string;

  @prop({ required: true, unique: true, index: true, lowercase: true, trim: true })
  email!: string;

  @prop({ required: true, default: true })
  active!: boolean;

  @prop()
  resetPasswordToken!: string;

  @prop()
  resetPasswordExpires!: Date;

  comparePassword(value: string): boolean {
    return comparePassword(value, this.password);
  }
}

const UserModel = getModelForClass(User);

export default UserModel;