import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'
import { Wallet } from './wallet.model'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'movements',
  }
})
export class Movement {
  @prop({ required: true, ref: () => Wallet })
  walletId!: Ref<Wallet>

  @prop({ required: true })
  type!: string
  
  @prop({ required: true })
  originId!: string
  
  @prop({ required: true })
  debit!: number
  
  @prop({ required: true })
  credit!: number
}

const MovementModel = getModelForClass(Movement)

export default MovementModel