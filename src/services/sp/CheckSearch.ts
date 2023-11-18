
export function check4This( test: string, exactCase: boolean = false ) : boolean {

  // If text does not exist, then return true.
  if ( !test ) return true;

  const compareThis: string = exactCase === true ? window.location.search : window.location.search.toLowerCase();
  const withThis: string = exactCase === true ? test : test.toLowerCase();

  if ( compareThis.indexOf( withThis ) > -1 ) {
    return true;

  } else if ( test.indexOf( `=false`) > -1 && compareThis.indexOf( withThis ) > -1 ) {
    // have way to supress this log even if showAllConsole=true below https://github.com/mikezimm/Compliance/issues/178
    return false ;

  } else  if ( compareThis.indexOf( `showAllConsole=true`.toLowerCase() ) > -1 ) {
    return true;

  } else {
    return false ;
  };
}

