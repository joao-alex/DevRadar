module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(s=>s.trim());
}