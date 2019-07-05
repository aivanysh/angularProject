import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CorrespondenceCorrespondDetail } from '../model/correspondence-details-correspondence.model';
import { CORRESPONDENCEDETAILCORRESPONDENCE } from '../model/correspondence-details-correspondence-dm';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceDetailsService {

  constructor() { }
  getCorrespondenceCorrespondDetail(): Observable<CorrespondenceCorrespondDetail[]> {
    return of(CORRESPONDENCEDETAILCORRESPONDENCE);
  }
}
