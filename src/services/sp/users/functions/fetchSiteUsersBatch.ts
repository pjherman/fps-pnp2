
// import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { Web } from "@pnp/sp/webs";

import { check4Gulp } from "../../CheckGulping";
import { ISiteUsersResults } from "../interfaces/ISiteUsersResults";
import { MinUserSelect } from "../interfaces/UserSelect";
import { check4This } from "../../CheckSearch";

/**
 * 
 * @param webUrl 
 * @param batchFilters >> Generate using:   const batchFilters = buildFilterBatches( 'Id', [] , 1000 );
 * @progressCallback sends back before the call:  ( item, index, total, functionName )
 * @returns 
 */

export async function fetchSiteUsersInBatches(webUrl: string, batchFilters: string[], select: string[] = MinUserSelect , progressCallback?: any ): Promise<ISiteUsersResults> {

  if ( !webUrl ) { return { users: [], e: 'NoWeb', status: 'NoWeb' } ; }

  try {
    const thisWeb = Web(webUrl);

    const entireBatch: any[] = [];

    await Promise.all( batchFilters.map(async ( filter : any, index: number ) =>{
      if ( progressCallback ) progressCallback( filter, index, batchFilters.length, `fetchSiteUsersInBatches` );
      const users = await thisWeb.siteUsers.filter( filter ).select( select.join(',') ).get();
      entireBatch.push( ...users );
    }));

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 SUCCESS: fetchSiteUsersInBatches ~ 33`, entireBatch ) ; };
    return { users: entireBatch, e: null, status: 'Success' }

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchSiteUsersInBatches ~ 38`, e ) ; };
    return { users: [], e: e, status: 'Error' }

  }

}
