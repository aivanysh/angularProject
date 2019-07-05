import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TransferDetail } from '../model/transfer-details.model';
import { TRANSFERDETAILS } from '../model/transfer-details-dm';

@Injectable({
  providedIn: 'root'
})
export class TransferDetailService {
  constructor() { }
  getTransferDetails(): Observable<TransferDetail[]> {
    return of(TRANSFERDETAILS);
  }
}
