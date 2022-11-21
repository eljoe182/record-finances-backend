import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'
import { Commerce } from './commerce.model'
import { Movement } from './movements.model'
import { PurchaseItem } from "./purchaseItem.model"
import { User } from './user.model'
import { Wallet } from './wallet.model'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'purchase',
  }
})
class Purchase {
  @prop({ required: true, ref: () => User })
  userId!: Ref<User>

  @prop({ required: true, ref: () => Commerce })
  commerceId!: Ref<Commerce>

  @prop({ required: true, ref: () => Wallet })
  walletId!: Ref<Wallet>

  @prop({ ref: () => Movement })
  movementId!: Ref<Movement>

  @prop()
  description!: string

  @prop()
  dateInvoice!: Date

  @prop()
  subTotal!: number

  @prop()
  discount!: number

  @prop()
  tax!: number

  @prop()
  net!: number

  @prop()
  total!: number

  @prop({ type: () => [PurchaseItem] })
  items!: Array<PurchaseItem>
}

const PurchaseModel = getModelForClass(Purchase)

export default PurchaseModel
