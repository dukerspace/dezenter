import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createProvincesTable1579078350940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'provinces',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true
          },
          {
            name: 'country_id',
            type: 'integer'
          },
          {
            name: 'province_name_th',
            type: 'varchar'
          },
          {
            name: 'province_name_en',
            type: 'varchar'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
