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
    // Seeding Reviews for nail artist: Josh Pace
    Review
        .create({
          userId: 3,
          reviewed_first: 'George',
          reviewed_last: 'Castanza',
          reviewer_first: 'Mary',
          reviewer_last: '',
          reviewer_id: 56,
          reviewer_profile_pic: 'https://deecrowseer.files.wordpress.com/2014/11/seinf-s2-mr01.jpg',
          rating: 2,
          review_content: 'Three years after George promised to do my nails, he finally called me to schedule an appointment!',
          review_date: 'Fri Jul 06 2016',
          image1: 'http://images.gonetrendy.com/galaxy-nail-art9.JPG',
          image2: null,
          image3: null
        })
        .then((review) => {
          console.log('User created: ', review)
        })

    Review
        .create({
          userId: 3,
          reviewed_first: 'George',
          reviewed_last: 'Castanza',
          reviewer_first: 'Soup',
          reviewer_last: 'Nazi',
          reviewer_id: 16,
          reviewer_profile_pic: 'http://screencrush.com/442/files/2012/04/soup-nazi.jpg',
          rating: 2,
          review_content: 'George was late for our appointment!',
          review_date: 'Fri Aug 06 2016',
          image1: 'http://www.nailartdesigns20.com/wp-content/uploads/2015/09/Halloween-nailart-jack-o-lanterns-blocks-Nailart.jpg',
          image2: null,
          image3: null
        })
        .then((review) => {
          console.log('User created: ', review)
        })

    Review
        .create({
          userId: 3,
          reviewed_first: 'George',
          reviewed_last: 'Castanza',
          reviewer_first: 'Morty',
          reviewer_last: 'Seinfeld',
          reviewer_id: 16,
          reviewer_profile_pic: 'https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAALsAAAAJDhjNzY1OGI4LTI3NTgtNDFlZi04MDFiLTI0YTVmZDZkY2UxMA.png',
          rating: 4,
          review_content: 'My sons friend George is a wonderful nail artist! Book him, you wont regret it!',
          review_date: 'Fri Sept 06 2016',
          image1: 'https://www.askideas.com/media/68/Blue-Glitter-French-Tip-Nail-Art-With-White-Flowers-Design.jpg',
          image2: null,
          image3: null
        })
        .then((review) => {
          console.log('User created: ', review)
        })

    Review
        .create({
          userId: 3,
          reviewed_first: 'George',
          reviewed_last: 'Castanza',
          reviewer_first: 'Newman',
          reviewer_last: '',
          reviewer_id: 104,
          reviewer_profile_pic: 'http://cbsnews3.cbsistatic.com/hub/i/r/2013/05/14/d47592d1-c3c9-11e2-a43e-02911869d855/resize/620x465/8f1e1aeb9bd7a994fdbfb86557a7b233/010_Newman_old.png',
          rating: 1,
          review_content: 'Geeeeeeorge! Horrible nail artist and horrible person! Mark my words, Seinfeld! Your day of reckoning is coming when an evil wind will blow through your little play world and wipe that smug smile off your face!!',
          review_date: 'Fri Oct 06 2016',
          image1: 'https://s-media-cache-ak0.pinimg.com/736x/7b/66/6f/7b666f9bf52b81c0774938065969cebc.jpg',
          image2: null,
          image3: null
        })
        .then((review) => {
          console.log('User created: ', review)
        })

      Review
        .create({
          userId: 3,
          reviewed_first: 'George',
          reviewed_last: 'Castanza',
          reviewer_first: 'Jackie',
          reviewer_last: 'Chiles',
          reviewer_id: 16,
          reviewer_profile_pic: 'http://media-cache-ak0.pinimg.com/736x/bf/06/98/bf06985fedc05b3eac2f8e2adc918b06.jpg',
          rating: 4,
          review_content: 'George is a fabulous nail artist. He is stupendous...outrageous!',
          review_date: 'Fri Oct 06 2016',
          image1: 'http://mediaresources.idiva.com/media/photogallery/2012/Oct/8_nail_art_trends_320x240.jpg',
          image2: null,
          image3: null
        })
        .then((review) => {
          console.log('User created: ', review)
        })

      Review
        .create({
          userId: 3,
          reviewed_first: 'George',
          reviewed_last: 'Castanza',
          reviewer_first: 'Crazy Joe',
          reviewer_last: 'Davola',
          reviewer_id: 16,
          reviewer_profile_pic: 'http://godfatherpolitics.com/wp-content/uploads/2012/10/Crazy-Joe-Davola.jpg',
          rating: 3,
          review_content: 'Hello George. How you doing? You dont have to say anything, I just wanted to say i Love my nails!',
          review_date: 'Fri Oct 06 2016',
          image1: 'https://farm9.staticflickr.com/8182/7983839923_692614b57c.jpg',
          image2: null,
          image3: null
        })
        .then((review) => {
          console.log('User created: ', review)
        })

      Review
        .create({
          userId: 3,
          reviewed_first: 'George',
          reviewed_last: 'Castanza',
          reviewer_first: 'Georges Boss',
          reviewer_last: '',
          reviewer_id: 16,
          reviewer_profile_pic: 'http://images.athlonsports.com/d/35322-1/Steinbrenner-Seinfeld.jpg',
          rating: 5,
          review_content: 'George is great! Wonderful nail artist! And Ill say it again, hes Great, Great!',
          review_date: 'Fri Oct 06 2016',
          image1: 'http://data.whicdn.com/images/49342964/large.jpg',
          image2: null,
          image3: null
        })
        .then((review) => {
          console.log('User created: ', review)
        })
  }

}

