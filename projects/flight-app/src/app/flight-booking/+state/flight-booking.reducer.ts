import { AppState } from './../../+state/index';
import { Action } from '@ngrx/store';
import { FlightBookingActions, FlightBookingActionTypes, UpdateFlight } from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import produce from 'immer';


export const flightBookingBranch = 'flightBooking';

export interface FlightBookingAppStateSlice extends AppState {
  [flightBookingBranch]: FlightBookingState;
}

export interface FlightBookingState {
  flights: Flight[];
  blackList: number[];
}

export const initialState: FlightBookingState = {
  flights: [],
  blackList: [5]
};

export const flightBookingReducer = produce((state, action: FlightBookingActions) => {

  console.debug('r', state, action);
  
  switch (action.type) {

    case FlightBookingActionTypes.FlightsLoaded:
      const flights = action.payload.flights;
      
      // VERBOTEN !
      state.flights = action.payload.flights;
      break;

    case FlightBookingActionTypes.UpdateFlight: {

       let a = action as UpdateFlight;
       const flight = a.payload.flight;

      // SCHWEINEKRAM
      const idx = state.flights.findIndex(f => f.id === flight.id);
      state.flights[idx] = flight;
      break;
    }

    case FlightBookingActionTypes.LoadFlights: {
      state.flights = [];
      break;
    }
  }

}, initialState);
