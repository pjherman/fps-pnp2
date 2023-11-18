
/**
 * Added for https://github.com/mikezimm/drilldown7/issues/369
 * Takes a typical rest filter and replaces references like [Today -7] with proper rest filter string
 * @param restFilter 
 * @returns 
 */
export function getTodayRestFilter( restFilter: string ): string {

  if ( !restFilter ) return '';

  if ( restFilter && restFilter.indexOf('[Today') > 1 ) {
    const currentTime = new Date().toISOString();
    //Replace [Today] with currect time
    restFilter = restFilter.replace(/\B\[Today\]\B/gi, `datetime'${currentTime}'`);

    //Regex looks for anything matching [Today-+xxx] and replaces with date string
    // NOTE This did not work:  "MeetingDate gt datetime'2023-09-17T00:08:07.458Z'"
    restFilter = restFilter.replace(/\[Today(.*?)\]/gi, (match => {
      let numb = parseInt(match.toLowerCase().substring(6).replace("]", ""), 10);
      const today = new Date();
      var newdate = new Date();
      newdate.setDate(today.getDate() + numb);
      let newDateString = newdate.toISOString();
      // return `'${newDateString}'`;
      return `datetime'${newDateString}'`;
    }));
  }

  return restFilter;

}