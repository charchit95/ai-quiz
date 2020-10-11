
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

// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkUserFullName(){
    var userSurname = document.getElementById("userFullName").value;
    var flag = false;
    if(userSurname === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userFullNameError").style.display = "block";
    }else{
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkUserSurname(){
    var userSurname = document.getElementById("userSurname").value;
    var flag = false;
    if(userSurname === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userSurnameError").style.display = "block";
    }else{
        document.getElementById("userSurnameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail(){
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userEmail.value.match(userEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userEmailError").style.display = "block";
    }else{
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword(){
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userPassword.value.match(userPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userPasswordError").style.display = "block";
    }else{
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserBio(){
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if(flag){
        document.getElementById("userBioError").style.display = "block";
    }else{
        document.getElementById("userBioError").style.display = "none";
    }
}
// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(){
    var userFullName = document.getElementById("userFullName").value;
    var userSurname = document.getElementById("userSurname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if(checkUserFullNameValid == null){
        return checkUserFullName();
    }else if(userSurname === ""){
        return checkUserSurname();
    }else if(checkUserEmailValid == null){
        return checkUserEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserPassword();
    }else{
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref('users/');
            var userData = {
                userFullName: userFullName,
                userSurname: userSurname,
                userEmail: userEmail,
                userPassword: userPassword,
                userFb: "https://www.facebook.com/",
                userTw: "https://twitter.com/",
                userGp: "https://plus.google.com/",
                userBio: "User biography",
            }
            firebaseRef.child(uid).set(userData);
            swal('Your Account Created','Your account was created successfully, you can log in now.',
            ).then((value) => {
                setTimeout(function(){
                    window.location.replace("../index.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}
// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail(){
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userSIEmail.value.match(userSIEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userSIEmailError").style.display = "block";
    }else{
        document.getElementById("userSIEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword(){
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userSIPassword.value.match(userSIPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userSIPasswordError").style.display = "block";
    }else{
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn(){
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if(checkUserEmailValid == null){
        return checkUserSIEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserSIPassword();
    }else{
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            swal({
                type: 'successfull',
                title: 'Succesfully signed in', 
            }).then((value) => {
                setTimeout(function(){
                    window.location.replace("./pages/quiz-home.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
    //   User is signed in.
        let user = firebase.auth().currentUser;
        let uid
        if(user != null){
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapShot)=>{
            document.getElementById("userPfFullName").innerHTML = dataSnapShot.val().userFullName;
            document.getElementById("userPfSurname").innerHTML = dataSnapShot.val().userSurname;
            // userEmail = dataSnapShot.val().userEmail;
            // userPassword = dataSnapShot.val().userPassword;
            document.getElementById("userPfFb").setAttribute('href', dataSnapShot.val().userFb);
            document.getElementById("userPfTw").setAttribute('href', dataSnapShot.val().userTw);
            document.getElementById("userPfGp").setAttribute('href', dataSnapShot.val().userGp);
            document.getElementById("userPfBio").innerHTML = dataSnapShot.val().userBio;
        })
    } else {
    //   No user is signed in.
    }
});
// xxxxxxxxxx Show edit profile form with detail xxxxxxxxxx
function showEditProfileForm(){
    document.getElementById("profileSection").style.display = "none"
    document.getElementById("editProfileForm").style.display = "block"
    var userPfFullName = document.getElementById("userPfFullName").innerHTML;
    var userPfSurname = document.getElementById("userPfSurname").innerHTML;
    var userPfFb = document.getElementById("userPfFb").getAttribute("href");
    var userPfTw = document.getElementById("userPfTw").getAttribute("href");
    var userPfGp = document.getElementById("userPfGp").getAttribute("href");
    var userPfBio = document.getElementById("userPfBio").innerHTML;
    document.getElementById("userFullName").value = userPfFullName; 
    document.getElementById("userSurname").value = userPfSurname; 
    document.getElementById("userFacebook").value = userPfFb; 
    document.getElementById("userTwitter").value = userPfTw; 
    document.getElementById("userGooglePlus").value = userPfGp; 
    document.getElementById("userBio").value = userPfBio; 
}
// xxxxxxxxxx Hide edit profile form xxxxxxxxxx
function hideEditProfileForm(){
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
}
// xxxxxxxxxx Save profile and update database xxxxxxxxxx
function saveProfile(){
    let userFullName = document.getElementById("userFullName").value 
    let userSurname = document.getElementById("userSurname").value 
    let userFacebook = document.getElementById("userFacebook").value 
    let userTwitter = document.getElementById("userTwitter").value 
    let userGooglePlus = document.getElementById("userGooglePlus").value 
    let userBio = document.getElementById("userBio").value
    var userFullNameFormate = /^([A-Za-z.\s_-])/; 
    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    if(checkUserFullNameValid == null){
        return checkUserFullName();
    }else if(userSurname === ""){
        return checkUserSurname();
    }else{
        let user = firebase.auth().currentUser;
        let uid;
        if(user != null){
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref('users/');
        var userData = {
            userFullName: userFullName,
            userSurname: userSurname,
            userFb: userFacebook,
            userTw: userTwitter,
            userGp: userGooglePlus,
            userBio: userBio,
        }
        firebaseRef.child(uid).set(userData);
        swal({
            type: 'successfull',
            title: 'Update successfull',
            text: 'Profile updated.', 
        }).then((value) => {
            setTimeout(function(){
                document.getElementById("profileSection").style.display = "block";

                document.getElementById("editProfileForm").style.display = "none";
            }, 1000)
        });
    }
}
// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        swal({
            type: 'successfull',
            title: 'Signed Out', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("../index.html");
            }, 1000)
        });
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}


document.getElementById("wholebody").onmouseleave = function() {
    disable_quiz();
    
};







function GlobalTime(numOfQuestions = 4) {
    this.globalTime = [];
    this.globalLength = numOfQuestions
  }
  
  
  GlobalTime.prototype.setNewTimerVal = function(time) {
    if(this.globalTime.lengh !== this.globalLength)
      this.globalTime.push(time)
  }
  
  
  let time = new GlobalTime()
  
  
  let int = null
  function Timer(length = 30000, secconds = 30) {
    this.passedTime = 0
    int = setInterval(() => {this.passedTime++, document.querySelector("#time").innerText = this.passedTime;  if(this.passedTime == secconds) {
      clearInterval(int)
      timer.finish()
      quiz.questionIndex++
      populate()
    }}, 1000)
  }
  
  Timer.prototype.finish = function() {
    window.clearInterval(int)
    time.setNewTimerVal(this.passedTime)
  }
  
  
  function Quiz(questions) {
      this.score = 0;
      this.questions = questions;
      this.questionIndex = 0;
  }
  
  
  Quiz.prototype.getQuestionIndex = function() {
      return this.questions[this.questionIndex];
  }
  
  
  Quiz.prototype.guess = function(answer) {
      if(this.getQuestionIndex().isCorrectAnswer(answer)) {
          this.score++;
      }
   
      this.questionIndex++
      timer.finish()
  }
  
  
  Quiz.prototype.isEnded = function() {
      return this.questionIndex === this.questions.length;
  }
  
  
  function Question(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
  }
  
  
  Question.prototype.isCorrectAnswer = function(choice) {
      return this.answer === choice;
  }
  
  
  let timer = null
  function populate() {
      if(quiz.isEnded()) {
          showScores();
         
      }
      else {
        timer = new Timer();
        console.log(timer)
          // show question
          var element = document.getElementById("question");
          element.innerHTML = quiz.getQuestionIndex().text;
   
          // show options
          var choices = quiz.getQuestionIndex().choices;
          for(var i = 0; i < choices.length; i++) {
              var element = document.getElementById("choice" + i);
              element.innerHTML = choices[i];
              guess("btn" + i, choices[i]);
          }
   
          showProgress();
      }
  };
   
  
  function guess(id, guess) {
      var button = document.getElementById(id);
      button.onclick = function() {
          quiz.guess(guess);
          populate();
      }
  };
   
   
  function showProgress() {
      var currentQuestionNumber = quiz.questionIndex + 1;
      var element = document.getElementById("progress");
      element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  };

  
  function showScores() {console.log(time)
      const overAllTimeArray = time.globalTime
      let overAllTime = 0
      overAllTimeArray.forEach((item) => {
        overAllTime+=item
      })
      stop();
      var gameOverHTML = "<h1>Result</h1>";
      const scorePerCent = Math.round(100 * quiz.score /quiz.questions.length);   // calculate the amount of question percent answered by the user
      // choose the image based on the scorePerCent
      let img = (scorePerCent > 80) ? "../images/5.png" :
                (scorePerCent >= 60) ? "../images/4.png" :
                (scorePerCent >= 40) ? "../images/3.png" :
                (scorePerCent >= 20) ? "../images/2.png" :
                "../images/1.png";
                         
      gameOverHTML += "<h2 id='score'><img src="+ img +"><br><br> Your scores: " + quiz.score + " out of " + quiz.questions.length + "</h2><h2>Total time taken: " + ((overAllTime / 60) | 0) + " mins " + (overAllTime % 60) + " sec";
      var element = document.getElementById("quiz");
      
      element.innerHTML = gameOverHTML;
                     
        // Get a reference of email from database
        //var IDofUser = firebase.auth().currentUser.uid;
        //const emailOfUser = firebase.database().ref(IDofUser + 'userEmail/').value;

        //var userUID = firebase.auth().currentUser.uid;

        //var emailOfUser = firebase.database().ref(userUID+"/").;

        var IDofUser = firebase.auth().currentUser.email;

        const rootRef = firebase.database().ref('report/');
        rootRef.push ({
            userkiemail: IDofUser,
            score: quiz.score,
            time: overAllTime
        });
  };
  
  
  
  // create questions here
  var questions = [
      new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML", "CSS", "HTML"], "HTML"),
      new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
      new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
      new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
      new Question("What are the 5 correct vowels?", ["AEIOU", "AIEOU", "AOIEU", "AUIOE"], "AEIOU")
  ];
  
  
  // create quiz
  var quiz = new Quiz(questions);
  
  // display quiz
  populate();









let videofeed;
let posenet;
let poses = [];
let started = false;
let foundpose = false;

function setup() {
  const canvas = createCanvas(500, 500);
  canvas.parent("video");

  videofeed = createCapture(VIDEO);
  videofeed.size(width, height);
  console.log("setup");

  posenet = ml5.poseNet(videofeed);

  posenet.on("pose", function (results) {
      poses = results;
//      console.log(poses);
  });

  videofeed.hide();
  noLoop();
}

function draw() {
  if (started) {
      image(videofeed, 0, 0, width, height);
      calEyes();
//      checkFace();
  }
}

function start() {
//  document.getElementById("startstop").addEventListener("click", stop);
  started = true;
  loop();
}

function stop() {
  started = false;
  document.getElementById('video').style.display = "none";
  noLoop();
}

var rightEye,
  leftEye,
  defaultRightEyePosition = [],
  defaultLeftEyePosition = [];

function calEyes() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      rightEye = pose.keypoints[2].position;
      leftEye = pose.keypoints[1].position;

        
      while (defaultRightEyePosition.length < 1) {
        defaultRightEyePosition.push(rightEye.y);
      }

      while (defaultLeftEyePosition.length < 1) {
        defaultLeftEyePosition.push(leftEye.y);
      }

      if (Math.abs(rightEye.y - defaultRightEyePosition[0]) > 15) {
          disable_quiz();

      }
      if (Math.abs(rightEye.y - defaultRightEyePosition[0]) < 15) {
        
      }
      
        
      if ((poses.length) === 0) {
          console.log('Right eye not found');
      }
    }
  }
}

//var button_disable = 0;
function disable_quiz() {
     
     swal('Quiz Disabled','You will not be able to do next Questions<br>But your Results will be Recorded.').then((value) => {
         setTimeout(function() {
             showScores();
         }, 1000)
    });
    button_disable = 1;
}

//function checkFace() {
//    console.log(rightEye.y)
//    if (rightEye.y = "") {
//        
//        disable_quiz();
//    }
//}

