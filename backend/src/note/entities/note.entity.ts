class Entity {
  constructor(attrs) {
    Object.assign(this, attrs);
  }
}

export class Note extends Entity {
  id: number;
  title: string;
  content: string;
  owner: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastUpdatedBy?: string;
}
