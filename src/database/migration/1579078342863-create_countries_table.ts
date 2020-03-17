import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createCountriesTable1579078342863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'countries',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true
          },
          {
            name: 'country_name_th',
            type: 'varchar'
          },
          {
            name: 'country_name_en',
            type: 'varchar'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
