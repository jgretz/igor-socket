export enum DataEvents {
  Find = 'Find',
  FindOne = 'FindOne',
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
}

export interface DataArgs {
  type: DataEvents;
  source: string;
  resource: string;
  query?: {
    string: unknown;
  };
  id?: number;
  body?: {
    string: unknown;
  };
}

export interface DataArgsWrapper {
  id: number;
  args: DataArgs;
}
