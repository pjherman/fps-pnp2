
import "@pnp/sp/webs";
import { Web,  } from "@pnp/sp/webs";
import { IWebsErrorObj } from "./IWebsErrorObj";
import { check4This } from "../CheckSearch";

/**
 * gets list of webs filtered for the current user (limited props not including site logo)
 * @param webUrl 
 * @returns 
 */
export async function getFilteredWebs(  webUrl: string, ) : Promise<IWebsErrorObj> {

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

    const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);

    const webs = await fetchWeb.getSubwebsFilteredForCurrentUser().get();
    result.items = webs as any[];
    result.status = 'Success';
    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: getFilteredWebs ~ 33`, result ) };
    return result;

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: getFilteredWebs ~ 38`, e ) };

    result.status = 'Error';
    result.e = e;
    return result;

  }
}