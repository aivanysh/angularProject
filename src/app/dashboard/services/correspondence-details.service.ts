import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CorrResponse } from './correspondence-response.model';
import { HttpClient, HttpParams } from "@angular/common/http";
import { FCTSDashBoard } from "../../../environments/environment";
import { CorrAttachDocuments } from "../services/corrattachdocuments.model";
import { DocumentPreview } from "../services/documentpreview.model";
import { DashboardFilter, DashboardFilterResponse, transferAttributes } from '../models/DashboardFilter';
import { CorrespondenenceDetailsModel, ShowSections} from '../models/CorrespondenenceDetails.model';
import { Correspondence } from './correspondence.model';
import { statusRequest, setStatusRow } from  '../models/Shared.model';
import { CorrespondenceShareService } from '../services/correspondence-share.service';
import { map, tap, catchError } from 'rxjs/operators'; /* added 24/06/2019 */																			 
@Injectable({
  providedIn: 'root'
})

export class CorrespondenceDetailsService {
    private CSUrl: string = CSConfig.CSUrl;
    constructor(
      private httpServices: HttpClient,
      private _CorrespondenceShareService: CorrespondenceShareService
    ) { }

  getCorrespondenceRecipientDetails(SubWorkID, CorrFlowType): Observable<CorrResponse[]> {
    let params = new HttpParams()
      .set("SubWorkID", SubWorkID)
      .set("CorrFlowType", CorrFlowType)
      .set("qLive", "false")
      .set("prompting", "done");
    return this.httpServices.get<CorrResponse[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.RecipientInfo
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
      }
    );
  }

  getCorrespondenceSenderDetails(SubWorkID, CorrFlowType): Observable<CorrResponse[]> {
    let params = new HttpParams()
      .set("SubWorkID", SubWorkID)
      .set("CorrFlowType", CorrFlowType)
      .set("qLive", "false")
      .set("prompting", "done");
    return this.httpServices.get<CorrResponse[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.SenderInfo
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
      }
    );
  }

  getCorrespondenceCCDetail(SubWorkID, CorrFlowType): Observable<CorrResponse[]> {
    let params = new HttpParams()
      .set("SubWorkID", SubWorkID)
      .set("CorrFlowType", CorrFlowType)
      .set("qLive", "false")
      .set("prompting", "done");
    return this.httpServices.get<CorrResponse[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.CCInfo
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
      }
    );
  }

  getCorrespondenceCoverDetail(SubWorkID): Observable<CorrResponse[]> {
    let params = new HttpParams()
      .set("SubWorkID", SubWorkID)
      .set("qLive", "false")
      .set("prompting", "done");
    return this.httpServices.get<CorrResponse[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.CoverSectionInfo
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
      }
    );
  }

  getDocumentURL(coverdocumentid): Observable<DocumentPreview[]> {
    let params = new HttpParams().set("coverdocumentid", coverdocumentid);
    return this.httpServices.get<DocumentPreview[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${FCTSDashBoard.BravaURL}?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken },
        params: params
      }
    );
  }

  getCorrespondenceAttachmentsDetail(SubWorkID, CorrFlowType): Observable<CorrResponse[]> {
    let params = new HttpParams()
      .set("SubWorkID", SubWorkID)
      .set("CorrFlowType", CorrFlowType)
      .set("qLive", "false")
      .set("prompting", "done");
    return this.httpServices.get<CorrResponse[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.AttachmentSectionInfo
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
      }
    );
  }

  getTransferPurposeAndPriority(): Observable<transferAttributes[]> {
    return this.httpServices.get<transferAttributes[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.TransferAttributes
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }
      }
    );
  }
  searchTransferFieldName(name, Type) {
    let requestType;
    if (Type == "EMP") {
      requestType = "IntName";
    }
    else {
      requestType = "IntDepartment";
    }
    let params = new HttpParams().set(requestType, "true")
      .set("NameVal", name + '%');
    if (name.length >= 3) {
      return this.httpServices.get<DashboardFilterResponse[]>(this.CSUrl +
        `${FCTSDashBoard.WRApiV1}${FCTSDashBoard.GetTransferFields}?Format=webreport`,
        {
          headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
        });
    }
  }
  getCorrespondenceMetadataDetail(SubWorkID, CorrFlowType): Observable<CorrResponse[]> {
    let params = new HttpParams()
      .set("volumeId", SubWorkID)
      .set("CorrFlowType", CorrFlowType);
    return this.httpServices.get<CorrResponse[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.getcorrespondenceinfoRO
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
      }
    );
  }


  getTransferHistoryTab(volumeID): Observable<CorrResponse[]> {
    let params = new HttpParams()
      .set("volumeID", volumeID)
    return this.httpServices.get<CorrResponse[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.TransferHistoryTab
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
      }
    );
  }

  getCorrRecord(locationid, transid, onbehalfuserid): Observable<CorrespondenenceDetailsModel[]> {
    let params = new HttpParams()
      .set("FolderID", locationid)
      .set("transID", transid)
      .set("onBehalfUserID", onbehalfuserid );
    return this.httpServices.get<CorrespondenenceDetailsModel[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.GetCorrRecordData
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
      }
    );
  }
  getCorrespondenceFolderName(volumeID): Observable<any> {
    let params = new HttpParams()
      .set("volumeID", volumeID);
    return this.httpServices.get(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.GetCorrFolderName
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
      }
    );

  }
  getCorrespondenceCollaborationInfoRO(SubWorkID, CorrFlowType): Observable<CorrResponse[]> {

    let params = new HttpParams()
      .set("SubWorkID", SubWorkID)
      .set("CorrFlowType", CorrFlowType)
      .set("ReadOnly", "Yes")
      .set("qLive", "false");
    return this.httpServices.get<CorrResponse[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.UserCollaborationRO
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
      }
    );
  }
  getCommentsData(volumeID): Observable<CorrResponse[]> {
    let params = new HttpParams()
      .set("ReferenceID", volumeID)
    return this.httpServices.get<CorrResponse[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.WorkflowCommentsList
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
      }
    );
  }

  getCorrConnectionsData(locationid): Observable<CorrResponse[]> {
    let params = new HttpParams()
      .set("ReferenceID", locationid)
    return this.httpServices.get<CorrResponse[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.CorrConnectionsList
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
      }
    );
  }

  getDocumentPropertiesURL(docid): Observable<DocumentPreview[]> {
    let params = new HttpParams().set("docid", docid);
    return this.httpServices.get<DocumentPreview[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${FCTSDashBoard.PropertiesURL}?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken },
        params: params
      }
    );
  }

  showHideSection( CorrespondencType: string, taskID?: string ): ShowSections{    
      let sectionDisplay: ShowSections = {  Sender:{ Show: true, Modify: false },
                                            Recipient:{ Show: true, Modify: false },
                                            CC:{ Show: true, Modify: false },
                                            Correspondence:{ Show: true, Modify: false },
                                            Cover:{ Show: true, Modify: false },
                                            Attachments:{ Show: true, Modify: false },
                                            UserCollaboration:{ Show: true, Modify: false },
                                            LinkedCorrespondence:{ Show: true, Modify: false },
                                            Comments:{ Show: true, Modify: false },
                                            Transfer:{ Show: false, Modify: false },
                                            Distribution:{ Show: false, Modify: false }
      };
      if( CorrespondencType == 'Internal' && taskID == '0' ){
        sectionDisplay.Transfer.Show = true;
        //sectionDisplay.Transfer.Modify = true; 
      } else if (CorrespondencType == 'Outgoing' && taskID == '0' ){
        sectionDisplay.Transfer.Show = true;
        //sectionDisplay.Transfer.Modify = true; 
      } else if (CorrespondencType == 'Incoming' && taskID == '0' ) {
        sectionDisplay.Transfer.Show = true;
        //sectionDisplay.Transfer.Modify = true; 
      }
        return sectionDisplay;
  }
  
  modifySection( sectionDisplay: ShowSections,correspondenceData: CorrespondenenceDetailsModel): ShowSections {
    debugger;
     if ((correspondenceData.ID != '0' && (correspondenceData.Status == '0' || correspondenceData.Status == '1' )) ||
         (correspondenceData.isCC == '1' && correspondenceData.CCstatus != 'Archived') ||
         (correspondenceData.perform07 == '1' && correspondenceData.CCstatus != 'Archived')
     ){
      sectionDisplay.Transfer.Modify = true; 
     }
    return sectionDisplay
  }
  /* Changed PSM: 27/06/2019 */
  createTransferRequest(transferJson, correspondenceData: CorrespondenenceDetailsModel): Observable<any> {
      let transferVal = JSON.stringify({ transferJson });
      let params = new HttpParams()
        .set("transferJson", transferVal)
        .set("volumeid", correspondenceData.VolumeID)
        .set("taskid", "32")
        .set("CorrFlowType", "Incoming")
        .set("locationid", correspondenceData.AttachCorrID)
        .set("rows_count", transferJson.length)

      return this.httpServices
      .get<any>(
        this.CSUrl +
        `${FCTSDashBoard.WRApiV1}${
        FCTSDashBoard.createTransfer
        }?Format=webreport`,
        {
          headers: { OTCSTICKET: CSConfig.AuthToken }, params: params
        }
      )

      .pipe (
          map (data => { 
            this.prepSetTransferStatus(data, correspondenceData, 1,'');
            return data; 
          }),
          catchError(error => {
            console.log('transfer ERROR => '+ error.message || 'some error with transfer');
            return error;
          })
      );
  }

  prepSetTransferStatus(transfered: any, correspondenceData: CorrespondenenceDetailsModel, status: Number, NotesComplete: string): void{
    /* build object to set Status 
    taskstatus -> status
      dataid -> correspondenceData.AttachCorrID
      transid -> correspondenceData.ID
      currentStatus -> correspondenceData.Status
      dataid -> correspondenceData.AttachCorrID
      subworkid -> AttachCorrID.SubWorkID
      isCC -> AttachCorrID.isCC
      NotesComplete -> ''
    */
    let rowsArray: setStatusRow[] = [];
    let statusRow: setStatusRow = new setStatusRow;
    let setStatusRequest: statusRequest = new statusRequest; 
      setStatusRequest.status = status.toString();
        statusRow.subworkid = correspondenceData.SubWorkID.toString();
        statusRow.dataid = correspondenceData.AttachCorrID.toString();
        statusRow.isCC = correspondenceData.isCC.toString();
        statusRow.transID = correspondenceData.ID.toString();
        statusRow.NotesComplete = NotesComplete;
        statusRow.currentStatus = correspondenceData.Status.toString();
        statusRow.userid = CSConfig.globaluserid.toString();
        rowsArray.push(statusRow);
      setStatusRequest.setStatusRow = rowsArray;
      this._CorrespondenceShareService.setTransferToStatus(setStatusRequest).subscribe();
   }

}