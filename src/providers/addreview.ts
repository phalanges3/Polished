import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Addreview provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Addreview {

  constructor(public http: Http) {
    console.log('Hello Addreview Provider');
  }

    updateGenReview(review) {
    let user = {userId: review.userId}
    return this.http.post('http://ec2-54-201-208-89.us-west-2.compute.amazonaws.com:3000/api/review/getreviews', user)
      .map((data: Response) => data.json())
      .subscribe(
        (data: any) => {

          let ratingSum;
          let genRating;

          if (data.length !== 0) {
            ratingSum = data.reduce(function(a, b){
              return {rating: a.rating + b.rating};
            })

            genRating = ((ratingSum.rating + (review.rating * 100)) / (data.length + 1) * 100)
          }
          else {
            genRating = review.rating * 100
          }

          return this.http.put('http://ec2-54-201-208-89.us-west-2.compute.amazonaws.com:3000/api/user/update', {userName: review.nail_artist_username, general_rating: genRating})
            .map((data: Response) => data.json())
            .subscribe(
              (data: any) => {
                console.log('heres the return from updating gen rating ', data)
              })

      });
  }

  addReview(review) {
    console.log('review sent from services! ', review)
    this.updateGenReview(review);

    let currentDate = new Date();

    let reviewData = {
          userId: review.userId,
          reviewed_first: review.nail_artist_first,
          reviewed_last: review.nail_artist_second,
          reviewer_first: review.firstName,
          reviewer_last: review.lastName,
          reviewer_id: review.id,
          reviewer_profile_pic: review.profile_image_url,
          rating: review.rating,
          review_content: review.review_content,
          review_date: currentDate.toDateString(),
          image1: review.image1,
          image2: null,
          image3: null
        }

    console.log('result of body in services ', reviewData)
    let body = JSON.stringify(reviewData);
    

    const headers = new Headers();
    headers.append('Content-Type', 'application/json')

    return this.http.post('http://ec2-54-201-208-89.us-west-2.compute.amazonaws.com:3000/api/review/addreview', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
  }

}
