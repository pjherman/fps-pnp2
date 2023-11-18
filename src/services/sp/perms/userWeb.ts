
/**
 * Originally from Drilldown - EasyPages
 */
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/security/web";

import { IPermissionErrorObj } from "./IPermissionErrorObj";
import { IMinItemFetchProps } from "../fetch/items/attachments";
import { check4This } from "../CheckSearch";

/**
 * This is almost identical to fetchWebPermissions except adding getById to the await.
 * @param fetchProps
 * @param userId - 2023-02-04:  Tested in PnpJs Tester - can either be number or string, works the same
 * @returns
 */
export async function fetchUserWebPerms( fetchProps: IMinItemFetchProps, userId: any ) : Promise<IPermissionErrorObj> {

  const { webUrl, } = fetchProps;

  // let errorInfo: IHelpfullOutput = null;
  const result: IPermissionErrorObj = {
    status: 'Unknown',
    roleAssignments: [],
    e: null,
    HasUniqueRoleAssignments: 'TBD',
  };

  if ( !webUrl ) {
    result.status = 'NoWeb';
    result.e = 'NoWeb';
    return result;
  }

  try {

    const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);

    let roleAssignments : any[] = await fetchWeb.roleAssignments.getById( userId ).bindings.select("Name,Description").get();

    result.roleAssignments = roleAssignments;
    result.status = 'Success';

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: fetchUserWebPerms ~ 45`, result ) };

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchUserWebPerms ~ 49`, e ) };

    result.status = 'Error';
    result.e = e;
    result.HasUniqueRoleAssignments = 'Unknown';

  }

  return result;

}
