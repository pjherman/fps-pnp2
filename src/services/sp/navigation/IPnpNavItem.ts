
export const NavHeaderUrl: string = `http://linkless.header/`;  // If a Nav Item is a header, it has the Url value

export interface IPnpNavItem {
  "odata.type": string;
  "odata.id": string;
  "odata.editLink": string;
  AudienceIds: null | string[];  // string[] per https://pnp.github.io/pnpjs/sp/navigation/#update
  CurrentLCID: number;
  Id: number;
  IsDocLib: boolean;
  IsExternal: boolean;
  IsVisible: boolean;
  ListTemplateType: number;
  Title: string;
  Url: string;
}


export type IPnpNavType = 'Top' | 'Quicklaunch';
