import {Routes} from '@angular/router';
import {FlightBookingComponent} from './flight-booking.component';
import {FlightEditComponent} from './flight-edit/flight-edit.component';
import {FlightSearchComponent} from './flight-search/flight-search.component';
import {PassengerSearchComponent} from './passenger-search/passenger-search.component';
import { AirportComponent } from './airport/airport.component';
import { AuthGuard } from '../shared/auth/guards/auth.guard';
import { CanDeactivateGuard } from '../shared/can-deactivation/can-deactivate.guard';


export const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'flight-search',
        component: FlightSearchComponent
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'airports',
        component: AirportComponent
    },
    ]
  }

]
