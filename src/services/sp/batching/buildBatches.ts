


//  /**
//   *
//   * @param prop example:  Id or Title
//   * @param items example:  array of Items
//   * @param maxLength :  //Max is 2048 for entire Url per - http://blog.binaryrepublik.com/2020/05/how-to-overcome-url-length-limitation.html#.YPmv1uhKieg
//   *
//   * 'Id eq ' + idsToGet.join(' or Id eq ');
//   * Testing found that 1225 length of filter string caused 404 error.
//   *
//   */

// export function buildFilterBatches ( prop: string, items: any [], maxLength: number = 1000 ): string[] {

//   let filters: string[] = [''];
//   let filterIndex = 0;

//   items.map( item => {
//       if ( filters[ filterIndex ].length > maxLength ) {
//           filters.push('');
//           filterIndex ++;
//       }

//       if ( filters[ filterIndex ].length === 0 ) { filters[ filterIndex ] = `${ prop } eq `; } else { filters[ filterIndex ] += ` or ${ prop } eq ` ; }
//       filters[ filterIndex ] += item ; 

//   });
//   return filters;

// }