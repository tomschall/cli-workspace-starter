import { Component, OnInit } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Observable, from, interval, of } from 'rxjs';
import { map, filter, combineLatest, switchMap, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  arr: Array<Number>;

  constructor(private oauthService: OAuthService) {

    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit() {



    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];



    var roots = numbers
      .map((p) => {
        var r = p * 2;
        console.log('map', p * 2);
        return r;
      })
      .filter(a => {
        if (a > 4)
          console.log('filter', a);
        return a > 4;
      })

    //console.log('roots is', roots);



    from(numbers).pipe(
      map(a => {
        a = a * 2;
        console.log('map', a);
        return a;
      }),
      filter(a => {
        if (a > 4)
          console.log('filter', a)
        return a > 4;
      })).subscribe(val => console.log('end', val));


    let sum = 0;

    from([1, 2, 3])
      .subscribe(
        (value) => {
          console.log('Adding: ' + value);
          sum = sum + value;
        },
        undefined,
        () => {
          console.log('Sum equals: ' + sum);
        }
      );

    // Logs:
    // "Adding: 1"
    // "Adding: 2"
    // "Adding: 3"
    // "Sum equals: 6"


    const interval1$ = interval(1000);
    const interval2$ = interval(2000);
    const interval3$ = interval(5000);

    interval1$.pipe(
      combineLatest(interval2$.pipe(
        switchMap((a) => {
          return of(String.fromCharCode(97 + a))
        })
      )),
      take(10)
      //takeUntil(interval3$)
    ).subscribe(a => console.log(a)


  }
}