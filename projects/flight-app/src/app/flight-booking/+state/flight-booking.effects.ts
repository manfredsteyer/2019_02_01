import { FlightBookingActionTypes, LoadFlights, FlightsLoaded } from './flight-booking.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FlightService } from '@flight-workspace/flight-api';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class FlightBookingEffects {

    constructor(private flightService: FlightService, private actions$: Actions) {
    }

    @Effect() loadFlights =
        this.actions$.pipe(
            ofType(FlightBookingActionTypes.LoadFlights),
            switchMap((a : LoadFlights) => this.flightService.find(a.payload.from, a.payload.to, a.payload.urgent)),
            map(flights => new FlightsLoaded({ flights }))
        );
}
