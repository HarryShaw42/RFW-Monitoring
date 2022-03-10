window.onload = function() {
  GetConnectToken()
  //EMRServer()
  //ConnectWebiste()
  //refreshPageTimer()
  //setpagetime()
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



/*
#########################################################
EMR SERVER ##############################################
#########################################################
*/


function EMRServer() {


  var productServiceUrl = 'http://rfwdcemr01.royalfarwest.org.au:8077/MMProfileServices.asmx?op=HelloServer'; // Preferably write this out from server side

  function beginSaveProduct(productID, productName, manufactureDate)
  {
  var soapMessage ='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><HelloServer xmlns="Intrahealth.Accession.Web.Services.MMProfileServices" />';

  $.ajax({
  url: productServiceUrl,
  type: "POST",
  dataType: "xml",
  data: soapMessage,
  complete: endSaveProduct,
  contentType: "text/xml; charset=\"utf-8\""
  });

  return false;
  }

  function endSaveProduct(xmlHttpRequest, status)
  {
   $(xmlHttpRequest.responseXML)
      .find('SaveProductResult')
      .each(function()
   {
     var name = $(this).find('Name').text();
   });
  }






/*


var soapMessage = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><HelloServer xmlns="Intrahealth.Accession.Web.Services.MMProfileServices" /></soap:Body></soap:Envelope>';

$.ajax({
//curl -H "Content-Type: application/json" -X GET -H "X-Auth-Token: 791a0df3-0526-463c-8217-f9702430215a" "https://online.royalfarwest.org.au/app/api/external-emr/filter?page=1&pageSize=100"

       'url' : 'http://rfwdcemr01.royalfarwest.org.au:8077/MMProfileServices.asmx?op=HelloServer',
       'type' : 'POST',
       'dataType': "xml",
       'data': soapMessage,
       //'processData': false,
       headers: {
       'Content-Type' : 'Text/xml',
       'Access-Control-Allow-Headers': '*'
       },
       'success' : function(data) {
          alert(success)
       },
       'error' : function(request,error) {
         alert(error)
       }
   });


*/
 }

 /*
 #########################################################
 Connect Webiste ####################################
 #########################################################
 */






function ConnectWebiste() {

  $.ajax({
//curl -H "Content-Type: application/json" -X GET -H "X-Auth-Token: 791a0df3-0526-463c-8217-f9702430215a" "https://online.royalfarwest.org.au/app/api/external-emr/filter?page=1&pageSize=100"

       'url' : 'https://online.royalfarwest.org.au/app/assets/images/logo-large.png',
       'type' : 'GET',
       'crossDomain': true,
       'complete' : function(data) {
          console.log(data)
       },
       'error' : function(request,error){
         console.log('WAAAA')
       }
       });
}




/*
#########################################################
Connect Intergration ####################################
#########################################################
*/

function GetConnectToken() {
  var user = window.location.href.split("%27")[1];
  var password = window.location.href.split("%27")[3];

  $.ajax({
//curl -H "Content-Type: application/json" -X GET -H "X-Auth-Token: 791a0df3-0526-463c-8217-f9702430215a" "https://online.royalfarwest.org.au/app/api/external-emr/filter?page=1&pageSize=100"

       'url' : 'https://online.royalfarwest.org.au/app/api/login',
       'type' : 'POST',
       'Content-Type' : 'application/json',
       'data' : 'username=' + user + '&password=' + password,
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
         SetSystemStatus()
       }
       });
}

function CheckConnectIntergration(token) {
$.ajax({
//curl -H "Content-Type: application/json" -X GET -H "X-Auth-Token: 791a0df3-0526-463c-8217-f9702430215a" "https://online.royalfarwest.org.au/app/api/external-emr/filter?page=1&pageSize=100"

       'url' : 'https://online.royalfarwest.org.au/app/api/external-emr/filter?page=1&pageSize=25',
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
           SetSystemStatus()
       },
       'error' : function(request,error)
       {
           $('#ConnectIntergrationStatus')[0].innerHTML = 'FAILING';
           $('#ConnectIntergrationStatus')[0].style.color = 'red';
           $('#ConnectIntergrationTitle')[0].style.color = 'red';
           $('#ConnectIntergrationStatus')[0].classList.add('FAILED');
           $('#ConnectIntergrationTitle')[0].classList.add('FAILED');
           SetSystemStatus()
       }
   });
 }


function SetSystemStatus(){

  if($('.FAILED').length == 0 ){
    $('#SystemStatus')[0].innerHTML = "WORKING"
    $('#SystemStatus')[0].style.color = 'Green';
  } else {
    $('#SystemStatus')[0].innerHTML = "FAILING"
    $('#SystemStatus')[0].style.color = 'red';
  }
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
