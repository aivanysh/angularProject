import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CorrespondenceCommentsDetail } from '../model/correspondence-details-comments.model';
import { CORRESPONDENCEDETAILCOMMENTS } from '../model/correspondence-details-comments-dm';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceCommentsDetailsService {

  constructor() { }
  getCorrespondenceCommentsDetail(): Observable<CorrespondenceCommentsDetail[]> {
    return of(CORRESPONDENCEDETAILCOMMENTS);
  }
}
