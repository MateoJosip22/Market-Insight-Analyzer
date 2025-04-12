// The schema code was generated with AI, as the task involved repetitive work. 
// I have just started studying database structures in college and wanted to ensure that the schema implementation is correct and functional. 
// As per the CEO's approval, AI-assisted code generation was used to expedite the process while ensuring the system works as intended I hope this is not an issue :) .


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  image: string;

  @Prop({
    type: {
      rate: Number,
      count: Number,
    },
    _id: false,
  })
  rating: {
    rate: number;
    count: number;
  };

  @Prop({ default: Date.now })
  fetchedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
