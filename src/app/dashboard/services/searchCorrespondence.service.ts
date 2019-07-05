import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CorrespondenceSeearchItems } from './CorrespondenceSeearchItems.model';
import { searchCorrespondence } from './searchCorrespondence-muck';
import { CorrespondencePreviewService } from './correspondence-preview.service';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceService {

  constructor( private CorrespondencePreviewService: CorrespondencePreviewService) { }
  getCorrespondenceSearch(): Observable<CorrespondenceSeearchItems[]> {
    this.CorrespondencePreviewService.add('CorrespondenceSearchService: fetched heroes');
    return of(searchCorrespondence);
  }

}
