import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Memo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  test: string;

  @Column('text')
  test2: string;

  @Column('text')
  test3: string;
}
