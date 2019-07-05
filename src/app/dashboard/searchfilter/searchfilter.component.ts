import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CorrespondenceService } from "src/app/dashboard/services/correspondence.service";
import { SelectionModel } from "@angular/cdk/collections";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { switchMap, debounceTime } from 'rxjs/operators';
import { Observable } from "rxjs";
import { DashboardFilter, DashboardFilterResponse } from "../models/DashboardFilter"
@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html'
})
export class SearchfilterComponent implements OnInit {


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
  myControl = new FormControl();
  ExteranlOrgnizationControl = new FormControl();
  DashboardFilters: any[];
  AdvancedSearch: boolean = false;
  filteredExtOrgNames: Observable<DashboardFilterResponse>;
  constructor(private correspondenceService: CorrespondenceService) { }
  AdvancedSearchButton() {
    this.AdvancedSearch = !this.AdvancedSearch;
  }
  
  _showExtFld: boolean;
  _showRecipientDeptFld: boolean;
  _showSenderDeptFld: boolean;

  @Input()
  set searchExtOrgFieldShow(searchExtOrgFieldShow: boolean) {
    this._showExtFld = searchExtOrgFieldShow;
  }
  @Input()
  set searchSenderDeptFieldShow(searchSenderDeptFieldShow: boolean) {
    this._showSenderDeptFld = searchSenderDeptFieldShow;
  }
  @Input()
  set searchRecipientDeptFieldShow(searchRecipientDeptFieldShow: boolean) {
    this._showRecipientDeptFld = searchRecipientDeptFieldShow;
  }


  @Output()
  searchDashboardButtonClicked: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit() {
    this.getDashboardFilters();
    this.filteredExtOrgNames = this.ExteranlOrgnizationControl.valueChanges
      .pipe(
      debounceTime(300),
      switchMap(value => this.correspondenceService.searchExtOrgName(value))
      );
  }

  getDashboardFilters(): void {
    this.correspondenceService
      .getDashboardFilters()
      .subscribe(
      DashboardFilters => (this.DashboardFilters = DashboardFilters)
      );
  }

  searchDasboardButtonAction() {
    this.searchDashboardButtonClicked.emit(this.SearchFilterData);
  }

  displayFn(attribute?: any): string | undefined {
    return attribute ? attribute.EN : undefined;
  }
  displayExtOrgName(extOrgValue: DashboardFilter) {
    debugger;
    if (extOrgValue) { return extOrgValue.Name; }
  }

}
