import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TransferHistoryDetailService } from 'src/app/dashboard/services/transfer-history.service'
import { transferHistoryDetail } from '../../model/transfer-history-details.model';
import { WorkflowHistoryDetailService } from 'src/app/dashboard/services/workflow-history.service'
import { workflowHistoryDetail } from '../../model/workflow-history-details.model';
export interface DialogData {
    work_flw: string;
    work_flw2: string;
}
@Component({
    selector: 'workflow-history-dialog',
    templateUrl: 'workflow-history.component.html',
  })

export class workflowHistoryDialogBox  {
    transferHistoryDetailData: transferHistoryDetail[];
    workflowHistoryDetailData: workflowHistoryDetail[];
    constructor( public dialogRef: MatDialogRef< workflowHistoryDialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private transferHistoryDetailService: TransferHistoryDetailService, private workflowHistoryDetailService: WorkflowHistoryDetailService) {}
    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit() {
        this.getTransferHistoryDetails();
        this.getWorkflowHistoryDetails();
    }
    getTransferHistoryDetails(): void {
        this.transferHistoryDetailService.getTransferHistoryDetails()
        .subscribe(transferHistoryDetailData => this.transferHistoryDetailData = transferHistoryDetailData);
    }
    getWorkflowHistoryDetails(): void {
        this.workflowHistoryDetailService.getWorkflowHistoryDetails()
        .subscribe(workflowHistoryDetailData => this.workflowHistoryDetailData = workflowHistoryDetailData);
    }
}