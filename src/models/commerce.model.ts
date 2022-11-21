import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'commerce',
  },
})
export class Commerce {
  @prop({ required: true, unique: true, index: true, lowercase: true, trim: true })
  description!: string
}

const CommerceModel = getModelForClass(Commerce, {  })

export default CommerceModel