
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

export async function getAssociatedSitesTest( departmentId: string ) : Promise<IAssocHubsErrorObj> {

  const result: IAssocHubsErrorObj = {
    status: 'Unknown',
    items: [],
    e: null,
  };

    //var departmentId = departmentId;
    // do a null check of department id
    //366df2ee-6476-4b15-a4fd-018dfae71e48 <= SPHub

  /**
   *  Updated search query per pnpjs issue response:
   *  https://github.com/pnp/pnpjs/issues/1552#issuecomment-767837463
   * 
   * GET Managed properties here:  https://tenanat-admin.sharepoint.com/_layouts/15/searchadmin/ta_listmanagedproperties.aspx?level=tenant
   */

  const items = await sp.search(<ISearchQuery>{
    Querytext: `contentclass:STS_Site AND departmentId:{${departmentId}}`,
      SelectProperties: ["*","Title", "SPSiteUrl", "WebTemplate","departmentId","SiteLogo","SiteDescription",
      "ContentModifiedTime","LastModifiedTime", "LastModifiedTimeForRetention","ModifiedBy","Created","Modified","CreatedBy","CreatedById","ModifiedById"],
      "RowLimit": 500,
//          "StartRow": 0,
      "ClientType": "ContentSearchRegular",
      TrimDuplicates: false, //This is needed in order to also get the hub itself.
    }).then( ( res: SearchResults) => {

          console.log('associated sites with URL/Desc', res);
          console.log(res.RowCount);
          console.log(res.PrimarySearchResults);

          result.items = res.PrimarySearchResults as any[];
          return result;

  }).catch((e) => {
      result.items = [ 'HubSiteFunctions: DID NOT FIND ANY ASSOCIATED SITES!' as any ];
      result.status = 'Error';
      result.e = e;
      if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: getAssociatedSitesTest ~ 64`, e ) };
      return result;
  });

  return items;
}
