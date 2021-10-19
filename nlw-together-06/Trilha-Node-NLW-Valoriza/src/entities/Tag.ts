import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Expose } from 'class-transformer';

import { v4 as uuid } from 'uuid';

@Entity('tags')
class Tag {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @Expose({ name: 'name_custom' })
  nameCustom(): string {
    return `#${this.name}`;
  }

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Tag };
