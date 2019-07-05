import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { transferHistoryDetail } from '../model/transfer-history-details.model';
import { TRANSFERHISTORYDETAILS } from '../model/transfer-history-details-dm';

@Injectable({
  providedIn: 'root'
})
export class TransferHistoryDetailService {

  constructor() { }
  getTransferHistoryDetails(): Observable<transferHistoryDetail[]> {
    return of(TRANSFERHISTORYDETAILS);
  }
}
