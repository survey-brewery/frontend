import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { SurveyService } from "../components/auth/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private surveyService: SurveyService, private _router: Router, private _toastrService: ToastrService,) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.surveyService.getToken();
    const loggedUserId:any = this.surveyService.getLoggedUserId(); 
    if (token && this.surveyService.isAuthenticated()) {
      const cloned = request.clone({
        headers: this.httpHeaders.append("Authorization", "Bearer " + token),
        params: request.params.set("logged_user_id", loggedUserId)
      });
      // console.log('token',token);
      // console.log('this.surveyService.isAuthenticated()',this.surveyService.isAuthenticated());

      return next.handle(cloned).pipe(
        finalize(() => {}),
        catchError((err) => this.handleAuthError(err))
      );
    } else {
      return next.handle(request).pipe(
        finalize(() => {}),
        catchError((err) => this.handleAuthError(err))
      );
    }
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    console.log(err.error.message);
    if (err.error.status == 401) {
      this._toastrService.warning(err.error.message);
      // this._router.navigate(['']);
      localStorage.clear
    }
    return throwError(err);
  }
}
