import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createPlacesTable1579075749414 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'places',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true
          },
          {
            name: 'place_name_th',
            type: 'varchar'
          },
          {
            name: 'place_name_en',
            type: 'varchar'
          },
          {
            name: 'lat',
            type: 'decimal'
          },
          {
            name: 'long',
            type: 'decimal'
          },
          {
            name: 'city_id',
            type: 'integer'
          },
          {
            name: 'last_updated',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
