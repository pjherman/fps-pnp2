
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import { Web, } from "@pnp/sp/webs";
import { IFieldInfo, } from "@pnp/sp/fields/types";

import { IItemErrorObj } from "../items/Interface";
import { check4This } from "../../CheckSearch";

export interface IFieldErrorObj extends IItemErrorObj {
  item: IFieldInfo;
} 

/**
 * v1.0.45 - May 15, 2023:  added as single version of fetchFields
 * 
 * @param webUrl 
 * @param listTitle 
 * @param titleOrInternal 
 * @param context -  //Not needed until Pnpjs v3
 * @returns 
 */
export async function getByField(  webUrl: string, listTitle: string, titleOrInternal: string, context: any = null ) : Promise<IFieldErrorObj> {

  const result: IFieldErrorObj = {
    status: 'Unknown',
    item: null as any,
    e: null,
  };

  if ( !listTitle ) {
    result.status = 'NoList';
    result.e = 'NoList';

  } else if ( !titleOrInternal ) {
    result.status = 'NoItem';
    result.e = 'NoItem';

  } else {

    try {

      const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);
      const field = await fetchWeb.lists.getByTitle(listTitle).fields.getByInternalNameOrTitle( titleOrInternal )();

      result.item = field;
      result.status = 'Success';

      if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: getByField ~ 46`, result ) };

    } catch (e) {

      if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: getByField ~ 50`, e ) };

      result.status = 'Error';
      result.e = e;
    }

    }

    return result;

}