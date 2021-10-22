import {Injectable} from '@nestjs/common';
import {DeepPartial, Repository} from 'typeorm';

import {ITypeORMService, QueryString, Body, EntityWithId, EntityWithTimeStamps} from './Types';

@Injectable()
export abstract class TypeORMService<
  Entity extends EntityWithId & EntityWithTimeStamps,
  QueryDto extends QueryString,
  CreateDto extends Body & DeepPartial<Entity>,
  UpdateDto extends Body & DeepPartial<Entity>,
> implements ITypeORMService
{
  constructor(private repository: Repository<Entity>) {}

  find(query?: QueryDto): Promise<Array<Entity>> {
    return this.repository.find({
      where: query,
    });
  }

  findOne(id: number): Promise<Entity> {
    return this.repository.findOne(id);
  }

  create(body: CreateDto): Promise<Entity> {
    return this.repository.save({
      ...body,
      create_date: new Date(),
      update_date: new Date(),
    });
  }

  async update(id: number, body: UpdateDto): Promise<Entity> {
    const obj = await this.repository.findOne(id);
    for (const prop in obj) {
      obj[prop as string] = body[prop];
    }
    obj.update_date = new Date();

    return this.repository.save(obj as unknown as DeepPartial<Entity>);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
