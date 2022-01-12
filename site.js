window.onload = function() {
  CheckConnectIntergration()
}

function CheckConnectIntergration() {
$.ajax({
//curl -H "Content-Type: application/json" -X GET -H "X-Auth-Token: 791a0df3-0526-463c-8217-f9702430215a" "https://online.royalfarwest.org.au/app/api/external-emr/filter?page=1&pageSize=100"

       'url' : 'https://online.royalfarwest.org.au/app/api/external-emr/filter?page=1&pageSize=20',
       'type' : 'GET',
       'Content-Type' : 'application/json',
        headers: {
        'X-Auth-Token' : '791a0df3-0526-463c-8217-f9702430215a',
       },
       'success' : function(data) {
           var failed = false
           for (let i = 0; i < data.content.length; i++) {
             console.log(data.content[i].successful)
             if(data.content[i].successful == false){
               $('#ConnectIntergrationStatus')[0].innerHTML = 'FAILING';
               $('#ConnectIntergrationStatus')[0].style.color = 'red';
               $('#ConnectIntergrationTitle')[0].style.color = 'red';
               $('#ConnectIntergrationStatus')[0].classList.add('FAILED');
               $('#ConnectIntergrationTitle')[0].classList.add('FAILED');
               failed = true
               break
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
