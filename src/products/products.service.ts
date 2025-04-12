// The following code includes a cron job to fetch product data every minute from a public API, and the implementation has been assisted with AI tools 
// for efficiency, as the task involved repetitive actions such as setting up API calls, handling the responses, and saving data into the database.
// I have just started learning about cron jobs and database interactions in college and wanted to ensure the functionality is correct while optimizing 
// I made sure to add meaningful comments to demonstrate my understanding of the logic.

// This cron job runs every minute (*/60 * * * * *), fetching products from the FakeStore API and storing them in the MongoDB database if they don't already exist.
// It checks for each product's existence based on its unique ID and, if it's new, saves it in the database along with details like title, price, description, etc.


import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';


@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  // Cron job that fetches product data from the FakeStore API every minute.
  @Cron('*/60 * * * * *')
  async fetchProductsFromAPI() {
    this.logger.log('Cronjob gestartet: Produkte abrufen...');
    try {
      // Making an API request to fetch product data.
      const response = await axios.get(this.apiUrl);
      const products = response.data;

      // Iterating through each product to check if it already exists in the database.
      for (const product of products) {
        const exists = await this.productModel.exists({ id: product.id });
        if (!exists) {
          // If the product doesn't exist, create a new entry in the database.
          await this.productModel.create({
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: product.rating,
            fetchedAt: new Date(),
          });
          this.logger.log(`Produkt ${product.title} gespeichert.`);
        }
      }
    } catch (error) {
      // Handling any errors that occur during the API request.
      this.logger.error('Fehler beim Abrufen der Produkte:', error.message);
    }
  }

  findAll() {
    return this.productModel.find().exec();
  }

  // Function to calculate and return the average price of products per category.
  async getAveragePriceByCategory() {
    return this.productModel.aggregate([
      { $group: { _id: '$category', avgPrice: { $avg: '$price' } } },
    ]);
  }

  // Function to fetch the best-rated product.
  async getBestRatedProduct() {
    return this.productModel.findOne().sort({ 'rating.rate': -1 }).limit(1);
  }

  // Function to calculate the median and standard deviation of product prices.
  async getPriceDistribution() {
    const prices = (await this.productModel.find({}, { price: 1, _id: 0 })).map(p => p.price);
    if (!prices.length) return { median: 0, stdDev: 0 };
    const mean = prices.reduce((a, b) => a + b) / prices.length;
    const variance = prices.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);
    const sorted = prices.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
    return { median, stdDev };
  }

  // Function to get the total price of the top 3 most expensive products.
  async getTop3Total() {
    const top3 = await this.productModel.find().sort({ price: -1 }).limit(3);
    const total = top3.reduce((sum, p) => sum + p.price, 0);
    return { total };  
  }
}