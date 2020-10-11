var firebaseConfig = {
    apiKey: "AIzaSyDIeAa9LCmYCOTiNPh2lBOOhuBiQ1i8tuQ",
    authDomain: "quiz-c5eac.firebaseapp.com",
    databaseURL: "https://quiz-c5eac.firebaseio.com",
    projectId: "quiz-c5eac",
    storageBucket: "quiz-c5eac.appspot.com",
    messagingSenderId: "501451214519",
    appId: "1:501451214519:web:acd0f1e057daed4a6f0732",
    measurementId: "G-4RDGJER6GJ"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const rootRef = firebase.database().ref('report/');



rootRef.on('value', function(snapshot) {
    const listTableBody = document.getElementById("list-table-body");
    snapshot.forEach(function(child) {
      issue = child.val();
      // console.log(issue);
      var row = document.createElement("tr");
            row.innerHTML = "<td>" + issue.userkiemail + "</td><td>" + issue.score + "</td><td>" + issue.time + "</td>";

      listTableBody.append(row);
    });
        
        
        
    console.log(snap.val());
});





//           
//           
//rootRef.on('value', function(snapshot) {
//    const listTableBody = document.getElementById("list-table-body");
//
//    // clear all the table rows first
////    listTableBody.textContent = "aa";
//
//    snapshot.forEach((child) => {
//      issue = child.val();
//      // console.log(issue);
//      var row = document.createElement("tr");
//      row.innerHTML = "<td>" + issue.userkiemail + "</td><td>" + issue.score + "</td><td>" + issue.time + "</td>";
//
//      listTableBody.append(row);
//    });
//
//  },
//
//  (error) => {
//    console.log("Error: " + error.code);
//  }
//
//);