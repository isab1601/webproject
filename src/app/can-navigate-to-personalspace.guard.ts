import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./shared/authentication.service";
@Injectable({
  providedIn: 'root'
})
export class CanNavigateToPersonalspaceGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      window.alert("Sie müssen sich einloggen, um den persönlichen Bereich zu sehen!");
      this.router.navigate(["../"], {relativeTo: this.route});
      return false;
    }
  }
}
