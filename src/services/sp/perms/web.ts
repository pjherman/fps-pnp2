/**
 * Originally from Drilldown - EasyPages
 */
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/security/web";

import { IPermissionErrorObj } from "./IPermissionErrorObj";
import { IMinItemFetchProps } from "../fetch/items/attachments";
import { check4This } from "../CheckSearch";

/**
 * 
 * @param fetchProps 
 * @returns 
 */
export async function fetchWebPerms( fetchProps: IMinItemFetchProps, ) : Promise<IPermissionErrorObj> {

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

    let fetchWebHasUnique : any = await fetchWeb.select('Title,HasUniqueRoleAssignments').get();
    result.HasUniqueRoleAssignments = fetchWebHasUnique.HasUniqueRoleAssignments;

    let roleAssignments : any[] = await fetchWeb.roleAssignments();

    result.roleAssignments = roleAssignments;
    result.status = 'Success';

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: fetchWebPerms ~ 46`, result ) };

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchWebPerms ~ 50`, e ) };

    result.status = 'Error';
    result.e = e;
    result.HasUniqueRoleAssignments = 'Unknown';

  }

  return result;

}
