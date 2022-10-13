import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  constructor(
    private Http_client: HttpClient,
  ) { }

  public get(url:string){
    return this.Http_client.get(url);
  }


}
