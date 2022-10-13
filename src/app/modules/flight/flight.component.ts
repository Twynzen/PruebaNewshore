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



  constructor(
    private RestService: RequestServiceService,
    private formBuilder: FormBuilder
  ) { }

  journeyQuestions = this.formBuilder.group({
    origin: ['', [Validators.required, Validators.maxLength(3)]],
    destination: ['', [Validators.required, Validators.maxLength(3)]]
  })


  ngOnInit(): void {

  }

  getFlights() {
    this.RestService.get('https://recruiting-api.newshore.es/api/flights/1').subscribe(res => {
      console.log(res);

      let uniqueRoutes: any = res;
      this.match = uniqueRoutes.filter((item: { departureStation: string; arrivalStation: string; }) =>
        (item.arrivalStation === this.journeyQuestions.value.destination)
        && (item.departureStation === this.journeyQuestions.value.origin));
        if (this.match.length === 1) {
          console.log(this.match);
        }else{
          console.log('No se ha encontrado el vuelo sugerido');

        }


    })
  }
  sendQuestion() {
    this.getFlights();
    console.log(this.journeyQuestions.value, "HI good morning");

  }

}
