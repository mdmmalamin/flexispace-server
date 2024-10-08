import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { capitalize } from './user.utils';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not a valid user!',
      },
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

//? Pre-save hook to automatically capitalize the name before saving
//?hashing password and save into DB
userSchema.pre('save', async function (next) {
  if (this.isModified('name')) {
    this.name = capitalize(this.name);
  }

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

//? Is User Exist
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

//? Is Password Correct
userSchema.statics.isPasswordCorrect = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

//? Is JWT Issued Before Password Changed
userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangeTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangeTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);

// User Model:
// name: The name of the user.
// email: The contact email address.
// password: The account password.
// phone: The contact phone number.
// address: The physical address.
// role: The role of the user, can be user or admin.
