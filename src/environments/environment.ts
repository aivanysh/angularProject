// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const FCTSDashBoard = {
  WRApiV1: "/api/v1/webreports/",
  //getDashboardInbox: "35872", /*isnt used*/
  getMenuCountExt: "CTA_SidebarExtCount",
  getUserOverallData: "CTA_UserDataDashboard",
  ExternalInbNew: "CTA_Dash_ExtInbNew",
  ExternalFullSearch: "CTA_ExtFullSearch",
  DashboardReportMain: "CTA_DashboardWR",
  BravaURL: 'CTA_DocPreview',
  SearchFilters: 'CTA_SearchFilters',
  SenderInfo: 'CTA_SenderInfoRO',
  RecipientInfo: 'CTA_RecipientInfoRO',
  CCInfo: 'CTA_CCInfoRO',
  CoverSectionInfo: 'CTA_CoverSectionInfoRO',
  AttachmentSectionInfo: 'CTA_AttachSectionInfoRO',
  ExtOrgNameFilter: 'CTA_ExtOrgNameFilter',
  TransferAttributes: 'CTA_TransferAttributes',
  GetTransferFields: 'CTA_GetParticipantInfoByName',
  getcorrespondenceinfoRO: 'CTA_GetCorrInfoRO',
  WfAuditReport: 'CTA_AuditReportWF',
  TransferAuditReport: 'CTA_AuditReportTransfer',
  TransferHistoryTab: 'CTA_TransferTab',
  getMenuCountInt: 'CTA_SidebarIntCount',
  createTransfer: 'CTA_SetTranferUsers',
  GetCorrRecordData: 'CTA_GetCorrRecordData',
  GetCorrFolderName: 'CTA_GetCorrFolderName',
  UserCollaborationRO: 'CTA_UserCollaborationRO',
  WorkflowCommentsList: 'CTA_WFCommentsList',
  CorrConnectionsList: 'CTA_CorrConnectionsList',
  PropertiesURL: 'PropertiesWidget',
  DefaultPageSize: 10,
  SetPerformerPermission: 'CTA_SetPerformPerm',
  SetStatuses: 'CTA_SetStatus', //added 01/07/2019,
  BaseHref: '/',
  //BaseHref: '/img/fctsangular/fctsapp/',
  CSUrl: 'http://mv2cdmsadp02/otcs/cs.exe'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
