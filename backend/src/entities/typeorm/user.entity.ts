import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique : true })
    username: string

    @Column()
    name: string

    @Column()
    password: string

    @Column({ type : 'datetime', nullable : true })
    lastLogin: Date

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}