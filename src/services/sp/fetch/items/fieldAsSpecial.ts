
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
// Added after testing and finding issue:  https://github.com/mikezimm/drilldown7/issues/302

import { Web } from "@pnp/sp/webs";

import { IItemErrorObj } from "./Interface";
import { IMinItemFetchProps } from "./attachments";
import { check4This } from "../../CheckSearch";

export type IFieldSpecialType = 'Html' | 'Text' ;

export interface IMinFetchItemAsSpecialProps extends IMinItemFetchProps {
  webUrl: string;
  listTitle: string;
  Id: number;
  selectThese?: string[];
  expandThese?: string[];
  context?: any; //Not needed until Pnpjs v3
  specialType: IFieldSpecialType;
}
/**
 * v1.0.45 - May 15, 2023:  Replaces both fetchItemAsHTML and fetchItemAsText
 * src/services/sp/fetch/items/fieldAsSpecial.ts
 * @param fetchProps 
 * @returns 
 */
export async function fetchItemAsSpecial( fetchProps: IMinFetchItemAsSpecialProps, ) : Promise<IItemErrorObj> {

  const { webUrl, listTitle, Id, selectThese, expandThese, specialType  } = fetchProps;

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

      if ( specialType === 'Html' ) {
        const item = await fetchWeb.lists.getByTitle( listTitle ).items.select(selectTheseStr).expand(expandTheseStr).getById( fetchId ).fieldValuesAsHTML();
        result.item = item;
        result.status = 'Success';
        if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: fetchItemAsHTML ~ 57`, result ) };

      } else if ( specialType === 'Text' ) {
        const item = await fetchWeb.lists.getByTitle( listTitle ).items.select(selectTheseStr).expand(expandTheseStr).getById( fetchId ).fieldValuesAsText();
        result.item = item;
        result.status = 'Success';
        if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: fetchItemAsHTML ~ 63`, result ) };

      } else {
        alert( 'fetchItemAsSpecial error.  Check console for details.' );
        if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Error: fetchItemAsHTML ~ 67`, result ) };
        console.log( `fetchItemAsSpecial Incorrect specialType value:`, specialType );
        result.status = 'Error';
        result.e = null;
      }

    } catch (e) {

      if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: fetchItemAsHTML ~ 75`, e ) };

      result.status = 'Error';
      result.e = e;

    }
  }

  return result;

}
