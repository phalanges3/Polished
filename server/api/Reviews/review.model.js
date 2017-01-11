const Review = require('./review.schema')

module.exports = {

  addReview: (req, res) => {
    Review
        .create({
          userId: req.body.userId,
          reviewed_first: req.body.reviewed_first,
          reviewed_last: req.body.reviewed_last,
          reviewer_first: req.body.reviewer_first,
          reviewer_last: req.body.reviewer_last,
          reviewer_id: req.body.reviewer_id,
          reviewer_profile_pic: req.body.reviewer_profile_pic,
          rating: req.body.rating,
          review_content: req.body.review_content,
          review_date: req.body.review_date,
          image1: req.body.image1,
          image2: req.body.image2,
          image3: req.body.image3
        })
        .then((review) => {
          res.send(review)
        })
  },
  getReviews: (req, res) => {
    Review
      .findAll({
        where: {
          userId: req.body.userId
        }
      })
      .then((review) => {
        res.send(review)
      })
      .catch((err) => {
        if (err) {
          console.log('Error in login: ', err)
        }
      })
  },
  getOneReview: (req, res) => {
    Review
      .findOne({where: {userId: req.body.userId}})
      .then((review) => {
        res.send(review)
      })
      .catch((err) => {
        if (err) {
          console.log('Error in login: ', err)
        }
      })
  },
  updateReview: (req, res) => {
    Review
      .findOne({where: {userId: req.body.userId}})
      .then((review) => {
        if (review) {
          review
            .updateAttributes({
              reviewed_first: req.body.reviewed_first,
              reviewed_last: req.body.reviewed_last,
              reviewer_first: req.body.reviewer_first,
              reviewer_last: req.body.reviewer_last,
              reviewer_id: req.body.reviewer_id,
              reviewer_profile_pic: req.body.reviewer_profile_pic,
              rating: req.body.rating,
              review_content: req.body.review_content,
              image1: req.body.image1,
              image2: req.body.image2,
              image3: req.body.image3
            })
        }
        res.send(review)
      })
      .catch((err) => {
        if (err) {
          console.log('Error in PUT: ', err)
        }
      })
  },

  seedReviews: (req, res) => {

    //Seeding Reviews for nail artist: Josh Pace

    Review
        .create({
          userId: 1,
          reviewed_first: "Josh",
          reviewed_last: "Pace",
          reviewer_first: "Jose",
          reviewer_last: "Cuchilla",
          reviewer_id: 4,
          reviewer_profile_pic: "http://www.sociology.ucla.edu/sites/default/files/u236/cuchilla.jpg", 
          rating: 490,
          review_content: "Josh is awesome at his job. He is punctual and really friendly! Would repeat!",
          review_date: "Fri Jul 06 2016",
          image1: "https://s-media-cache-ak0.pinimg.com/236x/cd/a7/6a/cda76a85b61ab9050856e63469ccf1f5.jpg",
          image2: null,
          image3: null
        })
        .then((review) => {
          console.log('User created: ', review)
        })
    
    Review
        .create({
          userId: 1,
          reviewed_first: "Josh",
          reviewed_last: "Pace",
          reviewer_first: "Jackie",
          reviewer_last: "Feiler",
          reviewer_id: 9,
          reviewer_profile_pic: "http://vignette1.wikia.nocookie.net/seinfeld/images/7/76/George-costanza.jpg/revision/latest?cb=20110406222711",
          rating: 400,
          review_content: "He was very friendly and did a great job. He is also super punctual! Would repeat!",
          review_date: "Fri Aug 06 2016",
          image1: "http://bestartnails.com/wp-content/uploads/2016/03/nail-art-1382-250x250.jpg",
          image2: null,
          image3: null
        })
        .then((review) => {
          console.log('User created: ', review)
        })

    Review
        .create({
          userId: 1,
          reviewed_first: "Josh",
          reviewed_last: "Pace",
          reviewer_first: "Riley",
          reviewer_last: "James",
          reviewer_id: 16,
          reviewer_profile_pic: "http://www.watch-id.com/sites/default/files/upload/sighting/Breitling-watch-Jerry-Seinfeld-2.jpg",
          rating: 480,
          review_content: "Wow, Josh is really really awesome at his job. He is punctual and really friendly! Would repeat!",
          review_date: "Fri Sept 06 2016",
          image1: "http://nailartstyle.com/wp-content/uploads/2016/06/25-acrylic-matte-nails-600x525.jpg?x97692",
          image2: null,
          image3: null
        })
        .then((review) => {
          console.log('User created: ', review)
        })

    Review
        .create({
          userId: 1,
          reviewed_first: "Josh",
          reviewed_last: "Pace",
          reviewer_first: "Jacqueline",
          reviewer_last: "Feiler",
          reviewer_id: 15,
          reviewer_profile_pic: "https://upload.wikimedia.org/wikipedia/en/3/33/Elaine-benes-3707.jpg",
          rating: 300,
          review_content: "Really really enjoyed my nails. Josh is awesome at his job. He is punctual and really friendly! Would repeat!",
          review_date: "Fri Oct 06 2016",
          image1: "http://www.weddingelation.com/wp-content/uploads/2014/11/unique-wedding-nail-design-7-striking-ideas-3.png",
          image2: null,
          image3: null
        })
        .then((review) => {
          console.log('User created: ', review)
        })
      
  }


}

