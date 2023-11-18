# Publish hints:

npm run clean
npm run build
npm version major/minor/patch
npm publish --access=public

npm install @mikezimm/fps-pnp2@1.0.54

# Changelog


## 1.0.54 - 2023-Oct 24:  Hub Nav
- add 'MissingDestination' to IFPSResultStatus 

## 1.0.53 - 2023-Oct 23:  Hub Nav
- update INavChangeErrorObj:  navItem: IPnpCreateNavItem; // Item to be created / Updated
- update createWebNav:  add to result for downstream:  navItem:  JSON.parse(JSON.stringify( navItem)),

## 1.0.52 - 2023-Oct 16:  For fetch and restFilter
- create function:  getTodayRestFilter
- call getTodayRestFilter from fetchAnyItems in src\services\sp\fetch\items\fetch.ts

## 1.0.51 - 2023-Sep 20:  For Provisioning
- add AlreadyExisted to IFPSResultStatus  and FPSResultCommonErrors

## 1.0.50 - 2023-Jun 22:  fetch order fix
- bump version with latest fetch order for analytics

## 1.0.49 - 2023-Jun 22:  sp/navigation
- change addWebNav to createWebNav
- change getWebNav to fetchWebNav

## 1.0.48 - 2023-Jun 22:  sp/navigation
- created Nav Interfaces:  INavChangeErrorObj IPnpCreateNavItem IPnpNavItem IFPSNavigationNodes IPnpNavItem IPnpNavType 
- created Nav functions:  addWebNav, getWebNav, INavErrorObj

## 1.0.47 - 2023-May 15:  fetchAnyItems
- fix fetchAnyItems :  orderByBoolean.prop, orderByBoolean.asc ? orderByBoolean.asc : true

## 1.0.46 - 2023-May 15:  getByField
- add getByField to get a specific field and it's props from a list.fields.getByInternalNameOrTitle

## 1.0.45 - 2023-May 15:  fetchItemAsSpecial
- add fetchItemAsText for PageInfo AdvPageProps - just in case fetchItemAsSpecial has an issue.
- add fetchItemAsSpecial to replace fetchItemAsHTML
- add fetchItemAsSpecial to replace fetchItemAsText

## 1.0.44 - 2023-Apr-11:  check4This
- change almost all use of check4Gulp to check4This except in logging.

## 1.0.43 - 2023-Apr-11:  check4This
- allow to explicity turn off select comments even if showAllConsole=true  https://github.com/mikezimm/Compliance/issues/178

## 1.0.42 - 2023-Apr-11:  check4This
- update check4This to include catch for `showAllConsole=true`.toLowerCase() ) > -1

## 1.0.41 - 2023-Apr-11:  check4This
- fix check4This:  compareThis.indexOf( withThis ) > -1

## 1.0.40 - 2023-Mar-16:  check4This
- create check4This in src\services\sp\CheckSearch.ts

## 1.0.39 - 2023-Feb-25:  IFPSResultStatus
- add AccessDenied to IFPSResultStatus

## 1.0.38 - 2023-Feb-03:  Pivot Tiles Update IGroupResults
- add optional filter param to getSiteGroups

## 1.0.37 - 2023-Feb-03:  Pivot Tiles Update IGroupResults
- add ISiteGroupInfo to IGroupResults, re-export it as well from src/services/sp/groups/interfaces/IGroupResults

## 1.0.36 - 2023-Jan-30:  Pivot Tiles site and web fetches
- change Site import in src/services/sp/sites/fetchSiteInfo
- moved - buildFilterBatches to fps-library-v2
- add getSiteGroupsInBatches to src/services/sp/groups/getSiteGroupsBatch.ts
- fix fetchSiteUsersInBatches - was getting siteGroups :(

## 1.0.35 - 2023-Jan-30:  Pivot Tiles site and web fetches
- add fetchSiteInfo to src/services/sp/sites/fetchSiteInfo
- add fetchWebInfoIncludingUnique to src/services/sp/webs/fetchWebInfoIncludingUnique

## 1.0.34 - 2023-Jan-30:  Pivot Tiles minor Tweaks
- add IMinFetchPropsBatch for fetchItemsInBatches

## 1.0.33 - 2023-Jan-30:  Pivot Tiles Permissions update
- add buildFilterBatches  in services/sp/batching
- add fetchAnyItemsWithUniquePerms in src/services/sp/fetch/items/fetch
- add fetchItemsInBatches in src/services/sp/fetch/items/fetchItemsBatch
- add IPermissionErrorObj in src/services/sp/perms/IPermissionErrorObj
- add fetchListPerms in src/services/sp/perms/list
- add fetchUserListPerms in src/services/sp/perms/userList
- add fetchUsersListPermsInBatches in src/services/sp/perms/userListBatch
- add fetchUserWebPerms in src/services/sp/perms/userWeb
- add fetchUserWebPermsInBatches in src/services/sp/perms/userWebBatch
- add fetchWebPerms in src/services/sp/perms/web
- add fetchSiteUsersInBatches in src/services/sp/users/functions/fetchSiteUsersBatch
- add MinUserSelect src/services/sp/users/interfaces/IUserSelect

- update getSiteGroups - with select option
- update getUsersFromGroupId, getUsersFromGroupName - gulp console
- update getUsersFromGroupId - gulp console

## 1.0.32 - 2023-Jan-23:  Pivot Tiles Hubs update
- add getAssocSitesTest to try and fix error:  src/services/sp/hubs/getAssocSitesTest.ts
- added import "@pnp/sp/search"; to getAssocSites

## 1.0.31 - 2023-Jan-23:  Pivot Tiles Hubs and Webs
- add getAssociatedSites to src/services/sp/hubs/getAssocSites, returnsIAssocHubSiteInfo
- add getFilteredWebs to src/services/sp/webs/getFilteredWebs.ts returns IWebsErrorObj
- add getWebs to src/services/sp/webs/getWebs.ts returns IWebsErrorObj

## 1.0.30 - 2023-Jan-12:  Pivot Tiles Groups and GroupUsers
- add folder:  src/services/sp/groups
- add groups interfaces src/services/sp/groups/interfaces
- add group functions: getAssociatedGroup, getAssociatedMembersGroup, getAssociatedOwnersGroup, getAssociatedVisitorsGroup
- add getSiteGroups, getUsersFromGroup, getUsersFromGroupId, getUsersFromGroupName
- removed index files so you have to go to actual best location form minimal import


## 1.0.29 - 2023-Jan-09:  Drilldown common errors update
- updated all returns by putting common Error strings below in the result.e property so it gets handled later.

## 1.0.28 - 2023-Jan-09:  Drilldown common errors update
- add export const FPSResultCommonErrors: IFPSResultStatus[] = [ 'NoWeb' , 'NoList' , 'NoItem' , 'NoUser' ];

## 1.0.27 - 2022-Dec-23:  ALVFinMan fetchItemAsHTML
- add IItemErrorObj as return object for fetchItemAsHTML

## 1.0.26 - 2022-Dec-23:  ALVFinMan fetchItemAsHTML
- add fetchItemAsHTML from ALVFinMan
- standardize fetches to all include error result and put in same order

## 1.0.25 - 2022-Dec-23:  Drilldown attachments
- update fetch attachments from issue:  https://github.com/mikezimm/drilldown7/issues/302

## 1.0.24 - 2022-Dec-23:  Drilldown GetSourceItems
- remove fetchSourceItems.  Now getSourceItems in fps-library-v2 is the replacement

## 1.0.23 - 2022-Dec-23:  Drilldown Updates
- standardize fetch return object interfaces

## 1.0.22 - 2022-Dec-23:  Drilldown Updates
- add fetchFields : src/services/sp/fetch/fields/fetch.ts
- add fetchViews  :  src/services/sp/fetch/views/fetch.ts
- add fetchLists  : src/services/sp/fetch/lists/fetchLists.ts

## 1.0.21 - 2022-Dec-21:  Drilldown Updates
- add IFPSResultStatus to IFPSResultStatus

## 1.0.20 - 2022-Dec-21:  Drilldown Updates
- add saveThisLogItemAsync with await this time

## 1.0.18 - 2022-Dec-21:  Drilldown Updates
- fix double web setup in fetchListProps

## 1.0.17 - 2022-Dec-17:  Drilldown Updates
- changed IFPSResultStatus from 'Failed' to 'Error'
- changed all return status values to IFPSResultStatus for consistancy
- added more result status if it does not pass initial check like 'NoWeb'
- export type IFPSResultStatus = 'Unknown' | 'Success' | 'Error' | 'NoWeb' | 'NoList' | 'NoItem' | 'NoUser';


## 1.0.15 - 2022-Dec-10:  Drilldown Updates
- change filename from src/services/sp/fetch/lists/functions.ts to fetchListProps

## 1.0.14 - 2022-Dec-10:  Drilldown Updates
- add fetchCount to fetchAnyItems

## 1.0.13 - 2022-Dec-10:  Drilldown Updates
- add common status IFPSResultStatus Fetch Item IItemsErrorObj
- add fetch Item Attachments:  src/services/sp/fetch/items/attachments.ts
- add fetch List Info:  src/services/sp/fetch/lists/functions.ts
- add update item:  src/services/sp/update/item.ts

## 1.0.12 - 2022-Dec-10
- remove userServices (commented out)
- removed dependancy on fps-js

## 1.0.11 - 2022-Dec-10
- tighten tsconfig rules
- fixes when turning on tsconfig rules:
    "strictNullChecks": true, ==>> reduced to false after some udpates/fixes
    "noUnusedLocals": true, ==>> reduced to false after some udpates/fixes
    "noImplicitAny": true,

## 1.0.10 - 2022-Dec-10
- Fix casing in src/index.ts /sp/Users to /sp/users

## 1.0.9 - 2022-Dec-10
- Fixed errors in ensureUserHere and ensureUserInfo per below:
- Tried passing in user.user but it errored out all the time.  Now testing for .data first
    const userObject: any = user.data ? user.data : user.user;
    return { user: userObject, e: null, status: 'success' }
- Tested full and relative Urls and relative Urls errored out.  Added
    const fullWebUrl = webUrl.indexOf('https:') === 0 ? webUrl : window.location.origin + webUrl;
    let thisListWeb = Web(fullWebUrl);

## 1.0.8 - 2022-Dec-10
- update fetchSiteAdmins: add (per testing) - import { IList } from "@pnp/sp/lists";

## 1.0.7 - 2022-Dec-10
- update pnp imports to include required things.  Originally found from testing fetchSiteAdmins

## 1.0.6 - 2022-Dec-09
- added proper pnp fetch interfaces to user functions

## 1.0.5 - 2022-Dec-09
- restructured users folder.  Added index to combine all functions with their return interface

## 1.0.4 - 2022-Dec-09
- rebuild src/services/sp/users/userServices.ts into files, move logic up to fps-library-v2

## 1.0.3 - 2022-Dec-09
Cleaned fetch items to bare min required to fetch, including ALVFinMan Source prepper
Cleaned logging to only save log item, moving the response cleanup logic to fps-library-v2
Moved all other logic to fps-library-v2

## 1.0.2 - 2202-Nov-30
add src/services/sp/users/userServices.ts

## 1.0.1 - 2202-Nov-27
update EasyPagesFetch.ts: const selectThese = [ ...baseSelectColumns, ...selColumns].join(",");

## 1.0.0 - 2202-Nov-24

### General

- Initial build and creating first component

## sp

created folders:  items, pages

### functions

