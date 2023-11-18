
export type IFPSResultStatus = 'Unknown' | 'Success' | 'AccessDenied' | 'Error' | 'NoWeb' | 'NoList' | 'NoItem' | 'NoUser' | 
  'NoGroup' | 'NoDepartment' | 'RuleBreak' | 'AlreadyExisted' | 'MissingDestination';

export const FPSResultCommonErrors: IFPSResultStatus[] = [ 
  'NoWeb' , 'NoList' , 'NoItem' , 'NoUser' ,'NoGroup', 'NoDepartment', 'AccessDenied', 'AlreadyExisted', 'MissingDestination' ];
