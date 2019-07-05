import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CorrespondenceCCDetail } from '../model/correspondence-cc-details.model';
import { CORRESPONDENCEDETAILATTACHMENTS } from '../model/correspondence-attachments-details-dm';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceAttachmentsDetailsService {

  constructor() { }
  getCorrespondenceAttachmentsDetail(): Observable<CorrespondenceCCDetail[]> {
    return of(CORRESPONDENCEDETAILATTACHMENTS);
  }
}
