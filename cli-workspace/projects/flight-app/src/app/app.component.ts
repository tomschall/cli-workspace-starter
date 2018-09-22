import { Component, OnInit } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from './+state/index';
import { CounterIncrementAction } from './+state/app.actions';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  arr: Array<Number>;
  count$: Observable<number>;

  constructor(private oauthService: OAuthService, private store: Store<State>) {

    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.count$ = this.store.pipe(select((state: State) => state.app.count));

  }

  ngOnInit() {

  }

  countUp() {
    const action = new CounterIncrementAction({ incrementBy: 1 });
    this.store.dispatch(action);
  }
}