export class Note extends Object {
  id: number;
  title: string;
  content: string;
  owner: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastUpdatedBy?: string;
}
