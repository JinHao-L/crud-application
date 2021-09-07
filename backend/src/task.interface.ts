export interface Task {
  id: number;
  title: string;
  details?: string;
  deadline?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
