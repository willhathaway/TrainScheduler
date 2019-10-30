const configuration = {
    apiKey: "AIzaSyD42eTyFcQny_NrQh839u-42DUqTTPWP-Q",
    authDomain: "train-scheduler-e38a6.firebaseapp.com",
    databaseURL: "https://train-scheduler-e38a6.firebaseio.com",
    projectId: "train-scheduler-e38a6",
    storageBucket: "train-scheduler-e38a6.appspot.com",
    messagingSenderId: "631617997296",
    appId: "1:631617997296:web:6005ffac0e5d1a78833535",
    measurementId: "G-5KNR73DNLY"
};

firebase.initializeApp(configuration);

// universal variables:

let database = firebase.database();

let trainsReference = database.ref('/trains');

let trainName = '';
let destination = '';
let frequency = '';
let firstDeparture = '';
let nextArrival = '';
let minutesAway = '';

console.log(trainsReference);

console.log(moment().format());

// universal functions:

function trainTime(frequency, firstDeparture) {

    // let the starting departure time for all trains = 06:00

    // the frequency of stops at the station be used to count the nextArrival time and the minutesAway time

    frequency = $('#frequency-input').val().trim();

    firstDeparture = $('#first-departure-input').val().trim();



}

$(document).on('click', '#add-train-btn', function (event) {

    event.preventDefault();

    console.log('click');

    trainName = $('#train-name-input').val().trim();
    destination = $('#destination-input').val().trim();
    frequency = $('#frequency-input').val().trim();
    firstDeparture = $('#first-departure-input').val().trim();

    database.ref().push({

        name: trainName,
        destination: destination,
        frequency: frequency,
        firstDeparture: firstDeparture

    });


});

database.ref().on('child_added', function (snapshot) {

    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().firstDeparture);


    $("#train-table").append("<tr><td>"+
    snapshot.val().name+
    "</td><td>" + snapshot.val().destination +
    "</td><td>" + snapshot.val().frequency +
    "</td><td>" + nextArrival +
    "</td><td>" + minutesAway +
    "</td></tr>");

      // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
    
    

    