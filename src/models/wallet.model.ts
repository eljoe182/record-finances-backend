import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'wallet',
  }
})
export class Wallet {
  @prop({ required: true, ref: () => User })
  userId!: Ref<User>

  @prop({ required: true, default: 0 })
  balance!: number

  @prop({ required: true, trim: true })
  description!: string
}

const WalletModel = getModelForClass(Wallet)

export default WalletModel
