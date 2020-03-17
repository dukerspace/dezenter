import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { City } from '../country/city/city.entity'

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  place_name_th: string

  @Column()
  place_name_en: string

  @Column()
  lat: number

  @Column()
  long: number

  @ManyToOne(
    type => Place,
    place => place.city
  )
  @JoinColumn({ name: 'city_id' })
  city: City

  @Column()
  last_updated: 'timestamp with time zone'

  @CreateDateColumn()
  created_at: 'timestamp with time zone'

  @UpdateDateColumn()
  updated_at: 'timestamp with time zone'
}
