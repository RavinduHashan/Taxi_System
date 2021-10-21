// import {Injectable} from '@angular/core';
// import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
// import {AuthInterceptor} from '../auth/auth.interceptor';
// import {Observable, throwError} from 'rxjs';
// import {catchError, map} from 'rxjs/operators';
// ​
// declare const $;
// ​
// @Injectable()
// export class HTTPInterceptor implements HttpInterceptor {
//   constructor(
//     public auth: AuthInterceptor
//   ) {
//   }
// ​
//   private static showMessage(message: string, success: boolean) {
//     $.notify({
//       // options
//       icon: `fa ${success ? 'fa-check-circle' : 'fa-warning'}`,
//       message
//     }, {
//       // settings
//       allow_dismiss: !success,
//       delay: success ? 1250 : 3000,
//       animate: {
//         enter: 'animated bounceInDown',
//         exit: 'animated bounceOutUp'
//       },
//       placement: {
//         to: 'bottom',
//         align: 'center'
//       },
//       type: success ? 'success' : 'danger'
//     });
//   }
// ​
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// ​
//     request = request.clone({
//       setHeaders: {
//         withCredentials: 'true',
//       }
//     });
//     return next.handle(request).pipe(
//       map((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse) {
//           if (event.body && event.body.message) {
//             HTTPInterceptor.showMessage(event.body.message, event.body.done);
//           }
//           return event;
//         }
//       }),
//       catchError((error: HttpErrorResponse) => {
//         HTTPInterceptor.showMessage(`${error.status} ${error.statusText}`, false);
//         return throwError(error);
//       })
//     );
//   }
// }
