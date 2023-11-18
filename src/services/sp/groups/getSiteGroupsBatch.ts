
// import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { Web } from "@pnp/sp/webs";

import { IGroupsResults } from "./interfaces/IGroupsResults";
import { MinUserSelect } from "../users/interfaces/UserSelect";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { check4This } from "../CheckSearch";

/**
 * 
 * @param webUrl 
 * @param batchFilters >> Generate using:   const batchFilters = buildFilterBatches( 'Id', [] , 1000 ); - only works if Ids are numbers
 * @progressCallback sends back before the call:  ( item, index, total, functionName )
 * @returns 
 */

export async function getSiteGroupsInBatches(webUrl: string, batchFilters: string[], select: string[] = MinUserSelect , progressCallback?: any ): Promise<IGroupsResults> {

  if ( !webUrl ) { return { groups: [], e: 'NoWeb', status: 'NoWeb' } ; }

  try {
    const thisWeb = Web(webUrl);

    const entireBatch: ISiteGroupInfo[] = [];

    await Promise.all( batchFilters.map(async ( filter : any, index: number ) =>{
      if ( progressCallback ) progressCallback( filter, index, batchFilters.length, `fetchSiteGroupsInBatches` );
      const groups = await thisWeb.siteGroups.filter( filter ).select( select.join(',') ).get();
      entireBatch.push( ...groups );
    }));

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 SUCCESS: fetchSiteGroupsInBatches ~ 33`, entireBatch ) ; };
    return { groups: entireBatch, e: null, status: 'Success' }

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchSiteGroupsInBatches ~ 38`, e ) ; };
    return { groups: [], e: e, status: 'Error' }

  }

}
