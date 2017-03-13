function addPromise (a, b) {
  return new Promise( function(reslove, reject) {
    if (typeof a === 'number' && typeof b === 'number') {
      reslove(a + b);
    } else {
      reject('You\'ve entered a invalid number!');
    }
  });
}

addPromise(4, 3).then(function (sum) {
  console.log('Promise sum:', sum);
}, function (error) {
  console.log('Error', error);
});

addPromise(4, '3').then(function (sum) {
  console.log('Promise sum:', sum);
}, function (error) {
  console.log('Error', error);
});
