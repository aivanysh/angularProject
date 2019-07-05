import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { workflowHistoryDetail } from '../model/workflow-history-details.model';
import { WORKFLOWHISTORYDETAILS } from '../model/workflow-history-details-dm';

@Injectable({
  providedIn: 'root'
})
export class WorkflowHistoryDetailService {

  constructor() { }
  getWorkflowHistoryDetails(): Observable<workflowHistoryDetail[]> {
    return of(WORKFLOWHISTORYDETAILS);
  }
}
