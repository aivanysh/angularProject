import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CorrespondenceCoverDetail } from '../model/correspondence-cover-details.model';
import { CORRESPONDENCEDETAILCOVER } from '../model/correspondence-cover-details-dm';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceCoverDetailsService {

  constructor() { }
  getCorrespondenceCoverDetail(): Observable<CorrespondenceCoverDetail[]> {
    return of(CORRESPONDENCEDETAILCOVER);
  }
}
