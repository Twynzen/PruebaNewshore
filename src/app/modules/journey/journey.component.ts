import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {

  flights: Array<string> = [];
  @Input() origin = '';
  destination: string = '';
  price: number = 0;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
