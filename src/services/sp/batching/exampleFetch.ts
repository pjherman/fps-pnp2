import "@pnp/sp/site-users/web";
import { Web } from "@pnp/sp/webs";

import { ISiteUsersResults } from "../users/interfaces/ISiteUsersResults";
import { MinUserSelect } from "../users/interfaces/UserSelect";
import { check4This } from "../CheckSearch";

/**
 * 
 * @param webUrl 
 * @param batchFilters >> Generate using:   const batchFilters = buildFilterBatches( 'Id', [] , 1000 );
 * @param select >> Properties to select.  If nothing provided, will get minimal for groups and people.
 * @progressCallback sends back before the call:  ( item, index, total, functionName )
 * @returns 
 */
export async function exampleFetchInBatch( webUrl: string, batchFilters: string[], select: string[] = MinUserSelect, progressCallback?: any ): Promise<ISiteUsersResults> {

  if ( !webUrl ) { return { users: [], e: 'NoWeb', status: 'NoWeb' } ; }

  try {
    const thisWeb = Web(webUrl);

    const entireBatch: any[] = [];

    await Promise.all( batchFilters.map(async ( filter : string, index: number ) =>{

      if ( progressCallback ) progressCallback( filter, index, batchFilters.length, `exampleFetchInBatch` );
      let users = await thisWeb.siteGroups.filter( filter ).select( select.join(',') ).get();
      entireBatch.push( ...users );

    }));

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 SUCCESS: exampleFetchInBatch ~ 33`, entireBatch ) ; };
    return { users: entireBatch, e: null, status: 'Success' }

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: exampleFetchInBatch ~ 38`, e ) ; };
    return { users: null as any, e: e, status: 'Error' }

  }

}