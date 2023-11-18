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

export async function fetchListPerms( fetchProps: IMinItemFetchProps, ) : Promise<IPermissionErrorObj> {

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

    //This call seems to have a delayed response and is not accurate instantly.
    // hasUniqueRoleAssignments = await thisListObject.select('Title,HasUniqueRoleAssignments').get();
    let tempThisList: any[] = await fetchWeb.lists.select('Title,HasUniqueRoleAssignments').filter( `Title eq '${listTitle}'` ).get();
    result.HasUniqueRoleAssignments = tempThisList.length > 0 ? tempThisList[0].HasUniqueRoleAssignments : null;

    const roleAssignments = await thisListObject.roleAssignments();

    result.roleAssignments = roleAssignments;
    result.status = 'Success';

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: fetchListPerms ~ 54`, result ) };

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchListPerms ~ 58`, e ) };

    result.status = 'Error';
    result.e = e;
    result.HasUniqueRoleAssignments = 'Unknown';

  }

  return result;

}
