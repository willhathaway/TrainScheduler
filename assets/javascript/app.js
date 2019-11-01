// Homework 7: Train Schedule
// Will Hathaway
// 11.01.2019



// firebase configuration:

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

// universal variables for firebase path:

let database = firebase.database();

let trainsReference = database.ref('/trains');

// on-click function for adding a train to the database:

$(document).on('click', '#add-train-btn', function (event) {

    // prevent the default form action from running:

    event.preventDefault();

    // console.log to check that on-click is working:

    console.log('click');

    // defines variables from the content of the form inputs:

    let trainName = $('#train-name-input').val().trim();
    let destination = $('#destination-input').val().trim();
    let frequency = $('#frequency-input').val().trim();
    let firstDeparture = $('#first-departure-input').val().trim();

    // checks that all fields were filled in before pushing to database:

    if (!trainName || !destination || !frequency || !firstDeparture) {
        alert('Please fill in all fields');
        return;
    }

    // pushes the new train to firebase:

    database.ref().push({

        name: trainName,
        destination: destination,
        frequency: frequency,
        firstDeparture: firstDeparture

    });

});

// event listener checks when a new child has been added to the database:

database.ref().on('child_added', function (snapshot) {

    // console.logs the data from the database:

    console.log('name: ' + snapshot.val().name);
    console.log('destination: ' + snapshot.val().destination);
    console.log('frequency: ' + snapshot.val().frequency);
    console.log('first departure: ' + snapshot.val().firstDeparture);

    // momentJS to calculate the minutesAway and nextArrival:

    // frequency and firstDeparture grabbed from the database snapshot:

    let frequency = snapshot.val().frequency;

    let firstDeparture = snapshot.val().firstDeparture;

    // firstDeparture is converted to ensure that the time entry is in the past:

    let firstDepartureConverted = moment(firstDeparture, "HH:mm").subtract(1, "years");

    // the timeDifference in minutes between the current time and the first departure:

    let timeDifference = moment().diff(firstDepartureConverted, "minutes");

    // the time difference is divided by the frequency:

    let timeSinceLastTrain = timeDifference % frequency;

    // the frequency minus the remainder of the timeSinceLastTrain gets the timeUntilNextTrain (minutesAway):

    let minutesAway = frequency - timeSinceLastTrain;

    // the nextArrival is the current time plus the minutes away, formatted in HH:mm:

    let nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");


    // DOM manipulation, adding the data to the table:

    let $tr = $('<tr>');

    let $nameTD = $('<td>').text(snapshot.val().name);
    let $destinationTD = $('<td>').text(snapshot.val().destination);
    let $frequencyTD = $('<td>').text(snapshot.val().frequency);
    let $minutesTD = $('<td>').text(nextArrival);
    let $nextTD = $('<td>').text(minutesAway);

    $tr.append($nameTD, $destinationTD, $frequencyTD, $minutesTD, $nextTD);

    $('#train-table').append($tr);

    // Handle the errors (taken from contacts activity):

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});