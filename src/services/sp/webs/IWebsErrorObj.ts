import { IWebInfo } from "@pnp/sp/webs/types";
import { IItemsErrorObj } from "../fetch/items/Interface";

// import { IMinFetchListProps } from "../fetch/lists/fetchListProps";
export interface IWebsErrorObj extends IItemsErrorObj {
  items: IWebInfo[];
}
