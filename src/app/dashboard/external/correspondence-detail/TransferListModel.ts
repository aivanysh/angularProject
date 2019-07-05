export class TransferRequest {
    volumeid: number;
    transferlist: Transferlist[];
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


export class Transferlist {
    Department: userValueResponse;
    Purpose: number;
    To: userValueResponse;
    Priority: string;
    Comments: string;
    DueDate: string;


    constructor(public name: string, public isbn: string) { }
}