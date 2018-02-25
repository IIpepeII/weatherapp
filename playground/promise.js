var asyncAdd = (a,b) => {
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
            if(typeof a === 'number' && typeof b === 'number'){
                resolve( a + b );
            }else{
                reject('Arguments must be numbers');
            }
        }, 1500);
    });
};

asyncAdd(7,4).then((res) => {
    console.log('Result: ' + res);
    return asyncAdd(res, 33);
}).then((res) => {
    console.log('Should be 44: ', res);
}).catch((errorMessage) => {
    console.log(errorMessage);
});

// asyncAdd(7,4).then((res) => { //if you change 7 or 4 to string, cause of the error handling the chain not end, the then() will run
//     console.log('Result: ' + res);
//     return asyncAdd(res, 33); //chane 33 to '33' -> the chain will end
// }, (errorMessage) => {
//     console.log(errorMessage);
// }).then((res) => {
//     console.log('Should be 44: ', res);
// }, (errorMessage) => {
//     console.log(errorMessage);
// });

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//      //   resolve('Hey! It worked');
//      reject('Unable to fullfill promise');
//     }, 2500);
// });

// somePromise.then((message) => {
//     console.log('Success: ', message);
// }, (errorMessage) => {
//     console.log(`Error: ${errorMessage}`);
// });
