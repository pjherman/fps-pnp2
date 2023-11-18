import { IRoleAssignmentInfo } from "@pnp/sp/security/types";
import { IFPSResultStatus } from "../IFPSResultStatus";

export interface IPermissionErrorObj {
  roleAssignments: IRoleAssignmentInfo[];
  e: any;
  status: IFPSResultStatus;
  HasUniqueRoleAssignments: boolean | 'Unknown' | 'TBD';
}
