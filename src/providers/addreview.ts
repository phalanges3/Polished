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

  addReview(review) {
    console.log('review sent from services! ', review)

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

    return this.http.post('http://localhost:3000/api/review/addreview', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
  }

}
