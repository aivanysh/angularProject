import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  PipeTransform,
  Pipe
} from "@angular/core";
import { Correspondence } from "src/app/dashboard/services/correspondence.model";
import { CorrespondenceService } from "src/app/dashboard/services/correspondence.service";
import { SelectionModel } from "@angular/cdk/collections";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { switchMap, debounceTime } from 'rxjs/operators';

import { map, startWith } from "rxjs/operators";
import { Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { CorrAttachDocuments } from '../../services/corrattachdocuments.model';
import { FCTSDashBoard } from '../../../../environments/environment';
import { SearchFilters } from "../../services/dasboardsearch.model";
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentPreview } from "../../services/documentpreview.model";
import { MatDialog } from '@angular/material';
import { workflowHistoryDialogBox } from '../../workflow-history/workflow-history.component';
import { CorrespondenceActionComponent } from '../../correspondence-action/correspondence-action.component';
import { statusRequest, setStatusRow } from  '../../models/Shared.model';
import { CorrespondenceShareService } from 'src/app/dashboard/services/correspondence-share.service';

@Pipe({ name: "safe" })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@Component({
  selector: "app-inprogress-intoutbounds",
  templateUrl: "./in-progress-intioutbounds.component.html",
  styleUrls: ["./in-progress-intioutbounds.component.scss"]
})

export class InprogressIntOutboundComponent implements OnInit {
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


  basehref: String = FCTSDashBoard.BaseHref;
  CorrAttach: CorrAttachDocuments;
  frameurl: string;
  returnedURl: string;
  AdvancedSearch: boolean = false;
  selectedCorrespondence: Correspondence;
  previewViewCorrespondence: Correspondence;
  quickViewCorrespondence: Correspondence;
  correspondenceData: Correspondence[];
  selection = new SelectionModel<Correspondence>(true, []);
  currentPageNumber: number = 1;
  correspondData: any[] = this.correspondData;
  DocumentPreview: boolean;
  progbar = true;
  documentPreviewURL: DocumentPreview[];
  //Pagination Variiables
  itemsPerPage: number = FCTSDashBoard.DefaultPageSize;
  pagenumber: number = 1;
  totalCount: number;
  searchExtOrgFieldShow: boolean;
  searchSenderDeptFieldShow: boolean;
  searchRecipientDeptFieldShow: boolean;


  constructor(private correspondenceService: CorrespondenceService,
	private CorrespondenceShareService: CorrespondenceShareService,
    private route: ActivatedRoute,						  
    private router: Router, private fb: FormBuilder, public dialogU: MatDialog) { }
  AdvancedSearchButton() {
    this.AdvancedSearch = !this.AdvancedSearch;
  }
  ngOnInit() {
    this.searchExtOrgFieldShow = false;
    this.searchRecipientDeptFieldShow = true;
    this.searchSenderDeptFieldShow = true;
    this.getPage(1);
  }

  onSelect(correspondData: Correspondence): void {
    this.selectedCorrespondence = correspondData;
  }
  previewViewWrapper(correspondData: Correspondence): void {
	if (correspondData) {this.setPerformerPermission(correspondData)};
    this.getCoverDocumentURL('' + correspondData.CoverID);

    this.previewViewCorrespondence = correspondData;
  }
  quickViewWrapper(correspondData: Correspondence): void {
    this.quickViewCorrespondence = correspondData;
  }

  getPage(page: number): void {
    const perPage = FCTSDashBoard.DefaultPageSize;
    const start = ((page - 1) * perPage) + 1;
    const end = (start + perPage) - 1;
    this.getCorrespondence("IntOutSig", start, end, page, this.SearchFilterData);
    this.selection.selected.length>0 ? this.selection.clear() : null ;
  }

  getCorrespondence(pageType: string, startrow: number, endrow: number, page: number, SearchFilterData: any): void {
    this.progbar = true;
    this.correspondenceService
      .getDashboardMain(pageType, startrow, endrow, SearchFilterData)
      .subscribe(correspondenceData => {
        this.correspondenceData = correspondenceData;
        this.progbar = false;
        if (startrow == 1) {
          this.totalCount = correspondenceData[0].totalRowCount;
        }
        this.pagenumber = page;
      }
      )
  }
/********************************************************************************* */
sendStatus(status: string): void{
  let CompleteRequestFinal: statusRequest = new statusRequest;
  CompleteRequestFinal = this.CorrespondenceShareService.buildObject(this.selection.selected, status, "Multiselect")
  this.CorrespondenceShareService.setTransferToStatus(CompleteRequestFinal).subscribe(result=>{
      this.getPage(this.pagenumber);
    });
}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.correspondenceData.length;
    return numSelected === numRows;
  }
  selectionNewInboxAll() {
    const numSelectedNewInboxlCorrespondence = this.selection.selected.length;
    const numRowsNewInboxlCorrespondence = this.correspondenceData.length;
    return (
      numSelectedNewInboxlCorrespondence === numRowsNewInboxlCorrespondence
    );
  }
  selectionNewInboxAllCorrespondence() {
    this.selectionNewInboxAll()
      ? this.selection.clear()
      : this.correspondenceData.forEach(element => this.selection.select(element));
  }
   /** The label for the checkbox on the passed row */
  checkboxLabel(correspondData?: any): string {
    if (!correspondData) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(correspondData) ? 'deselect' : 'select'} row ${correspondData.position + 1}`;
  }
  /***************************************************************************** */
  SearchDashboard(): void {
    this.getPage(1);
  }
  routeToDetailsPage(correspondenceData: Correspondence) {
	this.setPerformerPermission(correspondenceData);
    this.router.navigate(['/dashboard/external/correspondence-detail'],
    { queryParams: { VolumeID: correspondenceData.VolumeID, CorrType: correspondenceData.CorrFlowType, CoverID: correspondenceData.CoverID, locationid: correspondenceData.DataID, TaskID: correspondenceData.SubWorkTask_TaskID, TransID: correspondenceData.transID, TransIsCC: correspondenceData.transIsCC } });
  }
  getCoverDocumentURL(CoverID: String): void {

    this.correspondenceService.getDocumentURL(CoverID)
      .subscribe(documentPreviewURL => this.documentPreviewURL = documentPreviewURL);
  }
  onSearchDashboardButtonClick(selecetedValues: any): void {
    this.SearchFilterData = selecetedValues;
    this.SearchDashboard();
  }
  /*****************************************Popup**************************************** */
  popupOpenDialog(correspondData: Correspondence, status: string):void {
    if(status =="1" && correspondData.transID != 0 && correspondData.transStatus == 0 ){
      const dialogRef = this.dialogU.open(CorrespondenceActionComponent, {
        width: '100%',
        panelClass: 'correspondence-action',
        maxWidth: '30vw',
        data: {
          data: correspondData,
          callplace: "SingleDashboard"
        }
      }).afterClosed().subscribe( result => {
        result == "Reload" ? this.getPage(this.pagenumber) : null;
        });
    } else{
      let CompleteRequestFinal: statusRequest = new statusRequest;
      CompleteRequestFinal = this.CorrespondenceShareService.buildObject(correspondData, status, "SingleDashboard","")
      this.CorrespondenceShareService.setTransferToStatus(CompleteRequestFinal).subscribe(result => { this.getPage(this.pagenumber) });
    }
  } 
  /*************************************************************************************** */

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
	 setPerformerPermission(correspondData: Correspondence): void {
    this.correspondenceService.setPerformerPermission(correspondData).subscribe();
  }															
}

