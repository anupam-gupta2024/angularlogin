import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  // : MaybeAsync<GuardResult>
        if (this.authService.isLoggedIn())
            return true;
        else {
            // move to the login page
            // if our access token expires, then it will refresh the token
            const isRefreshed = await this.authService.refreshingToken();
            if (!isRefreshed) {
                this.router.navigate(['./login']);
            }

            return isRefreshed;
        }
    }

    constructor(private authService: AuthService, private router: Router) { }
}