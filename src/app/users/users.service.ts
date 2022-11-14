import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async store(data: CreateUserDto) {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async findOneOrFail(options?: FindOneOptions<UsersEntity>) {
    try {
      return await this.usersRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneOrFail({ where: { id } });

    this.usersRepository.merge(user, data);

    return this.usersRepository.save(user);
  }

  async destroy(id: string) {
    await this.findOneOrFail({ where: { id } });

    this.usersRepository.softDelete({ id });
  }
}
