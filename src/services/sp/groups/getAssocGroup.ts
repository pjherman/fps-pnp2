
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { Web } from "@pnp/sp/webs";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";

import { IGroupResults } from "./interfaces/IGroupResults";
import { IAssociatedGroupType } from "./interfaces/IAssociatedGroupType";
import { check4This } from "../CheckSearch";

export async function getAssociatedGroup( webUrl: string, groupType: IAssociatedGroupType ): Promise<IGroupResults> {

  if ( !webUrl  ) { return { group: null as any, e: 'NoWeb', status: 'NoWeb' } ; }

  try {
    // 2022-12-10:  ???? Verified needed full Url for this call
    const fullWebUrl = webUrl.indexOf('https:') === 0 ? webUrl : window.location.origin + webUrl;

    let thisWeb = Web(fullWebUrl);

    if ( groupType === 'Owners' ) {
      let group: ISiteGroupInfo = await thisWeb.associatedOwnerGroup();
      if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 SUCCESS: getAssociatedGroup ~ 23`, groupType, group ) ; };
      return { group: group, e: null, status: 'Success' }

    } else if ( groupType === 'Members' ) {
      let group: ISiteGroupInfo = await thisWeb.associatedMemberGroup();
      if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 SUCCESS: getAssociatedGroup ~ 27`, groupType, group ) ; };
      return { group: group, e: null, status: 'Success' }

    } else if ( groupType === 'Visitors' ) {
      let group: ISiteGroupInfo = await thisWeb.associatedVisitorGroup();
      if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 SUCCESS: getAssociatedGroup ~ 33`, groupType, group ) ; };
      return { group: group, e: null, status: 'Success' }

    } else {
      return { group: null as any, e: null, status: 'Unknown' }

    }


  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: getAssociatedGroup ~ 44`, e ) ; };
    return { group: null as any, e: e, status: 'Error' }

  }

}
