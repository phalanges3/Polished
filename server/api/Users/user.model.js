const User = require('./user.schema')
const Schedule = require('../schedule/schedule.schema')
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
    let cookie = 'JSESSIONID=A84B0F3BC619487975636236BB654B3B.vo7; TS01d54a5e=0175b9cb54bfb8d3e11c71c3956e301747d81887ebbddc9e3bb9ddfb6a74afebb53954b8b578aa6edb46c9fd9d588ac19e976ebac0b51dd3f6b122783114a8845cd7b864b8; BIGipServerpool_env98_vo_app=656414730.36895.0000; TS01561989_77=088bb9a2b4ab2800f87bd3cf5946e787375868d84e5fd35966e1c6d143269b652c163a4ba81e9b8ba6490d5f8c7346d4086d153d9e823800604e57e61c1ff48108084adceb4683c1bd02eee9946d88a1c137ab2ef25ec6a9bc16c83eea23cc74e3bca58fa5f34b1fec278d998e9c80ab; TS01561989=0175b9cb54af4e3a2a2bcbc0816841b83501ded6babddc9e3bb9ddfb6a74afebb53954b8b52a9c63d9d1098991f4491c20bbc5c9fc'
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
      // console.log(Number(dataViewLast) === nailLicense)
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
          if (user.isVendor === 1) {
            console.log('inside is vendor create schedule')
            Schedule.create({
              userId: user.id,
              day: 'Sunday',
              start: '09:00:00',
              end: '17:00:00'
            })
          .then(schedule => {
            Schedule.create({
              userId: user.id,
              day: 'Monday',
              start: '09:00:00',
              end: '17:00:00'
            })
            .then(schedule => {
              Schedule.create({
                userId: user.id,
                day: 'Sunday',
                start: '09:00:00',
                end: '17:00:00'
              })
              .then(schedule => {
                Schedule.create({
                  userId: user.id,
                  day: 'Tuesday',
                  start: '09:00:00',
                  end: '17:00:00'
                })
                .then(schedule => {
                  Schedule.create({
                    userId: user.id,
                    day: 'Wednesday',
                    start: '09:00:00',
                    end: '17:00:00'
                  })
                  .then(schedule => {
                    Schedule.create({
                      userId: user.id,
                      day: 'Thursday',
                      start: '09:00:00',
                      end: '17:00:00'
                    })
                    .then(schedule => {
                      Schedule.create({
                        userId: user.id,
                        day: 'Friday',
                        start: '09:00:00',
                        end: '17:00:00'
                      })
                      .then(schedule => {
                        Schedule.create({
                          userId: user.id,
                          day: 'Saturday',
                          start: '09:00:00',
                          end: '17:00:00'
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
          } else {
            res.send(user)
          }

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

