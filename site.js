window.onload = function() {
  GetConnectToken()
  //CheckConnectIntergration()
  refreshPageTimer()
  setpagetime()
}

function refreshPageTimer() {
  setTimeout(function(){
    location.reload();
  }, 60000);
}



function setpagetime() {
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  $('#time')[0].innerHTML = time;
}



function GetConnectToken() {
  $.ajax({
//curl -H "Content-Type: application/json" -X GET -H "X-Auth-Token: 791a0df3-0526-463c-8217-f9702430215a" "https://online.royalfarwest.org.au/app/api/external-emr/filter?page=1&pageSize=100"

       'url' : 'https://online.royalfarwest.org.au/app/api/login',
       'type' : 'POST',
       'Content-Type' : 'application/json',
       'data' : 'username=emr.scan&password=4RZv2b5YT',
       'success' : function(data) {
         //console.log(data.split('"')[3])
         CheckConnectIntergration(data.split('"')[3]);
       },
       'error' : function(request,error){
         $('#ConnectIntergrationStatus')[0].innerHTML = 'FAILING';
         $('#ConnectIntergrationStatus')[0].style.color = 'red';
         $('#ConnectIntergrationTitle')[0].style.color = 'red';
         $('#ConnectIntergrationStatus')[0].classList.add('FAILED');
         $('#ConnectIntergrationTitle')[0].classList.add('FAILED');
       }
       });
}

function CheckConnectIntergration(token) {
$.ajax({
//curl -H "Content-Type: application/json" -X GET -H "X-Auth-Token: 791a0df3-0526-463c-8217-f9702430215a" "https://online.royalfarwest.org.au/app/api/external-emr/filter?page=1&pageSize=100"

       'url' : 'https://online.royalfarwest.org.au/app/api/external-emr/filter?page=1&pageSize=20',
       'type' : 'GET',
       'Content-Type' : 'application/json',
        headers: {
        'X-Auth-Token' : token,
       },
       'success' : function(data) {
           var failed = false
           var count = 0
           for (let i = 0; i < data.content.length; i++) {
             console.log(data.content[i].successful)
             if(data.content[i].successful == false){
               count = count + 1;
               if(count => 3){
                 failed = true
                 $('#ConnectIntergrationStatus')[0].innerHTML = 'FAILING';
                 $('#ConnectIntergrationStatus')[0].style.color = 'red';
                 $('#ConnectIntergrationTitle')[0].style.color = 'red';
                 $('#ConnectIntergrationStatus')[0].classList.add('FAILED');
                 $('#ConnectIntergrationTitle')[0].classList.add('FAILED');
                 break
               }
             }
           }
           if(failed == false){
             $('#ConnectIntergrationStatus')[0].innerHTML = 'PASSING';
             $('#ConnectIntergrationStatus')[0].style.color = 'Green';
             $('#ConnectIntergrationTitle')[0].style.color = 'Green';
           }
       },
       'error' : function(request,error)
       {
           $('#ConnectIntergrationStatus')[0].innerHTML = 'FAILING';
           $('#ConnectIntergrationStatus')[0].style.color = 'red';
           $('#ConnectIntergrationTitle')[0].style.color = 'red';
           $('#ConnectIntergrationStatus')[0].classList.add('FAILED');
           $('#ConnectIntergrationTitle')[0].classList.add('FAILED');
       }
   });
 }


/* ###### */
for (let i = 0; i < 1000; i++) {

  setTimeout(function(){
    $(".FAILED").fadeIn();
  }, 800);
  setTimeout(function(){
    $(".FAILED").fadeOut();
  }, 800);
}
