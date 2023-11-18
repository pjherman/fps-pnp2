

import "@pnp/sp/webs";
import { Web, } from "@pnp/sp/webs";
import "@pnp/sp/navigation";
import { IItemsErrorObj } from "../fetch/items/Interface";
import { check4This } from "../CheckSearch";
import { IPnpNavItem, IPnpNavType } from "./IPnpNavItem";

export interface INavErrorObj  extends IItemsErrorObj {
  items: IPnpNavItem[];
}

/**
 * fetchWebNav will take a web's url and the navType you want, and return an array of top level nav nodes.
 * 
 * @param webUrl 
 * @param navType  'Top' | 'QuickLaunch'
 * @returns 
 */
export async function fetchWebNav( webUrl: string, navType: IPnpNavType ): Promise<INavErrorObj> {

  const result: INavErrorObj = {
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
    const webs : IPnpNavItem[] = navType === 'Top' ? await fetchWeb.navigation.topNavigationBar() : await fetchWeb.navigation.quicklaunch();

    result.items = webs;
    result.status = 'Success';
    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: fetchWebNav ~ 42 ${navType}`, result ) }

    return result;

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchWebNav ~ 48 ${navType}`, e ) }

    result.status = 'Error';
    result.e = e;
    return result;

  }

}
