import { Component, OnInit, Pipe, PipeTransform,Inject } from '@angular/core';
import { CorrResponse } from '../../services/correspondence-response.model';
import { Correspondence } from 'src/app/dashboard/services/correspondence.model';
import { CorrespondenceDetailsService } from 'src/app/dashboard/services/correspondence-details.service';
import { ActivatedRoute } from '@angular/router';
import { FCTSDashBoard } from '../../../../environments/environment';
import { DomSanitizer } from "@angular/platform-browser";
import { DocumentPreview } from "../../services/documentpreview.model";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DashboardFilter, DashboardFilterResponse, transferAttributes } from "../../models/DashboardFilter";
import { switchMap, debounceTime } from 'rxjs/operators';
import { Location } from '@angular/common';
import { CorrespondenenceDetailsModel, ShowSections } from '../../models/CorrespondenenceDetails.model';
import { CorrespondenceActionComponent } from 'src/app/dashboard/correspondence-action/correspondence-action.component';
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
  selector: 'app-correspondence-detail',
  templateUrl: './correspondence-detail.component.html',
  styleUrls: ["./correspondence-detail.component.scss"]
})
export class CorrespondenceDetailComponent implements OnInit {
  constructor(
    private _correspondenceDetailsService: CorrespondenceDetailsService
    , private CorrespondenceShareService: CorrespondenceShareService
    , private route: ActivatedRoute, public dialog: MatDialog, private _location: Location) { }
  basehref: String = FCTSDashBoard.BaseHref;
  CSUrl: String = FCTSDashBoard.CSUrl;
  VolumeID: string;
  CoverID: string;
  locationid: string;
  CorrespondencType: string;
  taskID: string;
  CorrespondenceFolderName: Observable<any>;
  transID: string;
  onbehalfUserid: string;
  panelOpenState = false;
  correspondenceData: CorrespondenenceDetailsModel;
  correspondenceRecipientDetailsData: CorrResponse[];
  correspondenceSenderDetailsData: CorrResponse[];
  correspondenceCCtData: CorrResponse[];
  correspondenceCovertData: CorrResponse[];
  correspondenceAttachmentsData: CorrResponse[];
  correspondenceCollaborationDetail: CorrResponse[];
  corrConnectionsData: CorrResponse[];
  expanded: boolean = true;
  expandedAction: boolean = true;
  expandedRightAction: boolean = true;
  documentPreviewURL: DocumentPreview[];
  correspondenceMetadata: CorrResponse[];
  transferhistorytabData: CorrResponse[];
  CorrAttachTransDetail: CorrResponse[];
  correspondenceCommentsDetail: CorrResponse[];
  //Progress icons per Tab
  ccProgbar = false;
  correspondenceProgbar = false;
  coverProgbar = false;
  recipientProgbar = false;
  senderProgbar = false;
  attachmentsProgbar = false;
  transferProgbar = false;
  userCollaborationProgbar = false;
  commentsProgbar = false;
  openedSubComment = false;
  openedComment = false;
  openedSubReplies = false;
  corrConnectionsProgbar = false;
  sectionDisplay: ShowSections = {};
  ngOnInit() {
    this.VolumeID = this.route.snapshot.queryParamMap.get('VolumeID');
    this.CoverID = this.route.snapshot.queryParamMap.get('CoverID');
    this.CorrespondencType = this.route.snapshot.queryParamMap.get('CorrType');
    this.locationid = this.route.snapshot.queryParamMap.get('locationid');
    this.taskID = this.route.snapshot.queryParamMap.get('TaskID');
    this.transID = this.route.snapshot.queryParamMap.get('TransID');

    //Section display 
    this.sectionDisplay = this._correspondenceDetailsService.showHideSection(this.CorrespondencType, this.taskID)

    //LoadAllCorrandTransInformation
    this.ReadRecord(this.locationid, this.transID);

    //Get the FolderName to Show as the Heading

    this.CorrespondenceFolderName = this._correspondenceDetailsService.getCorrespondenceFolderName(this.VolumeID);

    //Load Correspondence Sender Details
    this.getCorrespondenceSenderDetails(this.VolumeID, this.CorrespondencType);
    //Load Correspondence Recipient Details
    this.getCorrespondenceRecipientDetails(this.VolumeID, this.CorrespondencType);
    //load Cover Section
    this.getCorrespondenceCoverDetail(this.VolumeID);
    //Load Preview
    this.getCoverDocumentURL(this.CoverID);
  }

  ngAfterViewInit(){
    //console.log(this.correspondenceData);
	this.sectionDisplay = this._correspondenceDetailsService.modifySection(this.sectionDisplay, this.correspondenceData);	
  }
	
  ReadRecord(locationid: string, transid: string) {
    this._correspondenceDetailsService
      .getCorrRecord(locationid, transid, CSConfig.globaluserid)
      .subscribe(correspondenceData => this.correspondenceData = correspondenceData[0]);
  }
  // getCorrespondenceDetails(VolumeID: string, CorrespondencType: String): void {
  //   this.correspondenceSenderDetailsService.getCorrespondenceDetails()
  //     .subscribe(correspondenceDetailsData => this.correspondenceDetailsData = correspondenceDetailsData);
  //   console.log(this.correspondenceDetailsData);
  // }
  backNavigation() {
    this._location.back();
  }
  getCorrespondenceRecipientDetails(VolumeID: string, CorrespondencType: String): void {
    this._correspondenceDetailsService
      .getCorrespondenceRecipientDetails(VolumeID, CorrespondencType)
      .subscribe(
      correspondenceRecipientDetailsData => (this.correspondenceRecipientDetailsData = correspondenceRecipientDetailsData)
      );
  }
  getCorrespondenceSenderDetails(VolumeID: string, CorrespondencType: String): void {
    this._correspondenceDetailsService.getCorrespondenceSenderDetails(VolumeID, CorrespondencType)
      .subscribe(correspondenceSenderDetailsData => this.correspondenceSenderDetailsData = correspondenceSenderDetailsData);
  }
  getCorrespondenceCCDetail(VolumeID: String, CorrFlowType: String): void {
    this.ccProgbar = true;
    this._correspondenceDetailsService.getCorrespondenceCCDetail(VolumeID, CorrFlowType)
      .subscribe(correspondenceCCtData => {
        this.correspondenceCCtData = correspondenceCCtData;
        this.ccProgbar = false;
      });

  }
  ccShowData() {
    this.getCorrespondenceCCDetail(this.VolumeID, this.CorrespondencType);

  }
  getCorrespondenceCoverDetail(VolumeID: String): void {
    this.coverProgbar = true;
    this._correspondenceDetailsService.getCorrespondenceCoverDetail(VolumeID)
      .subscribe(correspondenceCovertData => {
        this.correspondenceCovertData = correspondenceCovertData;
        this.coverProgbar = false
      });
  }
  getCoverDocumentURL(CoverID: String): void {

    this._correspondenceDetailsService.getDocumentURL(CoverID)
      .subscribe(correspondenceCovertData => this.documentPreviewURL = correspondenceCovertData);
  }

  getCorrespondenceAttachmentsDetail(): void {
    this.attachmentsProgbar = true;
    this._correspondenceDetailsService.getCorrespondenceAttachmentsDetail(this.VolumeID, this.CorrespondencType)
      .subscribe(correspondenceAttachmentsData => {
        this.correspondenceAttachmentsData = correspondenceAttachmentsData;
        this.attachmentsProgbar = false
      });
  }

  getCorrespondenceInfoData(): void {
    this.correspondenceProgbar = true;

    this._correspondenceDetailsService.getCorrespondenceMetadataDetail(this.VolumeID, this.CorrespondencType)
      .subscribe(correspondenceMetadata => {
        this.correspondenceMetadata = correspondenceMetadata;
        this.correspondenceProgbar = false
      });
  }

  getTransferHistoryData(VolumeID: String): void {
    this.transferProgbar = true;
    this._correspondenceDetailsService.getTransferHistoryTab(VolumeID)
      .subscribe(transferhistorytabData => {
        this.transferhistorytabData = transferhistorytabData;
        this.transferProgbar = false;
      });
  }
  attachmentShowData() {
    this.getCorrespondenceAttachmentsDetail();
  }
  transferTabShowData() {
    this.getTransferHistoryData(this.VolumeID);
  }
  openDialog() {
    this.dialog.open(transferDialogBox, {
      data: this.correspondenceData,
      width: '100%',
      // margin: 'auto',
      panelClass: 'transferDialogBoxClass',
      maxWidth: '85vw'
    });
  }
/***************************************************************************************/  
  popupOpenDialog(status: string): void {
    if(status =="1" && this.correspondenceData.ID != "0" && this.correspondenceData.Status == "0" ){  
      const dialogRef = this.dialog.open(CorrespondenceActionComponent, {
          width: '100%',
          panelClass: 'correspondence-action',
          maxWidth: '30vw',
          data: {
            data: this.correspondenceData,
            callplace: "CorrDetails"
          }
      }); 
    } else {
      let CompleteRequestFinal: statusRequest = new statusRequest;
      CompleteRequestFinal = this.CorrespondenceShareService.buildObject(this.correspondenceData, status,"CorrDetails", "")
      this.CorrespondenceShareService.setTransferToStatus(CompleteRequestFinal).subscribe();
    }
  }



  correspondenceShowData() {
    this.getCorrespondenceInfoData();
  }
  expandeActionLeftButton() {
    this.expandedAction = !this.expandedAction;
  }
  expandeActionRightButton() {
    this.expandedRightAction = !this.expandedRightAction;
  }
  collaborationShowData() {
    this.getCorrespondenceCollaborationData();
  }
  getCorrespondenceCollaborationData(): void {
    this.userCollaborationProgbar = true;
    this._correspondenceDetailsService.getCorrespondenceCollaborationInfoRO(this.VolumeID, this.CorrespondencType)
      .subscribe(correspondenceCollaborationDetail => {
        this.correspondenceCollaborationDetail = correspondenceCollaborationDetail;
        this.userCollaborationProgbar = false
      });
  }
  showCommentsData() {
    this.getCommentsData();
  }
  getCommentsData(): void {
    this.commentsProgbar = true;
    this._correspondenceDetailsService.getCommentsData(this.VolumeID)
      .subscribe(correspondenceCommentsDetail => {
        this.correspondenceCommentsDetail = correspondenceCommentsDetail;
        this.commentsProgbar = false
      });
  }

  corrconnectionsData() {
    this.getCorrConnectionsData();
  }
  getCorrConnectionsData(): void {
    this.corrConnectionsProgbar = true;
    this._correspondenceDetailsService.getCorrConnectionsData(this.locationid)
      .subscribe(corrConnectionsData => {
        this.corrConnectionsData = corrConnectionsData;
        this.corrConnectionsProgbar = false
      });
  }
  GetCoverLetter() {

    alert("asd");
  }

  showActionProperties(dataID: string): void {
    this._correspondenceDetailsService.getDocumentPropertiesURL(dataID)
      .subscribe(correspondenceCovertData => this.documentPreviewURL = correspondenceCovertData);
  }


}


export interface userValueResponse {
  OrgID: number;
  OrgName_En: string;
  OrgName_Ar: string;
  DepID: number;
  DepName_En: string;
  DepName_AR: string;
  SecID: number;
  SecName_En: number;
  SecName_A: number;
  RoleID: number;
  RoleName_En: string;
  RoleName_Ar: string;
  NameID: number;
  NameLogin: string;
  Name_En: string;
  Name_Ar: string;
  Type: string;
  RecipientUserID: number;
  RecipientVersion: number;
  Val_En: string;
  Val_Ar: string;
}

export class TransferRequest {
  volumeid: number;
  transferlist: TransferRequestFinal[];
}

export class transfer_list {
  Department: userValueResponse;
  Purpose: number;
  To: userValueResponse;
  Priority: string;
  Comments: string;
  DueDate: string;
}
export class TransferRequestFinal {
  Department: string;
  Purpose: number;
  To: string;
  Priority: string;
  Comments: string;
  DueDate: string;
  constructor() { }

}


@Component({
  selector: 'correspondence-tranfer-dialog',
  templateUrl: 'correspondence-tranfer-dialog.component.html',
})


export class transferDialogBox implements OnInit {
  isReady: boolean = false;
  basehref: String = FCTSDashBoard.BaseHref;
  filteredEmpNames: Observable<DashboardFilterResponse[]>[] = [];
  filteredDepNames: Observable<DashboardFilterResponse[]>[] = [];
  TransferFormControlEmpName = new FormControl();
  TransferFormControlDepName = new FormControl();
  transfer_form: FormGroup;
  transferPurpose: any;
  transferPriority: any;
  index: string;
  transferRequestForm: FormGroup;
  transferAttribute: transferAttributes[];
  transferResponse: CorrResponse[];
  VolumeID: string;
  CoverID: string;
  CorrespondencType: string;
  locationid: string;
  finalRequest: TransferRequestFinal[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<transferDialogBox>, private _correspondenceDetailsService: CorrespondenceDetailsService,
    private transfer_data: FormBuilder, private route: ActivatedRoute) {
    this.createForm();
  }
  createForm() {
    this.transferRequestForm = this.transfer_data.group({
      date: [{ value: '', disabled: true }, [Validators.required]],
      transfer_list: this.initItems()
    });
    this.ManageNameControl(0);
    this.isReady = true;
  }
  initItems() {
    var formArray = this.transfer_data.array([]);

    for (let i = 0; i < 1; i++) {
      formArray.push(this.transfer_data.group({
        Department: ['', Validators.required],
        Purpose: ['', Validators.required],
        To: ['', Validators.required],
        Priority: ['', Validators.required],
        Comments: ['', Validators.required],
        DueDate: ['', Validators.required]
      }));
    }
    return formArray;
  }
  ngOnInit() {
    this.VolumeID = this.route.snapshot.queryParamMap.get('VolumeID');
    this.CoverID = this.route.snapshot.queryParamMap.get('CoverID');
    this.CorrespondencType = this.route.snapshot.queryParamMap.get('CorrType');
    this.locationid = this.route.snapshot.queryParamMap.get('locationid');
    this.getTransferPurposeAndPriority();
  }

  ManageNameControl(index: number) {
    debugger;
    var arrayControl = this.transferRequestForm.get('transfer_list') as FormArray;
    this.filteredDepNames[index] = arrayControl.at(index).get('Department').valueChanges
      .pipe(
      debounceTime(300),
      switchMap(value => this._correspondenceDetailsService.searchTransferFieldName(value, 'DEP'))
      );

    this.filteredEmpNames[index] = arrayControl.at(index).get('To').valueChanges
      .pipe(
      debounceTime(300),
      switchMap(value => this._correspondenceDetailsService.searchTransferFieldName(value, 'EMP'))
      );
  }

  get transferLists() {
    return this.transferRequestForm.get('transfer_list') as FormArray;
  }
  ///////////End ////////////////

  /////// This is new /////////////////

  addTransferRow() {
    debugger;
    const controls = <FormArray>this.transferRequestForm.controls['transfer_list'];
    this.transferLists.push(this.transfer_data.group({
      Department: ['', Validators.required],
      Purpose: ['', Validators.required],
      To: ['', Validators.required],
      Priority: ['', Validators.required],
      Comments: ['', Validators.required],
      DueDate: ['', Validators.required]
    }));
    this.ManageNameControl(controls.length - 1);
  }

  deleteTransferRow(index) {
    this.transferLists.removeAt(index);
  }


  transferDielogBoxClose(): void {
    this.dialogRef.close();
  }
  purposeChange() {
    this.transferPurpose = this.transferPurpose
  }
  priorityChange() {
    this.transferPriority = this.transferPriority
  }
  getTransferPurposeAndPriority() {
    this._correspondenceDetailsService.getTransferPurposeAndPriority()
      .subscribe(transferAttribute => this.transferAttribute = transferAttribute);
  }
  displayFieldValue(fieldValue: userValueResponse) {
    if (fieldValue) { return fieldValue.Val_En }
  }
  postTransferToRequest(myForm: any): void {
   // console.log('value: ', this.transferRequestForm.value);
    // this.finalRequest = <Transferlist[]>this.transferRequestForm.value;

    let CorArray = this.transferRequestForm.value;

    for (let i = 0; i < CorArray.transfer_list.length; i++) {
      let TList: TransferRequestFinal = new TransferRequestFinal;
      // Department: string;;
      // Purpose: number;
      // To: string;
      // Priority: string;
      // Comments: string;
      // DueDate: string;
      TList.Department = CorArray.transfer_list[i].Department.RecipientUserID;
      TList.To = CorArray.transfer_list[i].To.RecipientUserID;
      TList.Purpose = CorArray.transfer_list[i].Purpose;
      TList.Priority = CorArray.transfer_list[i].Priority;
      TList.Comments = CorArray.transfer_list[i].Comments;
      TList.DueDate = CorArray.transfer_list[i].DueDate;
      this.finalRequest.push(TList);
    }
    //this.VolumeID = this.route.snapshot.queryParamMap.get('VolumeID');
    // this._correspondenceDetailsService.createTransferRequest(TList, this.VolumeID);
    //this._correspondenceDetailsService.createTransferRequest(this.finalRequest, this.VolumeID, this.locationid)
    this._correspondenceDetailsService.createTransferRequest(this.finalRequest, this.data)
      .subscribe(transferResponse => this.transferResponse = transferResponse);
    this.dialogRef.close();
  }

  addGroup() {
    const val = this.transfer_data.group({
      Department: ['', Validators.required],
      Purpose: ['', Validators.required],
      To: ['', Validators.required],
      Priority: ['', Validators.required],
      Comments: ['', Validators.required],
      DueDate: ['', Validators.required]
    });
    this.newMethod(val);
  }
  private newMethod(val: FormGroup) {
    const transfer_form = this.transfer_form.get('times') as FormArray;
    transfer_form.push(val);
    this.index = " ";
  }
  removeGroup(index: number) {
    const transfer_form = this.transfer_form.get('times') as FormArray
    transfer_form.removeAt(index);
  }
  trackByFn(index: number, item: any) {
    return index;
  }

}
