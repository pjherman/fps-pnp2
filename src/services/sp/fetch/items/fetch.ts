/**
 * Originally from Drilldown - EasyPages
 */

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";

// sp is only used if you are getting the local web... I think :)
// import { sp } from "@pnp/sp";

import { IItemsErrorObj } from "./Interface";
import { IMinFetchProps } from "./Interface";
import { check4This } from "../../CheckSearch";
import { getTodayRestFilter } from "./getTodayRestFilter";

/**
 *  in fetchAnyItems, if orderByBoolean.asc is missing, it will default to ascenting (aka true)
 * @param fetchProps 
 * @returns 
 */
export async function fetchAnyItems( fetchProps: IMinFetchProps, ) : Promise<IItemsErrorObj> {

  const { webUrl, listTitle, orderByBoolean, alertMe, consoleLog, fetchCount } = fetchProps;

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

    // Added for https://github.com/mikezimm/drilldown7/issues/369
    const restFilter = fetchProps.restFilter ? getTodayRestFilter( fetchProps.restFilter ) : '';

    const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);
    let items : any[]= [];

    const topCount = !fetchCount || fetchCount < 1 ? 200 : fetchCount;

    // updated this logic to make sure there is a prop to sort by else no worky
    // https://github.com/mikezimm/PageInfo/issues/123
    if ( orderByBoolean && orderByBoolean.prop ) {
      //This does NOT DO ANYTHING at this moment.  Not sure why.
      const order = orderByBoolean.asc === false || orderByBoolean.asc === true ? orderByBoolean.asc  : true;
      items = await fetchWeb.lists.getByTitle( listTitle ).items.select(selectThese).expand(expandThese)
        .top(topCount).filter(restFilter).orderBy( orderByBoolean.prop, order ).get();

    } else {
      items = await fetchWeb.lists.getByTitle( listTitle ).items
      .select(selectThese).expand(expandThese).top(topCount).filter(restFilter).get();
    }

    result.items = items;
    result.status = 'Success';

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: fetchAnyItems ~ 57`, result ) };

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchAnyItems ~ 61`, e ) };

    result.status = 'Error';
    result.e = e;

  }

  return result;

}

const UniquePermsFilter = 'HasUniqueRoleAssignments eq true';
const UniquePermsHiddenFilter = `${ UniquePermsFilter }  and Hidden eq false`;

export async function fetchAnyItemsWithUniquePerms( fetchProps: IMinFetchProps ) : Promise<IItemsErrorObj> {

  const fetchPropsX = JSON.parse(JSON.stringify( fetchProps ));
  fetchPropsX.restFilter = fetchPropsX.restFilter ? `${ fetchPropsX.restFilter } and ${ UniquePermsFilter }` : UniquePermsFilter;
  const result = fetchAnyItems( fetchPropsX );
  return result;

}
