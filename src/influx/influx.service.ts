import { Injectable } from '@nestjs/common';
import * as Influx from 'influx'

@Injectable()
export class InfluxService {
  create(schema, data) {
    try {
    const hostname = process.env.INFLUX_HOST
    const port = Number(process.env.INFLUX_PORT)
    const username = process.env.INFLUX_USERNAME
    const password = process.env.INFLUX_PASSWORD
    const db = process.env.INFLUX_DB

    const influx = new Influx.InfluxDB({
      host: hostname,
      port: port,
      username: username,
      password: password,
      database: db,
      schema: schema
    })
      influx
        .writePoints([data])
        .then()
        .catch(err => {
          console.log(err.message)
        })
    } catch (e) {
      console.log(e.message)
    }
  }
}
