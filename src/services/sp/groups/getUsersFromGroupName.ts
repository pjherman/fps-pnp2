
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { Web } from "@pnp/sp/webs";

import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { ISiteUsersResults } from "../users/interfaces/ISiteUsersResults";
import { check4This } from "../CheckSearch";

/**
 * 
 * @param webUrl 
 * @param thisGroup 
 * @returns 
 */
export async function getUsersFromGroupName( webUrl: string, thisGroup : string ): Promise<ISiteUsersResults> {

  if ( !webUrl  ) { return { users: [], e: 'NoWeb', status: 'NoWeb' } ; }
  if ( !thisGroup  ) { return { users: [], e: 'NoGroup', status: 'NoGroup' } ; }

  try {
    // 2022-12-10:  ???? Verified needed full Url for this call
    const fullWebUrl = webUrl.indexOf('https:') === 0 ? webUrl : window.location.origin + webUrl;

    let thisWeb = Web(fullWebUrl);
    const users: ISiteUserInfo[] = await thisWeb.siteGroups.getByName( thisGroup ).users();

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 SUCCESS: getUsersFromGroupName ~ 28`, fullWebUrl, users ) ; };

    return { users: users, e: null, status: 'Success' }

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: getUsersFromGroupName ~ 34`, e ) ; };
    return { users: [], e: e, status: 'Error' }

  }

}
