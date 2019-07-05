import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CorrespondenceDetail } from './correspondence-details.model';
import { CORRESPONDENCEDETAILSENDER } from './correspondence-details-sender-muck';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceSenderDetailsService {

  constructor() { }
  getCorrespondenceDetails(): Observable<CorrespondenceDetail[]> {
    return of(CORRESPONDENCEDETAILSENDER);
  }
}
