import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DialogueVo } from '../data/dialogue/dialoguevo';
import { BaseUrlService } from './base-url.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ReferenceDataService {

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

    getEventTypeList(): Observable<DialogueVo> {
      return this.http.get<DialogueVo>('/service/refdata/eventtypes');
    }

    getStandardOrgList(): Observable<DialogueVo> {
      return this.http.get<DialogueVo>('/service/refdata/standardOrgs');
    }

    getPdcList(): Observable<DialogueVo> {
      return this.http.get<DialogueVo>('/service/refdata/pdcs');
    }
}
