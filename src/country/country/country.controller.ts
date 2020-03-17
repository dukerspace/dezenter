import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common'
import { CountryService } from './country.service'

const site = `${process.env.SERVICE_HOSTNAME}:${process.env.SERVICE_PORT}`

@Controller('/v1/countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/')
  async index() {
    return {
      success: true,
      data: 'ok'
    }
  }

  @Post()
  async create() {}

  @Get(':id')
  async show(@Param('id') id) {
    const result = await this.countryService.find(id)
    return {
      success: true,
      data: this.transformer(result)
    }
  }
  @Get(':id/provinces')
  async showWithProvince(@Param('id') id) {
    const result = await this.countryService.findWithProvince(id)
    return {
      success: true,
      data: this.transformer(result)
    }
  }

  @Put(':id')
  async update(@Param('id') id) {}

  @Delete()
  async delete() {}

  transformer(data) {
    return {
      id: data.id,
      country_name_th: data.country_name_th,
      country_name_en: data.country_name_en,
      url: `${site}/air/v1/countries/${data.id}`
    }
  }

  transformerWithProvince(data) {
    return {
      id: data.id,
      country_name_th: data.country_name_th,
      country_name_en: data.country_name_en,
      url: `${site}/air/v1/countries/${data.id}`,
      provinces: data.provinces
    }
  }
}
