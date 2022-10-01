import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'certong',
      brand: 'Apple',
      flavors: ['AAA', 'BBB'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    const coffee = this.coffees.find((i) => i.id === id);

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  update(id: number, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);

    if (existingCoffee) {
      // Update coffee here
    }
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((i) => i.id === +id);

    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex);
    }
  }
}
