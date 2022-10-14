import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { uniqueRoutes } from 'src/app/interfaces/uniqueRoutes.interface';
import { RequestServiceService } from 'src/app/services/request-service.service';
import { transport } from '../../interfaces/transport.interface';


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  transport: transport = {
    flightCarrier: '',
    flightNumber: ''
  };
  destination: string = '';
  price: number = 100;
  match: any;
  matched: boolean = false;
  firstConsult: boolean = true;
  scales: boolean = false;
  departure: any;
  arrival: any;
  scaleMatch: any;



  constructor(
    private RestService: RequestServiceService,
    private formBuilder: FormBuilder
  ) { }

  journeyQuestions = this.formBuilder.group({
    origin: ['', [Validators.required, Validators.maxLength(3)]],
    destination: ['', [Validators.required, Validators.maxLength(3)]],
    typeRoute: [null, [Validators.required]]
  })


  ngOnInit(): void {

  }

  getFlights() {

    this.RestService.get('https://recruiting-api.newshore.es/api/flights/' + this.journeyQuestions.value.typeRoute).subscribe(res => {
      console.log(res);
      let uniqueRoutes: any = res;
      //sin escalas
      this.match = uniqueRoutes.filter((item: { departureStation: string; arrivalStation: string; }) =>
        (item.arrivalStation === this.journeyQuestions.value.destination)
        && (item.departureStation === this.journeyQuestions.value.origin));

      if (this.match.length === 1) {
        console.log(this.match);
        this.matched = true;
        this.scales = false;
      } else if (this.match.length !== 1) {
        //Con escalas
        this.departure = uniqueRoutes.filter((item: { departureStation: string; }) =>
          (item.departureStation === this.journeyQuestions.value.origin));
        console.log("dep", this.departure);
        this.arrival = uniqueRoutes.filter((item: { arrivalStation: string; }) =>
          (item.arrivalStation === this.journeyQuestions.value.destination));
        console.log("ARR", this.arrival);
        this.departure.forEach((elementDeparture: any) => {
          this.arrival.forEach((elementArrival: any) => {

            if ((elementDeparture.departureStation === this.journeyQuestions.value.origin)
              && (elementArrival.arrivalStation === this.journeyQuestions.value.destination)) {

              this.scaleMatch = uniqueRoutes.filter((item: { departureStation: string; arrivalStation: string; }) =>
                (item.arrivalStation === elementArrival.departureStation)
                && (item.departureStation === elementDeparture.arrivalStation));

              if (elementArrival.departureStation === this.scaleMatch[0].arrivalStation) {
                this.scaleMatch.push(elementArrival);
              }
              if (elementDeparture.arrivalStation === this.scaleMatch[0].departureStation) {
                this.scaleMatch.push(elementDeparture);
              }
              console.log(this.scaleMatch);


              if (this.scaleMatch.length === 0) {
                this.matched = false;
                this.scales = false;
              } else {
                this.scaleMatch.forEach((element: any) =>{
                  this.price += element.price;
                })
                this.scales = true;
              }

            }
          })
        });
      } else {
        this.scales = false;
        console.log('Su consulta no puede ser procesada.');
        this.matched = false;
        this.firstConsult = false;
      }

    })
  }
  sendQuestion() {
    this.getFlights();
  }

}
