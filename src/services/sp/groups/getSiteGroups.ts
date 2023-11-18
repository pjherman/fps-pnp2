
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { Web } from "@pnp/sp/webs";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";

import { IGroupsResults } from "./interfaces/IGroupsResults";
import { MinUserSelect } from "../users/interfaces/UserSelect";
import { check4This } from "../CheckSearch";

/**
 * 
 * @param webUrl 
 * @param select >> Properties to select.  If nothing provided, will get minimal for groups and people.
 * @param filter >> Optional filter
 * @returns 
 */
export async function getSiteGroups( webUrl: string, select: string[] = MinUserSelect, filter: string = '' ): Promise<IGroupsResults> {

  if ( !webUrl  ) { return { groups: [], e: 'NoWeb', status: 'NoWeb' } ; }

  try {
    // 2022-12-10:  ???? Verified needed full Url for this call
    const fullWebUrl = webUrl.indexOf('https:') === 0 ? webUrl : window.location.origin + webUrl;

    let thisWeb = Web(fullWebUrl);
    let groups: ISiteGroupInfo[] = await thisWeb.siteGroups.filter(filter).select( select.join(',') ).get();

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 SUCCESS: getSiteGroups ~ 28`, fullWebUrl, groups ) ; };

    return { groups: groups, e: null, status: 'Success' }

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: getSiteGroups ~ 34`, e ) ; };
    return { groups: [], e: e, status: 'Error' }

  }

}
