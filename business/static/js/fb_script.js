  //initializing and seting up facebook js skd
  var idsession, username, firstname, lastname, email, link, gender;
  var user_profile = [];
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '934179676718416',
        xfbml      : true,
        version    : 'v2.8'
      });
      FB.AppEvents.logPageView();/*
      FB.getLoginStatus(function(response){
        if (response.status == 'connected'){
          document.getElementById('status').innerHTML = "We are connected"
        }
        else if (response.status == 'not_authorized'){
          document.getElementById('status').innerHTML = "We are not logged in"
        }
        else{
          document.getElementById('status').innerHTML = "You are not logged into facebook"
        }
      });*/
    };

  function sharefb() {
    FB.ui({
      method: 'feed',
      link: 'http://fraseslocas.com/wp-content/uploads/2015/03/frases-de-exito-3.jpg',
      caption: 'Así es!!',
      description: 'Así es!'
    }, function(response){
      if (response && !response.error_message){
        alert('link posted');
      }
      else{
        alert('error posting');
      }
    });
  }

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function login(){
      FB.login(function(response){
        if (response.status == 'connected'){
          FB.api('/me?fields=id,name,email,first_name,last_name,link,gender', function(response) {
            idsession = response.id;
            firstname = response.first_name;
            lastname = response.last_name;
            email = response.email;
            link = response.link;
            gender = response.gender;
            user_profile.push(idsession);
            user_profile.push(firstname);
            user_profile.push(lastname);
            user_profile.push(email);
            user_profile.push(link);
            user_profile.push(gender);

            $.ajax({
              url: '/',
              method: 'POST',
              data: {csrfmiddlewaretoken : '{{ csrf_token }}', 'ejemplo': 'Holaaa ejemplo', 'user_fb': user_profile}
              
            });

          });
        scope:
          document.getElementById('status').innerHTML = "You are logged in";
        }
        else if (response.status == 'not_authorized'){
          document.getElementById('status').innerHTML = "We are not logged in";
        }
        else{
          document.getElementById('thanks').innerHTML = "";
          document.getElementById('product').style.visibility = "visible";
          document.getElementById('product').src = "{% static 'images/product.png' %}";
          document.getElementById('text1').innerHTML = "Product XYZ";
          document.getElementById('text2').innerHTML = "Nuevo producto xyz, que te permite hacer xyz cosas en x menor tiempo. Ingresa y participa por uno de los sorteos que tenemos para que te lleves un kit completamente gratis";
          document.getElementById('social_links').style.display = "block";
          document.getElementById('slider').style.display = "none";
          document.getElementById('referal_link').style.display = "none";
        }
      });
    }

