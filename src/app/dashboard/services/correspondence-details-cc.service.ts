import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CorrespondenceCCDetail } from '../model/correspondence-cc-details.model';
import { CORRESPONDENCEDETAILCC } from '../model/correspondence-cc-details-dm';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceCCDetailsService {

  constructor() { }
  getCorrespondenceCCDetail(): Observable<CorrespondenceCCDetail[]> {
    return of(CORRESPONDENCEDETAILCC);
  }
}
