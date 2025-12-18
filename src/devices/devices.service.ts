import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepo: Repository<Device>,
  ) {}

  create(data: any) {
    const device = this.deviceRepo.create(data);
    return this.deviceRepo.save(device);
  }

  findAll() {
    return this.deviceRepo.find();
  }

  findOne(id: number) {
    return this.deviceRepo.findOneBy({ id });
  }

  remove(id: number) {
    return this.deviceRepo.delete(id);
  }
}