import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Installments } from '../../installments/entites/installments.entity';

@Entity('credits')
export class Credits {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    status: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @ManyToOne(() => Users, (user) => user.credits)
    user: Users;

    @Column()
    userId: number;

    @OneToMany(() => Installments, (installment) => installment.creditId)
    installments: Installments[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
