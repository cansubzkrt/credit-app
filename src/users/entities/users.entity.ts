// src/users/entities/user.entity.ts
import { Credits } from '../../credits/entities/credits.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar'})
  firstName: string;

  @Column({ type: 'varchar'})
  lastName: string;

  @OneToMany(() => Credits, (credit) => credit.user)
  credits: Credits[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
