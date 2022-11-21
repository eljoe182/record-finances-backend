import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'products',
  }
})
export class Product {
  @prop({ required: true, index: true, uppercase: true, trim: true })
  description!: string
}

const ProductModel = getModelForClass(Product)

export default ProductModel