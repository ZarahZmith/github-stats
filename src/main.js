
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

promise.then(function handleResponse(response) {

  // console.log('logs out status', response.status);

  if (response.status > 199 && response.status < 300) {
    response.json().then(function printUserData(userData) {
      console.log('User name :', userData.name);
      console.log('User location :', userData.location);
    });
  } else {
    console.log('Uh oh! Something went wrong. Please try again.', response.status);
  }

});

//-------------------------------------------------------------------------------
let promiseRepo = fetch(
  'https://api.github.com/users/' + userName + '/repos',
  {
    method: 'GET',
    headers: {
      Authorization: 'token ' + process.argv[3]
    }
  }
);

promiseRepo.then(function handleResponse(response) {

  if (response.status > 199 && response.status < 300) {
    response.json().then(function printStarData(repoData) {
      // console.log(repoData);

      // hold onto the highest count and the name for that winner
      let maxStarCount = {
        name: 'default',
        number: 0
      };

      repoData.forEach(function retrivesStarCount(repo) {
        // console.log(repo.stargazers_count, repo.name);
        if (repo.stargazers_count > maxStarCount.number) {
          maxStarCount.name = repo.name;
          maxStarCount.number = repo.stargazers_count;
        }
      });

      // print the winner
      console.log('Repo user owns with the most stars :', maxStarCount.name);

      // here you will know which one will will have the most
      // fetch again

      let contributerPromise = fetch(
        'https://api.github.com/repos/' + userName + '/' + maxStarCount.name  + '/contributors',
        {
          method: 'GET',
          headers: {
            Authorization: 'token ' + process.argv[3]
          }
        }
      );

      contributerPromise.then(function handleResponse(response) {
        if (response.status > 199 && response.status < 300) {
          response.json().then(function printContributorData(contributorData) {
            console.log(contributorData);
          });
        } else {
          console.log('Uh oh! Something went wrong. Please try again.', response.status);
        }
      });

    });
  } else {
    console.log('Uh oh! Something went wrong. Please try again.', response.status);
  }

});
