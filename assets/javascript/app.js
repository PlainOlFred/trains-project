$(document).ready(function () {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDIC59MdchDa_B9578tXS8UjDFTtw1EbF8",
    authDomain: "trains-95424.firebaseapp.com",
    databaseURL: "https://trains-95424.firebaseio.com",
    projectId: "trains-95424",
    storageBucket: "trains-95424.appspot.com",
    messagingSenderId: "1005747001739",
    appId: "1:1005747001739:web:5fae4f9af328c0d335778e",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const trainRef = firebase.database().ref("trains/");

  let name = "";
  let dest = "";

    //Create schedule
    function createSched(start, freq) {
        const schedArray = new Array(Math.floor(1440 / freq)).fill(start); 
    
        return schedArray
    }

    //Create listItem 
    function createTrainListItem(route) {
        
        const trainListItem = $("<tr>");
       
        trainListItem.append($("<td>").text(route.name));
        trainListItem.append($("<td>").text(route.dest));
        // trainListItem.append($("td").text("Freq"));
        // trainListItem.append($("td").text("Next arrival"));
        // trainListItem.append($("td").text("Time Left"));

        return trainListItem
    }

    // Populate table
    function populateTable(routeObj) {
        $("#train-data-table").empty();
        console.log(routeObj)

        
        for(const route in routeObj) {
            $("#train-data-table").append(createTrainListItem(routeObj[route]))
        }
        
    }


  // Add train
  $("#add-train-btn").on("click", function (e) {
    e.preventDefault();
    name = $("#train-name").val();
    dest = $("#destination").val();



    
    trainRef.child(name).set({
      name,
      dest,
      
    })

    $('#addTrainModal').modal('toggle')

  });

  trainRef.on('value', (snapshot) => populateTable(snapshot.val()) )






  
});

