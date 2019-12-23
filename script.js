// file: script.js
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBpReZ8gU2rMsKd2elFWJAnbIT47CL9C6c",
    authDomain: "project-2380087351098995304.firebaseapp.com",
    databaseURL: "https://project-2380087351098995304.firebaseio.com",
    projectId: "project-2380087351098995304",
    storageBucket: "project-2380087351098995304.appspot.com",
    messagingSenderId: "364221507153"
};
firebase.initializeApp(config);

//create firebase database reference
var dbRef = firebase.database();
var contactsRef = dbRef.ref('contacts');

//load older conatcts as well as any newly added one...
contactsRef.on("child_added", function(snap) {
  console.log("added", snap.key, snap.val());
  $('#contacts').append(contactHtmlFromObject(snap.val()));
});

//save contact
$('.addValue').on("click", function( event ) {  
    event.preventDefault();
    if( $('#name').val() != '' || $('#email').val() != '' ){
      contactsRef.push({
        name: $('#name').val().replace(/<[^>]*>/ig, ""),
        email: $('#email').val().replace(/<[^>]*>/ig, ""),
        location: {
          city: $('#city').val().replace(/<[^>]*>/ig, ""),
          state: $('#state').val().replace(/<[^>]*>/ig, ""),
          zip: $('#zip').val().replace(/<[^>]*>/ig, "")
        }
      })
      contactForm.reset();
    } else {
      alert('Please fill atlease name or email!');
    }
  });

//prepare conatct object's HTML
function contactHtmlFromObject(contact){
  console.log( contact );
  var html = '';
  html += '<li class="list-group-item contact">';
    html += '<div>';
      html += '<p class="lead">'+contact.name+'</p>';
      html += '<p>'+contact.email+'</p>';
      html += '<p><small title="'+contact.location.zip+'">'+contact.location.city+', '+contact.location.state+'</small></p>';
    html += '</div>';
  html += '</li>';
  return html;
}
