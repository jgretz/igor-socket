export type QueryString = {string: unknown};
export type Body = {string: unknown} & object;

export interface ITypeORMService {
  find(query?: {string: unknown}): Promise<Array<unknown>>;
  findOne(id: number): Promise<unknown>;
  create(body: {string: unknown}): Promise<unknown>;
  update(id: number, body: {string: unknown}): Promise<unknown>;
  remove(id: number): Promise<void>;
}

export interface EntityWithId {
  id: number;
}

export interface EntityWithTimeStamps {
  create_date: Date;
  update_date: Date;
}
