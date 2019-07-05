import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import inboxMail from '../../../../assets/Data/mailsData.json';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Correspondence } from 'src/app/dashboard/services/correspondence.model';
import { CorrespondenceService } from 'src/app/dashboard/services/correspondence.service';
import { workflowHistoryDialogBox } from '../../workflow-history/workflow-history.component'
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentPreview } from "../../services/documentpreview.model";
import { FCTSDashBoard } from '../../../../environments/environment';

@Component({
  selector: 'app-internal-dashboard',
  templateUrl: './internal-dashboard.component.html',
  styleUrls: ['./internal-dashboard.component.scss']
})
export class InternalDashboardComponent implements OnInit {
  basehref: String = FCTSDashBoard.BaseHref;
  internalInboundRequestsWidth: number;
  internalOutboundRequestsWidth: number;
  externalInboundRequestsWidth: number;
  externalOutboundRequestsWidth: number;
  assignedAction: boolean;
  selectedMail: boolean;
  // SearchFilterData: SearchFilters;
  SearchFilterData = {
    ReferenceCode: '',
    DocumentNumber: '',
    MyAssignments: false,
    DispatchDateFrom: '',
    DispatchDateTo: '',
    Subject: '',
    CorrespondencType: { ID: '', EN: '', AR: '' },
    ExternalOrganization: '',
    ExternalDepartment: '',
    RecipientDepartment: { ID: '', EN: '', AR: '' },
    SenderDepartment: { ID: '', EN: '', AR: '' },
    Priority: { ID: '', EN: '', AR: '' },
    BaseType: { ID: '', EN: '', AR: '' },
    IDNumber: '',
    Personalname: '',
    Transferpurpose: '',
    Contract: '',
    Tender: '',
    Mailroom: '',
    Budget: '',
    Project: '',
    Staffnumber: ''
  }

  constructor(public dialog: MatDialog, private httpServices: HttpClient,
    public dialogU: MatDialog,
    private _internaldashobardservice: CorrespondenceService, private route: ActivatedRoute,
    private router: Router) { }
  userData: string[];
  userDetails: string[];
  mailData: string[];
  id: number;
  heroes = overviewitem;
  loading = true;
  correspondenceData: Correspondence[];
  progbar = true;
  animal: string;
  name: string;
  selectedCorrespondence: Correspondence;
  previewViewCorrespondence: Correspondence;
  quickViewCorrespondence: Correspondence;
  openedSubCorrespond: Correspondence;									  
  documentPreviewURL: DocumentPreview[];
  //Pagination Variiables
  itemsPerPage: number = FCTSDashBoard.DefaultPageSize;
  pagenumber: number = 1;
  totalCount: number;
  // // selectedHero: PeriodicElement;
  // displayedColumns: string[] = [
  //   "select",
  //   "CorrespondenceCode",
  //   "Subject",
  //   "SubWorkTask_Title",
  //   "FromDept",
  //   "ToDept",
  //   "Assigned",
  //   "Received",
  //   "Priority",
  //   "Purpose",
  //   "DueDate",
  //   "options"
  // ];
  dataSource = new MatTableDataSource<PeriodicElement>(overviewitem);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator) overviewitem: MatPaginator;
  ngOnInit() {
    this.internalInboundRequestsWidth = Math.floor(this.internalInboundRequests / this.totalInternalInboundRequests * 100);
    this.internalOutboundRequestsWidth = Math.floor(this.internalOutboundRequests / this.totalInternalOutboundRequests * 100);
    this.externalInboundRequestsWidth = Math.floor(this.externalInboundRequests / this.totalExternalInboundRequests * 100);
    this.externalOutboundRequestsWidth = Math.floor(this.externalOutboundRequests / this.totalExternalOutboundRequests * 100);
    this.dataSource.paginator = this.overviewitem;

    this._internaldashobardservice
      .getUserData()
      .subscribe(data => (this.userData = data));

      this.getPage(1);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  getPage(page: number): void {
    const perPage = FCTSDashBoard.DefaultPageSize;
    const start = ((page - 1) * perPage) + 1;
    const end = (start + perPage) - 1;
    this.getCorrespondence(start, end, page);
  }
  getCorrespondence(start: number, end: number, page: number): void {
    this.progbar = true;
    this._internaldashobardservice
      .getDashboardMain("IntFullSearch", start, end, this.SearchFilterData)
      .subscribe(correspondenceData => {
		let myMap = new Map();
        for (let obj of correspondenceData) {

          if (myMap.has(obj.RowNum)) {
            //myMap.get(obj.RowNum).children.push(obj);
            myMap.get(obj.RowNum).subCorrespondenceDetail.push(obj);
            myMap.get(obj.RowNum).subCorrespondenceNumber = obj.counttasks - 1;
            myMap.get(obj.RowNum).subCorrespondence = true;
          }
          else {
            myMap.set(obj.RowNum, obj);
          }
        }
        // console.log(ab);      
        let resultArray: any[] = [];
        //Iterate over map values
        for (let value of myMap.values()) {
          resultArray.push(value);                //37 35 40
        }
        this.correspondenceData = resultArray;
        this.progbar = false;
        if (start == 1) {
          this.totalCount = correspondenceData[0].totalRowCount;
        }
        console.log(this.totalCount);
        this.pagenumber = page;
      });
  }
  onSelect(correspondData: Correspondence): void {
    this.selectedCorrespondence = correspondData;
  }
  openSubCorrespond(correspondData: Correspondence): void {
    this.openedSubCorrespond = correspondData;
  }
  previewViewWrapper(correspondData: Correspondence): void {
    this.getCoverDocumentURL('' + correspondData.CoverID);
    this.previewViewCorrespondence = correspondData;
  }
  quickViewWrapper(correspondData: Correspondence): void {
    this.quickViewCorrespondence = correspondData;
  }
  assignedActionButton() {
    this.assignedAction = !this.assignedAction;
  }
  fullDetails() {
    this.selectedMail = !this.selectedMail;
  }
  //Types of requests
  // Internal Inbound
  public totalInternalInboundRequests: number = 8900;
  public internalInboundRequests: number = 7120;
  // Internal Outbound
  public totalInternalOutboundRequests: number = 8900;
  public internalOutboundRequests: number = 3120;
  // External Inbound
  public totalExternalInboundRequests: number = 900;
  public externalInboundRequests: number = 220;
  // External Outbound
  public totalExternalOutboundRequests: number = 900;
  public externalOutboundRequests: number = 880;

  // Doughnut
  // Doughnut
  public doughnutChartLabels: string[] = [
    "Urgent",
    "Top Urgent",
    "Normal"
  ];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartOptions: any = {
    responsive: true,
  };
  public doughnutChartColor: Array<any> = [{ backgroundColor: ['#8cc34b', '#36c2cf', '#a768dd'] }];

  openDialog(correspondData: Correspondence): void {
    const dialogRef = this.dialogU.open(workflowHistoryDialogBox, {
      width: '100%',
      panelClass: 'transferDialogBoxClass',
      maxWidth: '85vw',
      data: {
        data: correspondData
      }
    });
  }
  routeToDetailsPage(correspondenceData: Correspondence) {

    this.router.navigate(['/dashboard/external/correspondence-detail'],
    { queryParams: { VolumeID: correspondenceData.VolumeID, CorrType: correspondenceData.CorrFlowType, CoverID: correspondenceData.CoverID, locationid: correspondenceData.DataID } });
  }
  getCoverDocumentURL(CoverID: String): void {

    this._internaldashobardservice.getDocumentURL(CoverID)
      .subscribe(documentPreviewURL => this.documentPreviewURL = documentPreviewURL);
  }
}
export interface PeriodicElement {
  ID: string,
  Subject: string,
  Requester: string,
  Type: string,
  Assigned: any,
  Received: string,
  Status: string,
  Due_Customer: string,
  inbox_icons: any
}
const overviewitem: PeriodicElement[] = inboxMail.mails;

///\full data showing
@Component({
  selector: 'mailDetailView',
  templateUrl: 'mailDetailView.html',
})
export class mailDetailView {
  constructor( @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) { }
}