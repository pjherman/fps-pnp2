
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
// Added after testing and finding issue:  https://github.com/mikezimm/drilldown7/issues/302

import { Web } from "@pnp/sp/webs";

import { check4Gulp } from "../../CheckGulping";
import { IItemErrorObj } from "./Interface";
import { IMinItemFetchProps } from "./attachments";
import { check4This } from "../../CheckSearch";

export interface IMinFetchItemAsXMLProps extends IMinItemFetchProps {
  webUrl: string;
  listTitle: string;
  Id: number;
  selectThese?: string[];
  expandThese?: string[];
  context?: any; //Not needed until Pnpjs v3
}

/**
 * v1.0.45 - May 15, 2023:  DEPRECATE THIS AND USE fieldAsSpecial as single function for both HTML and Text
 * src/services/sp/fetch/items/fieldAsSpecial.ts
 * @param fetchProps 
 * @returns 
 */
export async function fetchItemAsHTML( fetchProps: IMinFetchItemAsXMLProps, ) : Promise<IItemErrorObj> {

  const { webUrl, listTitle, Id, selectThese, expandThese  } = fetchProps;

  const result: IItemErrorObj = {
    status: 'Unknown',
    item: null,
    e: null,
  };

  if ( !listTitle ) {
    result.status = 'NoList';
    result.e = 'NoList';

  } else {

    try {

      const selectTheseStr = selectThese ? selectThese.join(',') : '';
      const expandTheseStr = expandThese ? expandThese.join(',') : '';
      const fetchId = typeof Id === 'string' ? parseInt( Id ) : Id;
      const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);
      const item = await fetchWeb.lists.getByTitle( listTitle ).items.select(selectTheseStr).expand(expandTheseStr).getById( fetchId ).fieldValuesAsHTML()
      result.item = item;
      result.status = 'Success';

      if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: fetchItemAsHTML ~ 55`, result ) };

    } catch (e) {

      if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchItemAsHTML ~ 59`, e ) };

      result.status = 'Error';
      result.e = e;

    }
  }

  return result;

}
