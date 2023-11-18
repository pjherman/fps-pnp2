
import "@pnp/sp/webs";
import { Web, } from "@pnp/sp/webs";

import { IFPSResultStatus } from "../IFPSResultStatus";
import { check4This } from "../CheckSearch";

export interface IWebErrorObj {
  web: any;
  status: IFPSResultStatus;
  e: any;
}

export async function fetchWebInfoIncludingUnique(webUrl: string, minOrAllProps: 'min' | 'all', ): Promise<IWebErrorObj> {

  const result: IWebErrorObj = {
    status: 'Unknown',
    web: null,
    e: null,
  };

  if ( !webUrl ) {
    result.status = 'NoWeb';
    result.e = 'NoWeb';
    return result;
  }

  try {

    let getMinProps = 'Title,Id,Url,ServerRelativeUrl,SiteLogoUrl,Description,HasUniqueRoleAssignments';
    if ( minOrAllProps === 'all' ) { getMinProps = '*,' + getMinProps ; }

    const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);
    const thisWeb: any = await fetchWeb.select(getMinProps).get();

    result.status = 'Success';
    result.web = thisWeb;

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: fetchWebInfoIncludingUnique ~ 39`, result ) };

    return result;

  } catch (e) {
    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchWebInfoIncludingUnique ~ 44`, e ) };

    result.status = 'Error';
    result.e = e;
    return result;

  }

}
