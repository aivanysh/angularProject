import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CorrespondenceCollaborationDetail } from '../model/correspondence-collaboration-details.model';
import { CORRESPONDENCEDETAILCOLLABORATION } from '../model/correspondence-collaboration-details-dm';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceCollaborationDetailsService {

  constructor() { }
  getCorrespondenceCollaborationDetail(): Observable<CorrespondenceCollaborationDetail[]> {
    return of(CORRESPONDENCEDETAILCOLLABORATION);
  }
}
