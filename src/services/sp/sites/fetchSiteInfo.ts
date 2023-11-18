
import "@pnp/sp/webs";
import { Site, } from "@pnp/sp/sites/types";

import { IFPSResultStatus } from "../IFPSResultStatus";
import { check4This } from "../CheckSearch";

export interface ISiteErrorObj {
  site: any;
  status: IFPSResultStatus;
  e: any;
}

export async function fetchSiteInfo(webUrl: string, ): Promise<ISiteErrorObj> {

  const result: ISiteErrorObj = {
    status: 'Unknown',
    site: null,
    e: null,
  };

  if ( !webUrl ) {
    result.status = 'NoWeb';
    result.e = 'NoWeb';
    return result;
  }

  try {

    const fetchWeb = Site(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);
    const theSite: any = await fetchWeb.get();

    result.status = 'Success';
    result.site = theSite;

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: fetchSiteInfo ~ 36`, result ) };

    return result;

  } catch (e) {
    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchSiteInfo ~ 41`, e ) };

    result.status = 'Error';
    result.e = e;
    return result;

  }

}
