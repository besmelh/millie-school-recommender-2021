export function cleanFieldName(fieldName){
    var final = '';
    var words = fieldName.split("_");

    for (var i = 0; i < words.length; i++){
        var cleanedWord = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        if (i === 0){
            final = cleanedWord;
        } else {
            final = final + ' ' + cleanedWord;
        }
    }

    return final;
}


