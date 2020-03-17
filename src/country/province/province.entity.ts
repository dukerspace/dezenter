import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import { Country } from '../country/country.entity'
import { City } from '../city/city.entity'

@Entity('provinces')
export class Province {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    type => Country,
    country => country.provinces
  )
  @JoinColumn({ name: 'country_id' })
  country: Country

  @Column()
  province_name_th: string

  @Column()
  province_name_en: string

  @OneToMany(
    type => City,
    city => city.province
  )
  @JoinColumn()
  city: City
}
