import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Credits } from '../../credits/entities/credits.entity';

@Entity('installments')
export class Installments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'integer' })
    status: number;

    @ManyToOne(() => Credits, (credit) => credit.installments)
    @JoinColumn({ name: 'creditId' })
    creditId: number;

    @Column({ type: 'date' })
    dueDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
