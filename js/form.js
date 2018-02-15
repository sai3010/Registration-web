// Initialize Firebase
    var config = {
    apiKey: "AIzaSyAqIvSVJoknpvLJHG6Qn0om0JDfGVgJqdE",
    authDomain: "webapp-faf2d.firebaseapp.com",
    databaseURL: "https://webapp-faf2d.firebaseio.com",
    projectId: "webapp-faf2d",
    storageBucket: "webapp-faf2d.appspot.com",
    messagingSenderId: "294281955476"
    };
    firebase.initializeApp(config);
    var id;
    var databaseRef = firebase.database().ref('users/');
    var db='/users/';
    /*function save()     //to create ticket number db
    {
    var databaseRef = firebase.database().ref('ticketnumber/');
    var db='/ticketnumber/';
    var tid=0;
    var data = {
                tid:tid
            }

            var updates = {};
            updates[db + tid] = data;            // + usn makes it a primary key.
            firebase.database().ref().update(updates);
            alert('success');

            reload_page();
    }*/
    function tstore()
    {
    var databaseRef = firebase.database().ref('ticketnumber/');
    var db='/ticketnumber/';
    var data = {
          tid:id
           }
    var updates = {};
            updates[db + 0] = data;         
            firebase.database().ref().update(updates);
   }
     function save_user() {
      var databaseRef = firebase.database().ref('ticketnumber/');
    var db='/ticketnumber/';
    databaseRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();  //gets all the child data
                id=childData.tid;
                /*alert("first id");
                alert(id);*/
            });
             }).then(function(){
            var databaseRef = firebase.database().ref('users/');
            var db='/users/';
            var gen = document.getElementById("gender");
            var mod = document.getElementById("mod");
            var strgen = gen.options[gen.selectedIndex].text.toUpperCase();
            var strmod = mod.options[mod.selectedIndex].text.toUpperCase();

            var name = document.getElementById('fname').value.toUpperCase();
            var email = document.getElementById('email').value.toUpperCase();
            var phone = document.getElementById('mob').value;
            id=id+1;
            var tid="T"+id;
            var data = {
                tid:tid,
                name:name,
                email:email,
                phone:phone,
                gender:strgen,
                mop:strmod
              }

            var updates = {};
            updates[db + tid] = data;            
            firebase.database().ref().update(updates);
            alert('successfully Registered');
            tstore();
            change_page();
        });
  }
function change_page() {
    window.location.href="ticket.html";
   }

function logout(){
  firebase.auth().signOut();
  window.location="index.html";
}
function generate()
{
  var email = document.getElementById('email').value.toUpperCase();
  var databaseRef = firebase.database().ref('users/');
  var db='/users/';
  databaseRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();  //gets all the child data
                if(email==childData.email)
                {
                  $( ".name" ).html("<p>Name:"+childData.name+"</p>");
                  $( ".email" ).html("<p>Email:"+childData.email+"</p>");
                  $( ".phone" ).html("<p>Phone:"+childData.phone+"</p>");
                  $( ".tid" ).html("<p>Ticket Number:"+childData.tid+"</p>");
                }
});
            });
}