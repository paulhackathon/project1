export interface IncidentSelector2Vo {
    hierachalGroupField: any[];
    id:number;
    incidentId: number;
    incidentGroupId: number;
    name: string;
    type: string;
    incidentNumber: string;
    unitCode: string;
    countryCode: string;
    eventType: string;
    startDate: string;
    agency: string;
    defaultAccountingCode: string;
    defaultAccountingCodeAgency: string;
    isSiteManaged: boolean;
    children: any[];
}
