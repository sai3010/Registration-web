// Initialize Firebase
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCdptDABvFMyrRx_Sr4Zx7zlbeCtoawFSA',
  authDomain: 'rnsitregistrationwebapp.firebaseapp.com',
  databaseURL: 'https://rnsitregistrationwebapp.firebaseio.com',
  projectId: 'rnsitregistrationwebapp',
  storageBucket: '',
  messagingSenderId: '1060794455179'
}
firebase.initializeApp(config)
var id
var databaseRef = firebase.database().ref('users/')
var db = '/users/'
// function save()     //to create ticket number db
// {
// var databaseRef = firebase.database().ref('ticketnumber/')
// var db='/ticketnumber/'
// var tid=0
// var data = {
//             tid:tid
//         }

//         var updates = {}
//         updates[db + tid] = data;            // + usn makes it a primary key.
//         firebase.database().ref().update(updates)
//         alert('success')

//         reload_page()
// }
function tstore () {
  var databaseRef = firebase.database().ref('ticketnumber/')
  var db = '/ticketnumber/'
  var data = {
    tid: id
  }
  var updates = {}
  updates[db + 0] = data
  firebase.database().ref().update(updates)
}
function save_user () {
  var databaseRef = firebase.database().ref('ticketnumber/')
  var db = '/ticketnumber/'
  databaseRef.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val() // gets all the child data
      id = childData.tid
    /*alert("first id")
    alert(id);*/
    })
  }).then(function () {
    var databaseRef = firebase.database().ref('users/')
    var db = '/users/'
    var user = firebase.auth().currentUser;
    var uemail = user.email;
    //alert(uemail);
    var gen = document.getElementById('gender')
    var mod = document.getElementById('mod')
    var shirt = document.getElementById('shirt')
    var size = document.getElementById('ssize')
    var strgen = gen.options[gen.selectedIndex].text.toUpperCase()
    var strmod = mod.options[mod.selectedIndex].text.toUpperCase()
    var strshirt = shirt.options[shirt.selectedIndex].text.toUpperCase()
    var strssize = size.options[size.selectedIndex].text.toUpperCase()
    var name = document.getElementById('fname').value.toUpperCase()
    var email = document.getElementById('email').value.toUpperCase()
    var phone = document.getElementById('mob').value
    var tn = document.getElementById('tn').value
    id = id + 1
    var tid = 'T' + id
    var data = {
      tid: tid,
      name: name,
      email: email,
      phone: phone,
      gender: strgen,
      shirt: strshirt,
      ssize:strssize,
      mop: strmod,
      transaction_num:tn,
      registered:uemail
    }

    var updates = {}
    updates[db + tid] = data
    firebase.database().ref().update(updates)
    alert('successfully Registered')
    tstore()
    change_page()
  })
}
function change_page () {
  window.location.href = 'ticket.html'
}

function logout () {
  firebase.auth().signOut()
  window.location = 'index.html'
}
function generate () {
  var email = document.getElementById('email').value.toUpperCase()
  var databaseRef = firebase.database().ref('users/')
  var db = '/users/'
  databaseRef.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key
      var childData = childSnapshot.val() // gets all the child data
      if (email == childData.email) {
        var Data=childData.shirt;
        var type =1;
         var optThree=  document.getElementById("optThree");
         var optTee = document.getElementsByClassName("optTee");
        if(Data.match("YES"))
        {
        // $('.name').html('<p>Name:' + childData.name + '</p>')
        // $('.email').html('<p>Email:' + childData.email + '</p>')
        // $('.gender').html('<p>Gender:' + childData.gender + '</p>')
        // $('.phone').html('<p>Phone:' + childData.phone + '</p>')
        // $('.tid').html('<p>Ticket Number:' + childData.tid + '</p>')
        // $('.shirt').html('<p>Shirt:' + childData.shirt + '</p>')
        // $('.ssize').html('<p>Shirt Size:' + childData.ssize + '</p>')
        // $('.Regby').html('<p>Registered By:' + childData.registered + '</p>')
        $('#tkt').css("display","block");
        document.getElementById("number").innerHTML=""+childData.tid+"";
        alert("yes");
        
        for(i=0;i<optTee.length;i++){
          optTee[i].style.display = "initial";
        }
        optThree.style.display = "initial";
        
        
        }
        else if(Data.match("NO"))
        {
          $('#tkt').css("display","block");
          document.getElementById("number").innerHTML=""+childData.tid+"";
          alert("no");
          for(i=0;i<optTee.length;i++){
          optTee[i].style.display = "none";
        }
        optThree.style.display = "none";
        }
      }
    })
  })
}
