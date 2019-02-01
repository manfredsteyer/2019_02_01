import { FlightBookingFacade } from './../flight-booking/+state/flight-booking.facade';
import {Component} from '@angular/core';


@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {


  constructor(private flightBookingFacade: FlightBookingFacade) {
  }

  search() {
    this.flightBookingFacade.load('Graz', 'Hamburg', false);
  }

}
