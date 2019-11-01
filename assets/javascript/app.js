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


console.log(trainsReference);

console.log(moment().format());

// functions:


$(document).on('click', '#add-train-btn', function (event) {

    event.preventDefault();

    console.log('click');

    let trainName = $('#train-name-input').val().trim();
    let destination = $('#destination-input').val().trim();
    let frequency = $('#frequency-input').val().trim();
    let firstDeparture = $('#first-departure-input').val().trim();

    if (!trainName || !destination || !frequency || !firstDeparture) {
        alert('Please fill in all fields');
        return;
    }

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




    let frequency = snapshot.val().frequency;

    let firstDeparture = snapshot.val().firstDeparture;

    let firstDepartureConverted = moment(firstDeparture, "HH:mm").subtract(1, "years");

    let timeDifference = moment().diff(firstDepartureConverted, "minutes");

    console.log(timeDifference);

    let timeSinceLastTrain = timeDifference % frequency;

    let minutesAway = frequency - timeSinceLastTrain;

    let nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");



    let $tr = $('<tr>');

    let $nameTD = $('<td>').text(snapshot.val().name);
    let $destinationTD = $('<td>').text(snapshot.val().destination);
    let $frequencyTD = $('<td>').text(snapshot.val().frequency);
    let $minutesTD = $('<td>').text(nextArrival);
    let $nextTD = $('<td>').text(minutesAway);

    $tr.append($nameTD, $destinationTD, $frequencyTD, $minutesTD, $nextTD);

    $('#train-table').append($tr);
    
      // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
    
    

    