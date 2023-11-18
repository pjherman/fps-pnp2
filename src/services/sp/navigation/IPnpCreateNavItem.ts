
import { IItemsErrorObj } from "../fetch/items/Interface";

/**
 * INavChangeErrorObj is Used primarily for createWebNav as the return result for that function
 */
export interface INavChangeErrorObj extends IItemsErrorObj {
  item: IPnpNavItem;
  navItem: IPnpCreateNavItem; // Item to be created / Updated
}

export interface IPnpCreateNavItem {
  Title: string;
  Url: string;
  IsVisible?: boolean;
}

/**
 * Baseline Nav Item returned by Pnp Nav fetches via INavChangeErrorObj
 */
export interface IPnpNavItem extends IPnpCreateNavItem {
  "odata.type": string;
  "odata.id": string;
  "odata.editLink": string;
  AudienceIds: null | string[]; // string[] per https://pnp.github.io/pnpjs/sp/navigation/#update
  CurrentLCID: number;
  Id: number;
  IsDocLib: boolean;
  IsExternal: boolean;
  IsVisible: boolean;
  ListTemplateType: number;
}

export interface IFPSNavigationNodes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
