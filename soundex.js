function soundex(arg) {
	var replacedWithZero = /[aeiouyhwāēīōūȳ]/g;
    var consonantReplacements = [
    	null,
        /[bfpv]/g,
        /[cgjkqsxz]/g,
        /[dt]/g,
        /[l]/g,
        /[mn]/g,
        /[r]/g
    ];

	// string type needed and it should be processed
	str = (typeof(arg) == "string") ? arg : arg.toString();
    str = str.toLowerCase();
	str = str.replace(/\s/g, '');
	
	// preserve the first character
    var firstChar = str.charAt(0);
    // and the rest
    var strBody = str.substr(1);
    
    // bowels and etc
	strBody = strBody.replace(replacedWithZero, '0');
    
    // consonants replacement
    [1,2,3,4,5,6].map(
    	function (index) {
        	strBody = strBody.replace(consonantReplacements[index], index.toString());
        }
    );
    
    // reduce the repeating (same) digits into one digit
    strBody = strBody.replace(
    	/(\d)\1+/g,
        function (match, $1, offset, original) {
        	return $1;
        }
    );

	// finally remove zeroes
    strBody = strBody.replace(/0/g, '');

	// pad the value with zeros if it is less than 4 character-long
    strBody = (strBody.length >= 3) ? strBody : strBody + ('0'.repeat(3 - strBody.length));
    
    

    var returnValue = firstChar + strBody;
    
	return returnValue;
}
