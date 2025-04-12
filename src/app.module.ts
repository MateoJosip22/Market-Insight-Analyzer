import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/market-insight-analyzer'), // connect to MongoDB
    ScheduleModule.forRoot(), // Enable cron job scheduling
    ProductsModule,
  ],
})
export class AppModule {}