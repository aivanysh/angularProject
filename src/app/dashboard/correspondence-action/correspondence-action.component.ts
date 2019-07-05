import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CorrResponse } from '../services/correspondence-response.model';
import { Correspondence } from '../services/correspondence.model';
import { FCTSDashBoard } from '../../../environments/environment';
import { CorrespondenceShareService } from 'src/app/dashboard/services/correspondence-share.service';
import { statusRequest, setStatusRow } from  'src/app/dashboard/models/Shared.model';


@Component({
  selector: 'app-correspondence-action',
  templateUrl: './correspondence-action.component.html',
  styleUrls: ['./correspondence-action.component.scss']
})
export class CorrespondenceActionComponent{
  comment: string = "";
  err: string;
  constructor(
    public dialogRef: MatDialogRef<CorrespondenceActionComponent>,
    private CorrespondenceShareService: CorrespondenceShareService,
    @Inject(MAT_DIALOG_DATA) public corrData: any,

  ) { }
  onNoClick(): void {
    this.dialogRef.close("Cancel");
  }
  sendStatus(status: string): void{
    let CompleteRequestFinal: statusRequest = new statusRequest;
    if(this.comment.trim().length<10 ){
      this.err="Comment should be more than 10 characters"
    } else {
      CompleteRequestFinal = this.CorrespondenceShareService.buildObject(this.corrData.data, "1", this.corrData.callplace, this.comment)
      this.err="";
      this.CorrespondenceShareService.setTransferToStatus(CompleteRequestFinal).subscribe();
      this.dialogRef.close("Reload");
    }
  }
  ngOnInit() {
    
  }

}
