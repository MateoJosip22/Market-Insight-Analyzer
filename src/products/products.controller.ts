import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('categories')
  getAveragePricePerCategory() {
    return this.productsService.getAveragePriceByCategory();
  }

  @Get('best-rated')
  getBestRatedProduct() {
    return this.productsService.getBestRatedProduct();
  }

  @Get('price-distribution')
  getPriceDistribution() {
    return this.productsService.getPriceDistribution();
  }

  @Get('top3-total')
  getTop3TotalPrice() {
    return this.productsService.getTop3Total();
  }
}