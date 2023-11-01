// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar'})
  firstName: string;

  @Column({ type: 'varchar'})
  lastName: string;

  @Column({ type: 'timestamp'})
  createdAt: Date;

  @Column({ type: 'timestamp'})
  updatedAt: Date;
}
