import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CorrespondenceRecipientDetail } from './correspondence-recipient-details.model';
import { CORRESPONDENCEDETAILRECIPIENT } from './correspondence-details-recipient-muck';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceRecipientDetailsService {

  constructor() { }
  getCorrespondenceRecipientDetails(): Observable<CorrespondenceRecipientDetail[]> {
    return of(CORRESPONDENCEDETAILRECIPIENT);
  }
}
