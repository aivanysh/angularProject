import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpParams,HttpErrorResponse } from "@angular/common/http";
import { Correspondence } from "./correspondence.model";
import { FCTSDashBoard } from "../../../environments/environment";
import { CorrAttachDocuments } from './corrattachdocuments.model';
import { DocumentPreview } from "./documentpreview.model";
import { DashboardFilter, DashboardFilterResponse } from "../models/DashboardFilter"
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class CorrespondenceService {
  private CSUrl: string = CSConfig.CSUrl;
  constructor(private httpServices: HttpClient) { }

  getExternalFullSearch(): Observable<Correspondence[]> {
    return this.httpServices.get<Correspondence[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.ExternalInbNew
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }
      }
    );
  }

  getUserData(): Observable<any[]> {
    return this.httpServices.get<any[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.getUserOverallData
      }?Format=webreport&ProxyUserID=${CSConfig.globaluserid}`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }
      }
    );
  }


  // SearchFilterData: SearchFilters;
  // SearchFilterData = {
  //   ReferenceCode: '',
  //   DocumentNumber: '',
  //   MyAssignments: false,
  //   DispatchDateFrom: '',
  //   DispatchDateTo: '',
  //   Subject: '',
  //   CorrespondencType: { ID: '', EN: '', AR: '' },
  //   ExternalOrganization: '',
  //   ExternalDepartment: '',
  //   RecipientDepartment: { ID: '', EN: '', AR: '' },
  //   SenderDepartment: { ID: '', EN: '', AR: '' },
  //   Priority: { ID: '', EN: '', AR: '' },
  //   BaseType: { ID: '', EN: '', AR: '' },
  //   IDNumber: '',
  //   Personalname: '',
  //   Transferpurpose: '',
  //   Contract: '',
  //   Tender: '',
  //   Mailroom: '',
  //   Budget: '',
  //   Project: '',
  //   Staffnumber: ''
  // }

  getDashboardMain(reportType, startRow, endRow, queryFilters): Observable<Correspondence[]> {
    let params = new HttpParams()
      .set("reportType", reportType)
      .set("startRow", startRow)
      .set("endRow", endRow)
      .set("CorrespondenceCode", queryFilters.ReferenceCode ? queryFilters.ReferenceCode : "")
      .set("ExternalOrganization", queryFilters.ExternalOrganization ? queryFilters.ExternalOrganization : "")
      .set("ExternalDepartment", queryFilters.ExternalDepartment ? queryFilters.ExternalDepartment : "")
      .set("Priority", queryFilters.Priority.ID ? queryFilters.Priority.ID : "")
      .set("ReceivedDateFrom", queryFilters.DispatchDateFrom ? queryFilters.DispatchDateFrom : "")
      .set("ReceivedDateTo", queryFilters.DispatchDateTo ? queryFilters.DispatchDateTo : "")
      .set("FromDep", queryFilters.SenderDepartment.ID ? queryFilters.SenderDepartment.ID : "")
      .set("ToDep", queryFilters.RecipientDepartment.ID ? queryFilters.RecipientDepartment.ID : "")
      .set("BaseType", queryFilters.BaseType.ID ? queryFilters.BaseType.ID : "")
      .set("Subject", queryFilters.Subject ? queryFilters.Subject : "") 
      .set("MyAssignments", queryFilters.MyAssignments ? queryFilters.MyAssignments : "")
      .set("DocumentNumber", queryFilters.DocumentNumber ? queryFilters.DocumentNumber : "")
      .set("enableTotalCount", startRow == 1 ? "true" : "false");
    return this.httpServices.get<Correspondence[]>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${
      FCTSDashBoard.DashboardReportMain
      }?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken },
        params: params
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

  getDashboardFilters(): any {
    return this.httpServices.get<any>(
      this.CSUrl +
      `${FCTSDashBoard.WRApiV1}${FCTSDashBoard.SearchFilters}?Format=webreport`,
      {
        headers: { OTCSTICKET: CSConfig.AuthToken }
      }
    );
  }

  searchExtOrgName(name): Observable<DashboardFilterResponse> {
    if (name.length >= 3) {


      let params = new HttpParams().set("cpName", name);
      return this.httpServices.get<DashboardFilterResponse>(this.CSUrl +
        `${FCTSDashBoard.WRApiV1}${FCTSDashBoard.ExtOrgNameFilter}?Format=webreport`,
        {
          headers: { OTCSTICKET: CSConfig.AuthToken },
          params: params
        });
    }
    // .pipe(
    // tap((response: DashboardFilterResponse) => {
    //   response.results = response.results
    //     .map(user => new DashboardFilter(user.id, user.name, user.name_ar))
    //   return response;
    // })
    // );
  }
  setPerformerPermission(correspondData): Observable<any>{
    let params = new HttpParams()
      .set( "locationid", correspondData.DataID )
      .set( "UserID", CSConfig.globaluserid )
      .set( "CorrFlowType", correspondData.CorrFlowType )
      .set( "TaskID", correspondData.SubWorkTask_TaskID )
      .set( "quickPerm", "true" );

    return this.httpServices
      .get(
        this.CSUrl+`${FCTSDashBoard.WRApiV1}${FCTSDashBoard.SetPerformerPermission}?Format=webreport`,
        { headers: 
          { OTCSTICKET: CSConfig.AuthToken },
          params: params
        }
      )
      .pipe (
        map (data => { 
          console.log('performer permission is set');
          return data; 
        }),
        catchError(error => {
          console.log('set Performer permission ERROR => '+ error.message || 'some error with set performer permission');
          return error;
        })
      );
  }
}
