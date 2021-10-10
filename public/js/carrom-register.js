const scriptURL = 'https://script.google.com/macros/s/AKfycbxhr9w9BjG3Xef28TXGItNQYMPMqj9MHHdNITURohgXATHUXR-FdQT28erUuY6cGYcilA/exec';
const form = document.forms['submit-to-google-sheet']
form.addEventListener('submit', e => {
  document.getElementById("loader_").style.display = "block";
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      console.log('Success!', response);
      document.getElementById("loader_").style.display = "none";
      error_show("Your response has been recorded!!");
      location.reload();
    })
    .catch(error => {console.error('Error!', error.message);
    document.getElementById("loader_").style.display = "none";
    // location.reload();
  })
})

function error_show(e) {
  var x = document.getElementById("snackbar_");
  x.innerHTML = e;
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}

// function _submitForm(){
//   // document.getElementById("loader_").style.display = "block";
//   var team_name = $("#team_name").val();
//   var no_team = $("#no_team").val();
//   var team_leader_name = $("#team_leader_name").val();
//   var team_leader_roll = $("#team_leader_roll").val();
//   var team_leader_email = $("#team_leader_name").val();
//   var team_leader_contact = $("#team_leader_name").val();
//   var team_member_2_name = $("#team_member_2_name").val();
//   var team_member_2_roll = $("#team_member_2_roll").val();
//   var team_member_3_name = $("#team_member_3_name").val();
//   var team_member_3_roll = $("#team_member_3_roll").val();
//   var team_member_4_name = $("#team_member_4_name").val();
//   var team_member_4_roll = $("#team_member_4_roll").val();
//   var team_member_5_name = $("#team_member_5_name").val();
//   var team_member_5_roll = $("#team_member_5_roll").val();
  
//   if (parseInt(team_leader_contact)<=9999999999){
//     if(team_leader_email.endsWith("@iitgn.ac.in")){
//       var jqxhr = $.ajax({
//         url: scriptURL,
//         method: "GET",
//         dataType: "json",
//         data: $form.serializeObject()
//       }).success(
//         error_show("Your response has been recorded!!"),
//       );
//     }
//   }  
// }
