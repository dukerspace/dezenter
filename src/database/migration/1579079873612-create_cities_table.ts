import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createCitiesTable1579079873612 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'cities',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true
          },
          {
            name: 'province_id',
            type: 'integer'
          },
          {
            name: 'city_name_th',
            type: 'varchar'
          },
          {
            name: 'city_name_en',
            type: 'varchar'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
