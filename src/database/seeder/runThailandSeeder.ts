// import { createConnection } from 'typeorm'
// import { CountryRepository, ProvinceRepository, CityRepository } from '../../repositories'
// import addressJson from '../../assets/ThailandLocation.json'

// class RunThailand {
//   addresses: []
//   constructor() {
//     this.run()
//   }
//   public async run() {
//     console.log('Seeding.')
//     await this.insert()
//     console.log('Seeded.')
//   }
//   public async insert() {
//     try {
//       await createConnection()
//         .then(async connection => {
//           console.log('Database connected.')
//         })
//         .catch(error => console.log('Database connection error: ', error))

//       const countryData = {
//         country_name_th: 'ประเทศไทย',
//         country_name_en: 'Thailand'
//       }

//       const country = new CountryRepository()
//       const getCountry = await country.create(countryData)
//       for (const p in addressJson) {
//         const provinceNameTH = addressJson[p].PROVINCE_NAME
//         const provinceNameEN = addressJson[p].PROVINCE_NAME_ENG

//         const provinceData = {
//           country: getCountry.id,
//           province_name_th: provinceNameTH,
//           province_name_en: provinceNameEN
//         }
//         const province = new ProvinceRepository()
//         const getProvince = await province.create(provinceData)
//         for (const a in addressJson[p].amphurs) {
//           const cityNameTH = addressJson[p].amphurs[a].AMPHUR_NAME
//           const cityNameEN = addressJson[p].amphurs[a].AMPHUR_NAME_ENG

//           const cityData = {
//             province: getProvince.id,
//             city_name_th: cityNameTH,
//             city_name_en: cityNameEN
//           }
//           const city = new CityRepository()
//           await city.create(cityData)
//         }
//       }
//     } catch (e) {
//       console.log('error', e.message)
//     }
//   }
// }

// export default new RunThailand()
