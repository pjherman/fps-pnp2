
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { Web } from "@pnp/sp/webs";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";

import { IGroupResults } from "./interfaces/IGroupResults";
import { check4This } from "../CheckSearch";

export async function getAssociatedVisitorsGroup( webUrl: string, ): Promise<IGroupResults> {

  if ( !webUrl  ) { return { group: null as any, e: 'NoWeb', status: 'NoWeb' } ; }

  try {
    // 2022-12-10:  ???? Verified needed full Url for this call
    const fullWebUrl = webUrl.indexOf('https:') === 0 ? webUrl : window.location.origin + webUrl;

    let thisWeb = Web(fullWebUrl);
    let group: ISiteGroupInfo = await thisWeb.associatedVisitorGroup();

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 SUCCESS: getAssociatedVisitorsGroup ~ 23`, group, group ) ; };

    return { group: group, e: null, status: 'Success' }

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: getAssociatedVisitorsGroup ~ 29`, e ) ; };
    return { group: null as any, e: e, status: 'Error' }

  }

}
