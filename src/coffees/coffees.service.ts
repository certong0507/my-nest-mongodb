import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}

  findAll() {
    return this.coffeeModel.find().exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();

    if (!coffee) {
      throw new NotFoundException(`Coffee #id ${id} not found`);
    }

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);

    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findByIdAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #id ${id} not found`);
    }

    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();

    return coffee.remove();
  }
  // private coffees: Coffee[] = [
  //   {
  //     id: 1,
  //     name: 'certong',
  //     brand: 'Apple',
  //     flavors: ['AAA', 'BBB'],
  //   },
  // ];

  // findAll() {
  //   return this.coffees;
  // }

  // findOne(id: number) {
  //   const coffee = this.coffees.find((i) => i.id === id);

  //   if (!coffee) {
  //     throw new NotFoundException(`Coffee #${id} not found`);
  //   }

  //   return coffee;
  // }

  // update(id: number, updateCoffeeDto: any) {
  //   const existingCoffee = this.findOne(id);

  //   if (existingCoffee) {
  //     // Update coffee here
  //   }
  // }

  // create(createCoffeeDto: any) {
  //   this.coffees.push(createCoffeeDto);
  // }

  // remove(id: string) {
  //   const coffeeIndex = this.coffees.findIndex((i) => i.id === +id);

  //   if (coffeeIndex >= 0) {
  //     this.coffees.splice(coffeeIndex);
  //   }
  // }
}
