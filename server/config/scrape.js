// const express = require('express')
// const router = express.Router()
// let request = require('request')
// var jar = request.jar()

// const cheerio = require('cheerio')

// request = request.defaults({
//   jar: jar,
//   followAllRedirects: true
// })

// let cookie = 'JSESSIONID=FD3AFAD0900A43E9C998DD48F663A551.vo7; TS01d54a5e=0175b9cb54127cd1d2f3c39aeeca7f6fc7491d9a4d555c6a8e2561a7caafa9c303114ffac2f2bfae04edb12981a604b0c6cb5ffdd32042fead6d94a7b8642b91b8bb93356e; BIGipServerpool_env98_vo_app=656414730.36895.0000; TS01561989=0175b9cb5410a9a23cae8eb6b14cc8aef02b4cc7b08d6c8e2024f5c143441ea16b338f2f120c818dc585a441c44ffafd7fa11a900f; TS01561989_77=088bb9a2b4ab2800dbe0fdbb3840f7fe20c06bb2d802a712e70cfe3052e4716574d51be20576b283f655a4f4dacc31c50824add88482380040f863ca710dca77a78258bae44b2ad1d6f013499245b109f24dbe1aba833fba6cb34146eb3a37e5594a9a366698d67a3bde783d1defc733'
// let url = 'https://www.breeze.ca.gov/datamart/searchByLicNumber.do'
// let options = {
//   url: url,
//   headers: {
//     'Cookie': cookie
//   },
//   form: {
//     'searchType': '',
//     'selector': 'false',
//     'boardId': '100',
//     'licTypeId': '1005',
//     'licNumber': '55',
//     'pageSize': '5',
//     'search': 'Search'
//   }
// }
// request.post(options, (err, resp, body) => {
//   if (err) {
//     console.log(err)
//   }
//   let $ = cheerio.load(resp.body)
//   let response = resp.body
//   let dataView = $('.dataView')

//   let dataViewLast = dataView.last().text()
//   console.log('Result from CHEERIO: ', dataViewLast)

//   console.log(Number(dataViewLast) === 55)

// })

// module.exports = router
