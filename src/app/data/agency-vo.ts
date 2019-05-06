import { AbstractVo } from './abstract-vo';
import { AgencyGroupVo } from './agency-group-vo';
import { RateGroupVo } from './rate-group-vo';

export interface AgencyVo {
    agencyCd: string;
    agencyNm: string;
    theAgencyType: string;
    deletedDate: Date;
    standard: boolean;
    state: boolean;
    agencyGroupVo: AgencyGroupVo;
    rateGroupVo: RateGroupVo;
    active: boolean;
    // incidentVo;
    // incidentGroupVo;
 }
