

import "@pnp/sp/webs";
import { Web, } from "@pnp/sp/webs";
import "@pnp/sp/navigation";
import { check4This } from "../CheckSearch";
import { IPnpNavType } from "./IPnpNavItem";
import { IPnpCreateNavItem, INavChangeErrorObj, IFPSNavigationNodes, IPnpNavItem } from "./IPnpCreateNavItem";

/**
 * createWebNav will attempt to add navItem under a parent if it does not exist.
 *    If it does exist, then update only if forceNewUrl === true
 * @param webUrl 
 * @param navType 
 * @param parentNode 
 * @param navItem 
 * @param forceNewUrl 
 * @returns 
 */
export async function createWebNav( webUrl: string, navType: IPnpNavType, parentNode: number, navItem: IPnpCreateNavItem, forceNewUrl: boolean ): Promise<INavChangeErrorObj> {

  const result: INavChangeErrorObj = {
    status: 'Unknown',
    item: null as any,
    navItem:  JSON.parse(JSON.stringify( navItem)),
    items: [],
    e: null,
  };

  if ( !webUrl ) {
    result.status = 'NoWeb';
    result.e = 'NoWeb';
    return result;
  }

  try {

    const fetchWeb = Web(`${webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${webUrl}`);
    const nav : IFPSNavigationNodes = navType === 'Top' ? fetchWeb.navigation.topNavigationBar : fetchWeb.navigation.quicklaunch;

    let newNode : IFPSNavigationNodes = null as any;
    let nodeDataRaw: IPnpNavItem = null as any;

    /**
     * newNavProps structure does not work... gives error:
     *    "A node of type 'StartArray' was read from the JSON reader when trying to read a value of a property; however, a 'PrimitiveValue' or 'StartObject' node was expected."
     */
    // const newNavProps = [ navItem.Title, navItem.Url,  navItem.IsVisible ? navItem.IsVisible : true ];


    const parentNodeObj = parentNode ? await nav.getById(parentNode)() : null;

    if ( parentNode > -1 && parentNodeObj ) {
      // get Parent Node to make sure it exists, if it exists, check children for same node Title
      const childrenNodes: IPnpNavItem[] = await nav.getById(parentNode).children();
      const existingNode = childrenNodes.filter( ( navNode: IPnpNavItem ) => { return navNode.Title === navItem.Title });

      if ( existingNode.length === 0 ) {  // Node Title not found, add
        newNode = await nav.getById(parentNode).children.add( navItem.Title, navItem.Url,  navItem.IsVisible ? navItem.IsVisible : true );
        nodeDataRaw = newNode.data;

      } else if ( forceNewUrl === true ) { // Node Title found, but force update to Url
        newNode = await nav.getById(existingNode[0].Id).update({
          Url: navItem.Url,  IsVisible: navItem.IsVisible ? navItem.IsVisible : true,
        });
        nodeDataRaw = newNode.data;

      } else { // Node Title found but was not updated.
        nodeDataRaw = existingNode[0];
      }

      result.item = nodeDataRaw;
      result.status = 'Success';

    } else if ( parentNode > -1 ) {
      alert( `ParentNode ${parentNode} does NOT exist! `);

      result.item = nodeDataRaw;
      result.status = 'Error';

    } else {
      newNode = await nav.add( navItem.Title, navItem.Url,  navItem.IsVisible ? navItem.IsVisible : true );
      nodeDataRaw = newNode.data;

      result.item = nodeDataRaw;
      result.status = 'Success';
    }


    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: createWebNav ~ 119 ${navType}`, result ) }

    return result;

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: createWebNav ~ 125`, e ) }
    // Common error if SPO Link that does not exist:
    // value:   "Cannot open \"/sites/collectionUrl/SitePages/Hub-Connections.aspx\": no such file or folder."
    result.status = 'Error';
    result.e = e;
    return result;

  }

}
