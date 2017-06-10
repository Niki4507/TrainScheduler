// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD-zx0ChSs9ajfieDsCMW-r46kTlgdtGzQ",
    authDomain: "trilogy-f10ee.firebaseapp.com",
    databaseURL: "https://trilogy-f10ee.firebaseio.com",
    projectId: "trilogy-f10ee",
    storageBucket: "trilogy-f10ee.appspot.com",
    messagingSenderId: "352367184159"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var trainName = 0;
var destination = "";
var frequency = "";
var trainTime = "";
var nextArrival ="" ;
var minutesAway = 0;
// --------------------------------------------------------------

 database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().trainTime);
      console.log(childSnapshot.val().nextArrival);
      console.log(childSnapshot.val().minutesAway);
      

      // full list of items to the well

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


$("#submit-bid").on("click", function(event) {

  event.preventDefault();

    console.log($("#train-name").val());
  	console.log($("#destination").val());
    console.log($("#first-train").val());
  	console.log($("#frequency").val());

   trainName = $("#train-name").val().trim();
   destination = $("#destination").val().trim();
   frequency = $("#frequency").val().trim();
   trainTime= $("#train-time").val().trim();
   nextArrival = $("#nextArrival").val().trim();
   minutesAway = $("#minutesAway").val().trim();
    
    
    

  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(trainTime);
  console.log(nextArrival);
  console.log(minutesAway);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival:nextArrival
      });


   // First Train Time (subtracting a year)
    var trnTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trnTimeConverted);

  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trnTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var trainRemainder = diffTime % Frequency;
    console.log(trainRemainder);

    // Minute Until Train
    var trainMinutesTill = Frequency - trainRemainder;
    console.log("MINUTES TILL TRAIN: " + trainMinutesTill);

    // Next Train
    var nextArrival = moment().add(trainMinutesTill, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  //append to the table
  $("#table-body").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + moment(nextArrival).format("HH:mm") + "</td><td>" + trainMinutesTill + "</td><td>" + "" + "</td></tr>");
});

  

