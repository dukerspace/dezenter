import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { Province } from '../province/province.entity'
import { Place } from '../../place/place.entity'

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    type => Province,
    province => province.city
  )
  @JoinColumn({ name: 'province_id' })
  province: Province

  @Column()
  city_name_th: string

  @Column()
  city_name_en: string

  @OneToMany(
    type => Place,
    Place => Place.city
  )
  @JoinColumn()
  place: Place
}
