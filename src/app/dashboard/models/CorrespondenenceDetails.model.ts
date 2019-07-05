export class CorrespondenenceDetailsModel {
  CorrFolderName: string;
  AttachID: string;
  AttachCorrID: string;
  AttachCorrCoverID: string;
  AttachCorrAttachmentsID: string;
  VolumeID: string;
  SubWorkID: string;
  AttachCorrMiscID: string;
  countconnections: string;
  SubWork_Status: string;
  ID: string;
  UserID: string;
  TransferUserID: string;
  Status: string;
  CCstatus: string;
  holdSecretaryID: string;
  TransferType: string;
  isCC: string;
  perform07: string;
  WasOpened: string;
  AttachementsDocCount: string;

}

export interface ShowSections{
  Sender?: SectionDisplay;
  Recipient?: SectionDisplay;
  CC?: SectionDisplay;
  Correspondence?: SectionDisplay;
  Cover?: SectionDisplay;
  Attachments?: SectionDisplay;
  UserCollaboration?: SectionDisplay;
  LinkedCorrespondence?: SectionDisplay;
  Comments?: SectionDisplay;
  Transfer?: SectionDisplay;
  Distribution?: SectionDisplay;
}

interface SectionDisplay{
  Show: boolean;
  Modify: boolean;
}
/*
export class statusRequest{
  status: string;
  setStatusRow: setStatusRow[];
}

export class setStatusRow{
  subworkid: string;
  dataid: string;
  isCC: string;
  transID: string;
  NotesComplete: string;
  currentStatus: string;
  userid: string;
}*/