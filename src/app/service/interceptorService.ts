import { Injectable } from '@angular/core';
import {  HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InterceptorsService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const h = location.hostname;
      const p = location.port;
      if ( p === '4200') {
        const proxyReq = req.clone({ url: `${ 'http://localhost:8080/isuite' }${ req.url }` });
        return next.handle(proxyReq);
      } else {
        if ( location.pathname.startsWith('/isuite2/') ) {
          /* QA is testing using isuite2 */
          const proxyReq1 = req.clone({ url: `${ 'http://' + h + ':' + p + '/isuite2' }${ req.url }` });
          return next.handle(proxyReq1);
        } else {
          const proxyReq2 = req.clone({ url: `${ 'http://' + h + ':' + p + '/isuite' }${ req.url }` });
          return next.handle(proxyReq2);
        }
      }
    }
}