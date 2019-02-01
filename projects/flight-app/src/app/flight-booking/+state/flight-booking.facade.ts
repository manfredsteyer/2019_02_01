import { FlightsLoaded } from './flight-booking.actions';
import { FlightService } from './../../../../../flight-api/src/lib/services/flight.service';
import { FlightBookingAppStateSlice } from './flight-booking.reducer';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Flight } from '@flight-workspace/flight-api';
import { Store } from '@ngrx/store';
import { getFlights } from './flight-booking.selectors';


@Injectable({
    providedIn: 'root'
})
export class FlightBookingFacade {

    flights$: Observable<Flight[]>;

    constructor(
        private flightService: FlightService,
        private store: Store<FlightBookingAppStateSlice>) {

        this.flights$ = this.store.select(getFlights);
    }

    load(from: string, to: string, urgent: boolean) {
        this.flightService.find(from, to, urgent).subscribe(
            flights => { this.store.dispatch(new FlightsLoaded({ flights })); },
            err => { console.error('err', err); }
        );
    }

}