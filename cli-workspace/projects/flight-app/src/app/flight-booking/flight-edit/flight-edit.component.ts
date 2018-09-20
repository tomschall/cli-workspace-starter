import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CanDeactivateComponent } from '../../shared/can-deactivation/can-deactivate.guard';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit, CanDeactivateComponent {
  id: string;
  showDetails: string;
  showWarning = false;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });
  }

  canDeactivateAnswer$: Subject<boolean> = new Subject();


  decide(decision: boolean): void {
    this.showWarning = false;
    this.canDeactivateAnswer$.next(decision);
    if (decision) {
      this.canDeactivateAnswer$.complete();
    }
  }

  canDeactivate(): Observable<boolean> {
    this.showWarning = true;
    return this.canDeactivateAnswer$.asObservable();
  }

}
