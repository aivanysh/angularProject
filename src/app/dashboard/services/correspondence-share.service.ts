import { Injectable } from '@angular/core';
import { statusRequest,setStatusRow } from  '../models/Shared.model';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpParams } from "@angular/common/http";
import { FCTSDashBoard } from "../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class CorrespondenceShareService {
  private CSUrl: string = CSConfig.CSUrl;
  constructor(private httpServices: HttpClient) { }

  setTransferToStatus(setStatusRequest: statusRequest): Observable<any>{
    console.log(setStatusRequest);

    let rowsJSON = JSON.stringify({ setStatusRequest });
    let params = new HttpParams()
      .set("statusJson", rowsJSON)
      .set("rowsLength", setStatusRequest.setStatusRow.length.toString())
    
    return this.httpServices
      .get<any>(
        this.CSUrl +
        `${FCTSDashBoard.WRApiV1}${
        FCTSDashBoard.SetStatuses
        }?Format=webreport`,
        {
          headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
        }
      );
  } 
  

  buildObject(element: any, status: string, callplace: string, comment?: string ): statusRequest {
      let CompleteRequestFinal: statusRequest = new statusRequest;
      let CompleteRequestArray: setStatusRow[] = [];
      CompleteRequestFinal.status= status;
      if(callplace == "Multiselect"){
        for (let i = 0; i < element.length; i++){
          let CList: setStatusRow = new setStatusRow;
          CList.subworkid = element[i].SubWork_SubWorkID.toString();
          CList.dataid = element[i].DataID.toString();
          CList.transID = element[i].transID.toString();
          CList.isCC = element[i].transIsCC.toString();
          CList.userid = CSConfig.globaluserid;
          CList.currentStatus = element[i].Status.toString();
          CList.NotesComplete = ''; 
          CompleteRequestArray.push(CList);
        }
      } else if(callplace =='SingleDashboard'){
          let CList: setStatusRow = new setStatusRow;
          CList.subworkid = element.SubWork_SubWorkID.toString();
          CList.dataid = element.DataID.toString();
          CList.transID = element.transID.toString();
          CList.isCC = element.transIsCC.toString();
          CList.userid = CSConfig.globaluserid;
          CList.currentStatus = element.Status.toString();
          CList.NotesComplete = comment; 
          CompleteRequestArray.push(CList);
      } else if(callplace == 'CorrDetails'){
          let CList: setStatusRow = new setStatusRow;
          CList.subworkid = element.SubWorkID;
          CList.dataid = element.AttachCorrID;
          CList.transID = element.ID;
          CList.isCC = element.isCC;
          CList.userid = CSConfig.globaluserid;
          CList.currentStatus = element.Status;
          CList.NotesComplete = comment; 
          CompleteRequestArray.push(CList);
      }

      CompleteRequestFinal.setStatusRow = CompleteRequestArray;
      return CompleteRequestFinal;
  }
}


