'use strict'

exports.parseEnvironmentJson = (jsonString) => {
    //check to ensure jsonString isn't empty or undefined
    if(!jsonString || jsonString === ""){
        return {}
    }
    let json = JSON.parse(jsonString);
    let resultArray = [];
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            resultArray.push({name: key, value: json[key]});
        }
    }
    return resultArray
} 