import { FlightService } from './../../../../flight-api/src/lib/services/flight.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, interval, Subject } from 'rxjs';
import { Flight } from '@flight-workspace/flight-api';
import { debounceTime, switchMap, startWith, map, distinctUntilChanged, tap, filter, shareReplay, scan, mergeMap, exhaustMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lookahead',
  templateUrl: './lookahead.component.html',
  styleUrls: ['./lookahead.component.css']
})
export class LookaheadComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.closeSubject.next();
    this.closeSubject.complete();
  }

  formControl = new FormControl();
  input$ = this.formControl.valueChanges;

  flights$: Observable<Flight[]>;

  online$: Observable<boolean>;

  closeSubject = new Subject<void>();

  constructor(private flightService: FlightService) { }

  ngOnInit() {

    this.online$ 
      = interval(2000).pipe(
            startWith(0),
            map(_ => Math.random() < 0.5), // 
            distinctUntilChanged(),
            shareReplay(1),
            takeUntil(this.closeSubject)
    );

    let debouncedInput$ = this.input$.pipe(
      debounceTime(300),
      takeUntil(this.closeSubject)
    );

    this.flights$ = combineLatest(debouncedInput$, this.online$).pipe(
      filter( ([input, online]) => online),
      scan( ([lastInput, lastOnline], [currentInput, currentOnline]) => [currentInput, currentOnline, lastInput],[]),
      filter( ([currentInput, currentOnline, lastInput]) => currentInput != lastInput ),
      switchMap(([input, online]) => this.flightService.find(input, ''))
    )
  }

}
