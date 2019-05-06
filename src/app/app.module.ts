import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform, Directive, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularSplitModule } from 'angular-split';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
// import { APP_BASE_HREF } from '@angular/common';
// import { UserService } from './modules/users/services/user.service';
import { BaseUrlService } from './service/base-url.service';
import { SystemService } from './service/system.service';
import { InterceptorsService } from './service/interceptorService';
import { AuthService } from './service/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalService } from './service/modal-service';
import { ReferenceDataService } from './service/reference-data-service';
import { LogoutComponent } from './components/logout/logout.component';
import { SharedModule } from './shared';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { AppRoutingModule, routingComponents } from './app.routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSplitModule,
    HttpClientModule,
    SharedModule,
    AgGridModule.withComponents(null),
    ToastrModule.forRoot()
  ],
  providers: [
    BaseUrlService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorsService, multi: true },
    SystemService,
    ReferenceDataService,
    ModalService,
    AuthService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }