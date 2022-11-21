import { prop, modelOptions, Ref } from '@typegoose/typegoose'
import { Product } from './products.model'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    _id: false,
  }
})
export class PurchaseItem {
  @prop({ required: true, ref: () => Product })
  productId!: Ref<Product>

  @prop({ required: true })
  quantity!: number

  @prop({ required: true })
  price!: number

  @prop({ required: true, default: 0 })
  discount!: number

  @prop({ required: true })
  total!: number
}