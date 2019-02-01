import { Observable } from 'rxjs';
import { FlightsLoaded, LoadFlights, UpdateFlight } from './../+state/flight-booking.actions';
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {FlightService, Flight} from '@flight-workspace/flight-api';
import { Store } from '@ngrx/store';
import { FlightBookingAppStateSlice } from '../+state/flight-booking.reducer';
import { getFlights } from '../+state/flight-booking.selectors';
import { FlightBookingFacade } from '../+state/flight-booking.facade';
import { first } from 'rxjs/operators';
import { AppState } from '../../+state';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightSearchComponent implements OnInit {

  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;

  get flights() {
    return this.flightService.flights;
  }

  flights$: Observable<Flight[]>;

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private store: Store<AppState>,
    private facade: FlightBookingFacade,
    private flightService: FlightService) {
  }

  ngOnInit() {
    this.flights$ = this.facade.flights$;
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.facade.load(this.from, this.to, this.urgent);

  }

  delay(): void {
    
    this.flights$.pipe(first()).subscribe(flights => {

      let flight = flights[0];
      let date =
        new Date(new Date(flight.date).getTime() + 1000 * 60 * 15).toISOString();

      let newFlight = {...flight, date}

      this.store.dispatch(new UpdateFlight({flight: newFlight}));


    });

  }

}
