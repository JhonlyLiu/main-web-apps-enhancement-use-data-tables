import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";


// @ts-ignore
export function RouteGuard({children}): any {

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => { authCheck(router.asPath); }, []);

  /**
   * authCheck
   *
   * This function is acting like Middleware where it checks for
   * incoming request, whatever user has authenticated or not.
   *
   * If user try to access protected resource without any valid token,
   * the user will redirect to login page instead.
   *
   * @param url
   */
  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in

    /**
     * Register every unguarded resources path into here.
     */
    const unguardedResources = [
      '/',
      '/forgot-pass',
      '/change-pass',
      '/change-forgottenfpass',
    ];

    const path = url.split('?')[0];

    // If Cookies token is not found and the path is not included within unguardedResources
    if (!Cookies.get('token') && !unguardedResources.includes(path)) {
      router.push({
        pathname: '/auth/login'
      });
    }

    setAuthorized(true);
  }

  return (authorized && children);
}