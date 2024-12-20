import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true })
  chat_id: bigint;

  @Prop()
  username: string;

  @Prop()
  baseName: string;

  @Prop({ enum: ['SMART', 'NORMAL'] })
  WalletType: string;

  @Prop()
  smartWalletAddress: string;

  @Prop()
  walletAddress: string;

  @Prop()
  walletDetails: string;

  @Prop()
  defaultWalletDetails: string;

  @Prop()
  pin: string;

  @Prop({ default: false })
  testnetAirtimeBonus: boolean;

  @Prop()
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
