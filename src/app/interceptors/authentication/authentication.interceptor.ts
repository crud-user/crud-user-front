import { HttpInterceptorFn } from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.includes('users')) {
      const {accessToken, role} =  JSON.parse(sessionStorage.getItem("data")||''); 
      if(accessToken){
        const authRequest = req.clone({
          headers: req.headers.set("Authorization",`Bearer ${accessToken}`),
        })
        return next(authRequest);
      }
    }
      return next(req);
};
