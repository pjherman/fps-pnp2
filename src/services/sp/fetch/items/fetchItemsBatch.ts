
// import "@pnp/sp/webs";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";

import { check4Gulp } from "../../CheckGulping";
import { IItemsErrorObj, IMinFetchPropsBatch } from "./Interface";
import { check4This } from "../../CheckSearch";

/**
 * 
 * @param webUrl 
 * @param batchFilters >> Generate using:   const batchFilters = buildFilterBatches( 'Id', [] , 1000 );
 * @progressCallback sends back before the call:  ( item, index, total, functionName )
 * @returns 
 */

export async function fetchItemsInBatches( fetchProps: IMinFetchPropsBatch ) : Promise<IItemsErrorObj> {

  const { webUrl, listTitle, orderByBoolean, batchFilters, progressCallback } = fetchProps;

  // let errorInfo: IHelpfullOutput = null;
  const result: IItemsErrorObj = {
    status: 'Unknown',
    items: [],
    e: null,
  };

  if ( !listTitle ) {
    result.status = 'NoList';
    result.e = 'NoList';
    return result;
  }

  try {
    const selectThese = fetchProps.selectThese ? fetchProps.selectThese.join(',') : '*';
    const expandThese = fetchProps.expandThese ? fetchProps.expandThese.join(',') : '';

    const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);
    let entireBatch : any[]= [];

    await Promise.all( batchFilters.map(async ( filter : string, index: number ) =>{

      if ( progressCallback ) progressCallback( filter, index, batchFilters.length, `fetchItemsInBatches` );

      if ( orderByBoolean ) {
        //This does NOT DO ANYTHING at this moment.  Not sure why.
        const items = await fetchWeb.lists.getByTitle( listTitle ).items.select(selectThese).expand(expandThese)
          .filter(filter).orderBy( orderByBoolean.prop, orderByBoolean.asc ).get();

        entireBatch.push( ...items );

      } else {
        const items = await fetchWeb.lists.getByTitle( listTitle ).items
          .select(selectThese).expand(expandThese).filter(filter).get();

        entireBatch.push( ...items );

      }
    }));

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 SUCCESS: fetchItemsInBatches ~ 63`, entireBatch ) ; };
    return { items: entireBatch, e: null, status: 'Success' }

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchItemsInBatches ~ 68`, e ) ; };
    return { items: [], e: e, status: 'Error' }

  }

}
