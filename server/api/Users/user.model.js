const User = require('./user.schema')
const Schedule =  require('../schedule/schedule.schema')
const express = require('express')
const router = express.Router()
let request = require('request')
var jar = request.jar()
const cheerio = require('cheerio')

request = request.defaults({
  jar: jar,
  followAllRedirects: true
})


module.exports = {

  signup: (req, res) => {
    let cookie = 'JSESSIONID=437CBEA2BE2F88A33ACC39FCF7AA2AEF.vo7; TS01d54a5e=0175b9cb54d434a0c4458b7351e48398ea8328af9f555c6a8e2561a7caafa9c303114ffac2f2bfae04edb12981a604b0c6cb5ffdd30a9a7e6734c7351e5a2c3935cc3386fc; BIGipServerpool_env98_vo_app=656414730.36895.0000; TS01561989_77=088bb9a2b4ab2800278b35d52b37a5dcc971045cc920df998a28a308439e308d18e8439dfc14febe34c0e6c1423b543b0892b9bf62823800a67dd983915d332d8da8ef4166bfdb8ea1f50f53880581998b29a3843a95823eb50e7bddc6cc210b059a95e3ad5a7b85807e09480abfe68f; TS01561989=0175b9cb546ea6014d4794c80884bd729d425b7fee9ab809247fb760ec8af9f2730169ba557875f22beb2334655d644cac4553d079'
    let url = 'https://www.breeze.ca.gov/datamart/searchByLicNumber.do'
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
        'licNumber': req.body.nailCertification,
        'pageSize': '5',
        'search': 'Search'
      }
    }
    request.post(options, (err, resp, body) => {
      if (err) {
        console.log(err)
      }
      let $ = cheerio.load(resp.body)
      let response = resp.body
      let dataView = $('.dataView')

      let dataViewLast = dataView.last().text()
      console.log('Result from CHEERIO: ', dataViewLast)
      let nailLicense = Number(req.body.nailCertification)
      //console.log(Number(dataViewLast) === nailLicense)
    })
    
    User
        .create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          isVendor: req.body.isVendor,
          nailCertification: req.body.nailCertification
        })
        .then((user) => {
          if(user.isVendor===1){
              console.log("inside is vendor create schedule")
              Schedule.create({
              userId: user.id,
              day: "Sunday",
              start: "09:00:00",
              end: "17:00:00"
          })
          .then(schedule => {
            Schedule.create({
            userId: user.id,
            day: "Monday",
            start: "09:00:00",
            end: "17:00:00"
            })
            .then(schedule => {
              Schedule.create({
                userId: user.id,
                day: "Sunday",
                start: "09:00:00",
                end: "17:00:00"
              })
              .then(schedule => {
                Schedule.create({
                  userId: user.id,
                  day: "Tuesday",
                  start: "09:00:00",
                  end: "17:00:00"
                })
                .then(schedule => {
                  Schedule.create({
                    userId: user.id,
                    day: "Wednesday",
                    start: "09:00:00",
                    end: "17:00:00"
                  })
                  .then(schedule => {
                    Schedule.create({
                      userId: user.id,
                      day: "Thursday",
                      start: "09:00:00",
                      end: "17:00:00"
                    })
                    .then(schedule => {
                      Schedule.create({
                        userId: user.id,
                        day: "Friday",
                        start: "09:00:00",
                        end: "17:00:00"
                      })
                      .then(schedule => {
                        Schedule.create({
                          userId: user.id,
                          day: "Saturday",
                          start: "09:00:00",
                          end: "17:00:00"
                        })
                        .then(schedule => {
                          res.send(schedule)
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        }  else {
          res.send(user)

        console.log('USER: ', user)

        })
  },
  login: (req, res) => {
    User
      .findOne({where: {userName: req.body.userName, password: req.body.password}})
      .then((user) => {
        res.json(user)
      })
      .catch((err) => {
        if (err) {
          console.log('Error in login: ', err)
        }
      })
  },
  updateProfile: (req, res) => {
    User
      .findOne({where: {userName: req.body.userName}})
      .then((user) => {
        console.log('user: ', user)
        if (user) {
          user
            .updateAttributes({
              isVendor: req.body.isVendor,
              profile_image_url: req.body.profile_image_url,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: req.body.password,
              phoneNumber: req.body.phoneNumber,
              userName: req.body.userName,
              general_rating: req.body.general_rating,
              nailCertification: req.body.nailCertification,
              houseNumber: req.body.houseNumber,
              streetName: req.body.streetName,
              unitType: req.body.unitType,
              city: req.body.city,
              state: req.body.state,
              zipCode: req.body.zipCode,
              latitude: req.body.latitude,
              longitude: req.body.longitude
            })
        }
        res.send(user)
      })
      .catch((err) => {
        if (err) {
          console.log('Error in PUT: ', err)
        }
      })
  }
}



