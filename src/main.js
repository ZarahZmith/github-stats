
// how we get input from the terminal
console.log( process.argv[2], process.argv[3] );


// use fetch() to get some user data from github and print it out
// only print out the name and location of the user

let fetch = require('node-fetch');
let userName = process.argv[2];

let promise = fetch(
  'https://api.github.com/users/' + userName,
  {
    method: 'GET',
    headers: {
      Authorization: 'token ' + process.argv[3]
    }
  }
);

promise.then(function handleUserResponse(response) {

  // console.log('logs out status', response.status);

  if (response.status > 199 && response.status < 300) {
    response.json().then(function printUserData(userData) {
      console.log(userData.name, userData.location);
    });
  } else {
    console.log('Uh oh! You did something wrong. Please try again.', response.status);
  }

});


// let Promise = fetch(
//   'https://api.github.com/users/' + userName + '/repos',
//   {
//     method: 'GET',
//     headers: {
//       Authorization: 'token ' + process.argv[3]
//     }
//   }
// );
//
// starDataPromise.then(function handleStarResponse(starResponse) {
//
//   console.log(starResponse);
//
//   if (starResponse.status > 199 && starResponse.status < 300) {
//     starResponse.json().then(function printStarData(starData) {
//       console.log(starData);
//
//       starData.forEach(function retrivesStarCount(starCount) {
//
//       });
//
//     });
//   } else {
//     console.log('Uh oh! You did something wrong. Please try again.', starResponse.status);
//   }
//
// });
