import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CorrespondenceLinkedCorrespondenceDetail } from '../model/correspondence-details-linked-correspondence.model';
import { CORRESPONDENCEDETAILLINKED } from '../model/correspondence-details-linked-correspondence-dm';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceLinkedCorrespondenceDetailService {

  constructor() { }
  getCorrespondenceLinkedCorrespondenceDetail(): Observable<CorrespondenceLinkedCorrespondenceDetail[]> {
    return of(CORRESPONDENCEDETAILLINKED);
  }
}
