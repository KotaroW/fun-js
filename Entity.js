/***************************************************************
 * File:			Entity.js
 * Written By:		KotaroW
 * Date:			19th February 2020
 * Last Modified:
 * Version:			Gamma
 * Description:
 *     For the general purpose
 *     if you wish to add additional functionalities to the class,
 *     the prototype/__proto__ can be used.
 ***************************************************************/

class Entity {
	// constructor
    // * argument must be an object (key/value pair)
   
	constructor (props) {
	    this.setProps (props);
    }
    
    // anything is acceptable as long is the argument is a key/value pair
    setProps (props) {
    	if ((typeof(props)).toLowerCase() == "object") {
			for (let key in props) {
        		this[key] = props[key];
        	}
        }
    }
    
    // returns property list
    getPropertyNames () {
    	return Object.getOwnPropertyNames(this);
    }
    
    // get value list
    getValues () {
    	return Object.values(this);
    }
    
    // make an Ajax call and get all the data
	// returns a promise object which can be used by the caller
    static makeGetReq(entityDataURI, wantXML) {
    	var promise = new Promise( (resolve, reject) => {
        	var xhr = new XMLHttpRequest();
            xhr.open('get', entityDataURI, true);
			xhr.send(null);            

			xhr.onreadystatechange = () => { 
				Entity.stateChangeHandler (xhr, wantXML, resolve, reject);
			};

        });

        return promise;
    }

	// post call
	// post data will get processed on server-side
	static makePostReq(entityProcessURI, reqType, data, wantXML) {
		var formData = new FormData();
		formData.append("req_type", reqType);
		// even a scalar data can be stringified
		formData.append("data_content", JSON.stringify(data));


		var promise = new Promise( (resolve, reject) => {
			var xhr = new XMLHttpRequest();
			xhr.open('post', entityProcessURI, true);
			xhr.send (formData);

			xhr.onreadystatechange = () => {
				Entity.stateChangeHandler (xhr, wantXML, resolve, reject);
			};
		});

		return promise;
	}

	// onreadystatechange handler
	static stateChangeHandler (xhr, wantXML, resolve, reject) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var res = wantXML ? xhr.responseXML : xhr.responseText;
					resolve (res);
			}
			else {
				reject (xhr);
			}
		}
	}
}

