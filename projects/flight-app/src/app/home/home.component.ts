import { OAuthService } from 'angular-oauth2-oidc';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../+state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  expertMode: boolean = false;


  constructor(
    private oauthService: OAuthService,
    private store: Store<AppState>,
    private route: ActivatedRoute) {


      store.select(s => s.counter).subscribe(c => console.debug('counter', c));
      
      store.dispatch({type: 'inc'});
      store.dispatch({type: 'inc'});
      store.dispatch({type: 'inc'});
      store.dispatch({type: 'dec'});

      

    let subject = new BehaviorSubject<string>('init'); // = ReplaySubject(1) + startWith('init')
    subject.subscribe(v => console.debug('e1', v));

    subject.next('Info 1');
    subject.subscribe(v => console.debug('e2', v));

    subject.next('Info 2');
    subject.subscribe(v => console.debug('e3', v));

  }

  changed($event): void {
    console.debug('$event.detail ', $event.target.detail);

    this.expertMode = $event.detail
  }

  needsLogin: boolean;
  _userName: string = '';

  ngOnInit() {
    this.needsLogin = !!this.route.snapshot.params['needsLogin'];
  }

  get userName(): string {
    
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
              //       ^--------------- OIDC

  }

  login(): void {
    this.oauthService.initImplicitFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }


}
