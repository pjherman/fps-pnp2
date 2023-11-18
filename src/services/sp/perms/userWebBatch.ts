
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
 * @param userId
 * @progressCallback sends back before the call:  ( item, index, total, functionName )
 * @returns
 */
export async function fetchUserWebPermsInBatches( fetchProps: IMinItemFetchProps, userIds: any[], progressCallback?: any ) : Promise<IPermissionErrorObj> {

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

    const entireBatch: any[] = [];

    await Promise.all( userIds.map(async ( userId: any, index: number ) =>{
      if ( progressCallback ) progressCallback( userId, index, userIds.length, `fetchUserWebPermsInBatches` );
      const roleAssignments = await fetchWeb.roleAssignments.getById( userId ).bindings.select("Name,Description").get();
      entireBatch.push( ...roleAssignments );
    }));

    result.roleAssignments = entireBatch;
    result.status = 'Success';

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: fetchUserWebPermsInBatches ~ 52`, result ) };

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchUserWebPermsInBatches ~ 56`, e ) };

    result.status = 'Error';
    result.e = e;
    result.HasUniqueRoleAssignments = 'Unknown';

  }

  return result;

}
