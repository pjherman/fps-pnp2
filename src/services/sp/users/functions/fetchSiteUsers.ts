
// import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { Web } from "@pnp/sp/webs";

import { check4Gulp } from "../../CheckGulping";
import { ISiteUsersResults } from "../interfaces/ISiteUsersResults";
import { check4This } from "../../CheckSearch";

export async function fetchSiteUsers(url: string, ): Promise<ISiteUsersResults> {

  if ( !url ) { return { users: null as any, e: 'NoWeb', status: 'NoWeb' } ; }

  try {

    url = `${url}`; // Did this because it previosly had + '' at the end... not sure why
    const thisWeb = Web(url);

    const allUsers: ISiteUserInfo[] = await thisWeb.siteUsers.get();

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 SUCCESS: fetchSiteUsers ~ 21`, allUsers ) ; };
    return { users: allUsers, e: null, status: 'Success' }

  } catch (e) {
    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchSiteUsers ~ 25`, e ) ; };
    return { users: null as any, e: e, status: 'Error' }

  }
}
