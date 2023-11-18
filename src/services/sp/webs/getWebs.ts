
import "@pnp/sp/webs";
import { Web,  } from "@pnp/sp/webs";

import { IWebsErrorObj } from "./IWebsErrorObj";
import { check4This } from "../CheckSearch";

/**
 * gets array of webs
 * @param webUrl 
 * @param roleAssignments 
 * @returns 
 */
export async function getWebs(  webUrl: string, roleAssignments: boolean, ) : Promise<IWebsErrorObj> {

  const result: IWebsErrorObj = {
    status: 'Unknown',
    items: [],
    e: null,
  };

  if ( !webUrl ) {
    result.status = 'NoWeb';
    result.e = 'NoWeb';
    return result;
  }

  try {
    const selectTheseStr = `*,LastContentModifiedDate${ roleAssignments === true ? ',HasUniqueRoleAssignments' : '' }`;

    const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);

    const webs = await fetchWeb.webs.select( selectTheseStr ).get();
    result.items = webs;
    result.status = 'Success';
    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: getWebs ~ 36`, result ) }
    return result;

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: getWebs ~ 41`, e ) };

    result.status = 'Error';
    result.e = e;
    return result;

  }

}