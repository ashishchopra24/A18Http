import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on its way');
    const newReq = req.clone({
      headers: req.headers.append('newHeader', 'xyz')
    });
    return next.handle(newReq);
  }
}
