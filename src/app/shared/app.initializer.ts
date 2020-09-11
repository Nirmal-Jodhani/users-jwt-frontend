// IF USER DONT LOGOUT LAST TIME THEN USING COOKIE REFRESH THE TOKEN

import { AuthenticationService } from '../authentication.service';

export function appInitializer(authenticationService: AuthenticationService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        // console.log('app initialization');
        authenticationService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}