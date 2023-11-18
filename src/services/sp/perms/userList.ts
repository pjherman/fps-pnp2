/**
 * Originally from Drilldown - EasyPages
 */
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/security/list";

// import { IMinItemFetchProps } from "../fetch/items/Interface";
import { IPermissionErrorObj } from "./IPermissionErrorObj";
import { IMinItemFetchProps } from "../fetch/items/attachments";
import { check4This } from "../CheckSearch";

/**
 * This is almost identical to fetchListPermissions except adding getById to the await.
 * @param fetchProps
 * @param userId
 * @returns
 */
export async function fetchUserListPerms( fetchProps: IMinItemFetchProps, userId: any ) : Promise<IPermissionErrorObj> {

  const { webUrl, listTitle, } = fetchProps;

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

  } else if ( !listTitle ) {
    result.status = 'NoList';
    result.e = 'NoList';
    return result;

  }

  try {

    const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);

    let thisListObject = fetchWeb.lists.getByTitle( listTitle );

    const roleAssignments = await thisListObject.roleAssignments.getById( userId ).bindings.select("Name,Description").get();

    result.roleAssignments = roleAssignments;
    result.status = 'Success';

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: fetchUserListPerms ~ 55`, result ) };

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchUserListPerms ~ 59`, e ) };

    result.status = 'Error';
    result.e = e;
    result.HasUniqueRoleAssignments = 'Unknown';

  }

  return result;

}
