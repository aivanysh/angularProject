import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Correspondence } from 'src/app/dashboard/services/correspondence.model';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceInterchangeService {
  currentMessage: Correspondence;
  constructor() { }


  SharedData(correspondenceData){
    this.currentMessage = correspondenceData;
  };
}

