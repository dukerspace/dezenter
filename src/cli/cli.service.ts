import { Injectable } from '@nestjs/common'
import { Console, Command } from 'nestjs-console'
import { CountryConsoleService } from './country/country.service'

@Injectable()
@Console({
  name: 'seeder',
  description: 'A command to create an item'
})
export class CliService {

  constructor(
    private readonly countryService: CountryConsoleService
  ) {}

  @Command({
    command: 'file <name>',
    description: 'Create a file'
  })
  async createFile(name: string) {
    console.log(`Creating a file named ${name}`)
    // your code...
    // this.countryService.insertData()
  }

}
