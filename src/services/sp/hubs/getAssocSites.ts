
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/hubsites/web";
import "@pnp/sp/search";

//https://sharepoint.stackexchange.com/questions/261222/spfx-and-pnp-sp-how-to-get-all-sites
//Just had to change SearchQuery to ISearchQuery.

import { ISearchQuery, } from "@pnp/sp/search/types";
import { SearchResults,  } from "@pnp/sp/search";

// import { IHubSiteInfo } from  "@pnp/sp/hubsites/types";

import { IItemsErrorObj } from "../fetch/items/Interface";
import { IAssocHubSiteInfo } from "./IAssocHubSiteInfo";
import { check4This } from "../CheckSearch";

export interface IAssocHubsErrorObj extends IItemsErrorObj {
  items: IAssocHubSiteInfo[];
}

export async function getAssociatedSites( departmentId: string ) : Promise<IAssocHubsErrorObj> {

  const result: IAssocHubsErrorObj = {
    status: 'Unknown',
    items: [],
    e: null,
  };

  if ( !departmentId ) {
    result.status = 'NoDepartment';
    result.e = 'NoDepartment';
    return result;
  }
    //var departmentId = departmentId;
    // do a null check of department id
    //366df2ee-6476-4b15-a4fd-018dfae71e48 <= SPHub

  /**
   *  Updated search query per pnpjs issue response:
   *  https://github.com/pnp/pnpjs/issues/1552#issuecomment-767837463
   * 
   * GET Managed properties here:  https://tenanat-admin.sharepoint.com/_layouts/15/searchadmin/ta_listmanagedproperties.aspx?level=tenant
   */

  try {
    const res: SearchResults = await sp.search(<ISearchQuery>{
      Querytext: `contentclass:STS_Site AND departmentId:{${departmentId}}`,
      SelectProperties: ["*","Title", "SPSiteUrl", "WebTemplate","departmentId","SiteLogo","SiteDescription",
        "ContentModifiedTime","LastModifiedTime", "LastModifiedTimeForRetention","ModifiedBy","Created","Modified","CreatedBy","CreatedById","ModifiedById"],
      "RowLimit": 500,
      "ClientType": "ContentSearchRegular",
      TrimDuplicates: false, //This is needed in order to also get the hub itself.
    });

    const hubs = res.PrimarySearchResults;
    result.items = hubs as any;
    result.status = 'Success';
    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: getAssociatedSites ~ 70`, res, result ) };
    return result;

  } catch (e) {
    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: getAssociatedSites ~ 74`, e ) };

    result.status = 'Error';
    result.e = e;
    return result;
  }

}
