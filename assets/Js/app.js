  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC3bDgi6uwwfoYqTaZebUlMNCwzT7UfXcs",
    authDomain: "rock-paper-scissors-8691e.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-8691e.firebaseio.com",
    projectId: "rock-paper-scissors-8691e",
    storageBucket: "rock-paper-scissors-8691e.appspot.com",
    messagingSenderId: "595564225196"
  };
  firebase.initializeApp(config);

    var dataRef = firebase.database();

    $("#submit-btn").on("click", function (event) {
      event.preventDefault();

     var name = $("#name-input").val().trim();
     var destination = $("#destination-input").val().trim();
     var time = $("#time-input").val().trim();
     var frequency = $("#frequency-input").val().trim();

     var trainInput = {
      train: name,
      tDestination: destination,
      firsTrainTime: time,
      frequencyMin: frequency
  };
      // Code for the push
      dataRef.ref().push(trainInput);
      console.log(trainInput.name);
      console.log(trainInput.destination);
      console.log(trainInput.time);
      console.log(trainInput.frequency);

      $("#train-section").append(newRow);

      alert("Train schedule successfully added");

      $("name-input").val("");
      $("#destination-input").val("");
      $("#time-input").val("");
      $("#frequency-input").val("");
    });

    dataRef.ref().on("child_added", function (childSnapshot) {
      console.log(childSnapshot.val());

      var name = childSnapshot.val().train;
      var destination = childSnapshot.val().tDestination;
      var time = childSnapshot.val().firsTrainTime;
      var frequency = childSnapshot.val().frequencyMin;
      // var firsTime = childSnapshot.val(); 

      var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = diffTime % frequency;
      console.log(tRemainder);
  
      // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
     
      var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(time),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
      );
        $("#train-section").append(newRow);

    })
