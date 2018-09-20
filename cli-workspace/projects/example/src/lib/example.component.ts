import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-example',
  template: `
    <p>
      example works!
    </p>
  `,
  styles: []
})
export class ExampleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
