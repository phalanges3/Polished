const express = require('express')
const router = express.Router()
let request = require('request')
var jar = request.jar()

const cheerio = require('cheerio')

request = request.defaults({
  jar: jar,
  followAllRedirects: true
})


let cookie = 'JSESSIONID=F9A0C0837AFBE726FE694F9F888D2759.vo8; TS01d54a5e=0175b9cb54625a09b5e21995c4a61188dc41964ad811514ced4c61de1e28cff2c8c72f22062a63b9cbbe8aa48987c22c28e7d25847507563bd5a4b061de9318388e415affc; BIGipServerpool_env98_vo_app=673191946.36895.0000; TS01561989_77=088bb9a2b4ab28000f3b95531cfe58e221be451b9c77e7361f63bbdd3fdef8c2a38224960c3a98468e70fca6b8dd602008ad5576a2823800138cb1a897dd28da21044ba089daa58a2d371234e24921fc2aa2595a74048cb91dd0cdb9bd433150ae23d58ec92accef8ba3a4cfe62740a7; TS01561989=0175b9cb5413b660d021b0f7def8c499e73fdd106c11514ced4c61de1e28cff2c8c72f2206170a376b3ae627a09da58cc71233e47b'
let url = 'https://www.breeze.ca.gov/datamart/searchByLicNumber.do'
let $ = cheerio.load
let options = {
  url: url,
  headers: {
    'Cookie': cookie
  },
  form: {
    'searchType': '',
    'selector': 'false',
    'boardId': '100',
    'licTypeId': '1005',
    'licNumber': '55',
    'pageSize': '5',
    'search': 'Search'
  }
}
request.post(options, (err, resp, body) => {
  if (err) {
      console.log(err)
    }
    let response = resp.body
    
  console.log('This is resp: ', resp.body)

})



module.exports = router
