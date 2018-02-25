function processArray(arr, callback) {
    // if(typeof callback === string){

    // }
    // console.log(typeof callback);
    var resultArr = new Array(); 
    for (var i = arr.length-1; i >= 0; i--)
        resultArr[i] = callback(arr[i]);
    return resultArr;
}

var arr = [1, 2, 3, 4];
var arrReturned = processArray(arr, function(arg) {return arg * -1;});
// arrReturned would be [-1, -2, -3, -4]

console.log(arrReturned)