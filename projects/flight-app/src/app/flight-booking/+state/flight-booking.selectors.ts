import { FlightBookingAppStateSlice, FlightBookingState } from './flight-booking.reducer';
import { createSelector, createFeatureSelector } from "@ngrx/store";


export const getFlights = createSelector(
    (s: FlightBookingAppStateSlice) => s.flightBooking.flights,
    (s: FlightBookingAppStateSlice) => s.flightBooking.blackList,
    (flights, blackList) => flights.filter(f => !blackList.includes(f.id))
);

// createFeatureSelector(flightBookingBranch)