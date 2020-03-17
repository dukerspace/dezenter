import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createDataTypesTable1579075751121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'data_types',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true
          },
          {
            name: 'type_name',
            type: 'varchar'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
