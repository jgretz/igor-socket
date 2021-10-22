import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {EntityWithId, EntityWithTimeStamps} from './Types';

export abstract class BaseEntity implements EntityWithId, EntityWithTimeStamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  create_date: Date;

  @Column()
  update_date: Date;
}
