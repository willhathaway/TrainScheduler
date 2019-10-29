const configuration = {
    apiKey: "AIzaSyD42eTyFcQny_NrQh839u-42DUqTTPWP-Q",
    authDomain: "train-scheduler-e38a6.firebaseio.com",
    databaseURL: "https://train-scheduler-e38a6.firebaseio.com",
    projectId: "train-scheduler-e38a6",
    storageBucket: "train-scheduler-e38a6.appspot.com",
    messagingSenderId: "631617997296",
    appId: "1:631617997296:web:6005ffac0e5d1a78833535",
    measurementId: "G-5KNR73DNLY"
};

firebase.initializeApp(configuration);

let database = firebase.database();

let trainsReference = database.ref('/trains');

console.log(trainsReference);

console.log(moment().format());

database.ref().on('value', function(snap) {

});

// universal functions:

function trainTime(frequency) {

    // let the starting departure time for all trains = 06:00

    // the frequency of stops at the station be used to count the nextArrival time and the minutesAway time
}



$('#add-train-btn').on('click', function (event) {

event.preventDefault();

    let trainName = $('#train-name-input').val().trim();
    let destination = $('#destination-input').val().trim();
    let frequency = $('#frequency-input').val().trim();
    let firstDeparture = $('#first-departure-input').val().trim();


    let newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstDeparture: firstDeparture
    };

    trainsReference.push(newTrain);

    console.log(newTrain);

    newTrainArray = [newName, newDestination, newFrequency, newNextArrival, newMinutesAway];

    let newRow = $('<tr>')

    let newName = $('<td>');
    let newDestination = $('<td>');
    let newFrequency = $('<td>');
    let newNextArrival = $('<td>');
    let newMinutesAway = $('<td>');

    $(newName).text(newTrain.name);
    $(newDestination).text(newTrain.destination);
    $(newFrequency).text(newTrain.frequency);
    $(newNextArrival).text('x')
    $(newMinutesAway).text('x');

    for (let i = 0; i<newTrainArray.length; i++){
        $(newRow).append(newTrainArray[i]);
    }

    $("#train-table").append(newRow);

});