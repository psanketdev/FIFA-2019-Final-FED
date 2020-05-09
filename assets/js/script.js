/* Author: */
'use strict'
window.onload = function () {
  //Browser back button disable
  window.history.forward();
  function noBack() {
    window.history.forward();
  }

  //DOM selection
  var main = document.querySelector('main');
  var html = document.querySelector('html');

  // index-page functionality
  var login_page = document.querySelector('.container');
  var mainForm = document.querySelector('.main-container');
  var close = document.querySelector('.close');

  if (login_page.classList.contains('login-page')) {
    var signInBtn = document.querySelector('.signin-btn');
    signInBtn.addEventListener('click', function (e) {
      e.preventDefault();
      mainForm.classList.add('show');
    });
    close.addEventListener('click', function () {
      mainForm.classList.remove('show');
    })

    //validation for signin form
    var signinEmail = document.querySelector('.signin-email');
    var signinPassword = document.querySelector('.signin-password');
    var validemail = false;
    var validpassword = false;

    signinEmail.addEventListener('blur', function () {
      var email_regex = /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/;
      var emailStr = signinEmail.value;
      if (email_regex.test(emailStr)) {
        document.querySelector('.email_error').style.opacity = "0";
        validemail = true;
      }
      else {
        document.querySelector('.email_error').style.opacity = "1";
        validemail = false;
      }
    });

    signinPassword.addEventListener('blur', function () {
      var password_regex = /((?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z])){4,15}/;
      var passwordStr = signinPassword.value;
      if (password_regex.test(passwordStr)) {
        document.querySelector('.password_error').style.opacity = "0";
        validpassword = true;
      }
      else {
        document.querySelector('.password_error').style.opacity = "1";
        validpassword = false;
      }
    });

    var Login = document.querySelector('.sign-in');
    Login.addEventListener('click', submitForm);

    var Data = [
      { email: "sanket@gmail.com", password: "sanket@123" },
      { email: "prdxn@in.com", password: "prdxn@111" },
      { email: "pratiksha@d.com", password: "pratiksha@123" },
      { email: "psanket@mail.com", password: "psanket@1995" },
    ]

    function submitForm(e) {
      e.preventDefault();
      for (var i = 0; i < Data.length; i++) {
        if (signinEmail.value === Data[i].email && signinPassword.value === Data[i].password) {
          storeData();
          formReset();
        }
      }
    }

    //here we stored data in localstorage
    function storeData() {
      var data_stored = JSON.stringify(Data);
      var users = "user" + localStorage.length;
      localStorage.setItem(users, data_stored);
      window.location.assign("home.html");
    }

    //function for form reset
    function formReset() {
      document.querySelector('form').reset();
    }
  }


  //Page wise functionality
  if (main.classList.contains('home-main')) {
    homePageFunction();
  } else if (main.classList.contains('match-main')) {
    matchPageFunction();
  } else if (main.classList.contains('match-details-main')) {
    matchDetailsPageFunction();
  } else if (main.classList.contains('news-main')) {
    newsPageFunction();
  }



  // home page functionality
  function homePageFunction() {
    // Slick Slider Function for banner
    $('.main-slider').slick({
      dots: true,
      arrows: false,
      autoplay: true,
      infinite: true,
      autoplaySpeed: 2000
    });

    //slider function for timeline
    $('.timeline-slider').slick({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
          }
        }
      ]
    });
  }

  //match page functionality 
  var matchResult = document.querySelector('#match-result');
  var loadMore = document.querySelector('.load-more');
  function matchPageFunction() {
    //create ajax get request
    var request = new XMLHttpRequest();
    request.open('GET', `https://worldcup.sfg.io/matches`, true);

    //when a response is ready
    request.onload = function (e) {
      e.preventDefault();
      if (this.status == 200) {
        var Match_data = JSON.parse(this.responseText)
        var output = '';
        var maxresult = 5;
        for (var i = 0; i < maxresult; i++) {
          //store all list itemas i output var
          output +=
            '<li>' +
            '<h4>' + (Match_data[i].home_team.code) + '&nbsp; : &nbsp;' + (Match_data[i].away_team.code) + '</h4>' +
            '<span>' + (Match_data[i].home_team.goals) + '&nbsp; : &nbsp;' + (Match_data[i].away_team.goals) + '</span>' +
            '<span>' + '<span>Date:&nbsp;</span>' + Match_data[i].datetime + '</span>' +
            '<span>' + '<span>Venue:&nbsp;</span>' + Match_data[i].venue + '</span>' +
            '</li>';
        }
      }
      else {
        console.log('File not found...');
      }
      matchResult.innerHTML = output;

      //second loop to display next 5 cards
      var n = i;
      var btn = Match_data.length;
      loadMore.addEventListener('click', function () {
        for (var i = n; i < n + maxresult; i++) {
          output +=
            '<li>' +
            '<h4>' + (Match_data[i].home_team.code) + '&nbsp; : &nbsp;' + (Match_data[i].away_team.code) + '</h4>' +
            '<span>' + (Match_data[i].home_team.goals) + '&nbsp; : &nbsp;' + (Match_data[i].away_team.goals) + '</span>' +
            '<span>' + '<span>Date:&nbsp;</span>' + Match_data[i].datetime + '</span>' +
            '<span>' + '<span>Venue:&nbsp;</span>' + Match_data[i].venue + '</span>' +
            '</li>';
        }
        if (i == btn - 2) {
          loadMore.style.display = "none";
        }
        matchResult.innerHTML = output;
        n = n + 5;
      });
    }
    request.send();
  }

  //match-details functionality start
  var tab1Content = document.querySelector('#tab1-content');
  var tab2Content = document.querySelector('#tab2-content');
  var tab3Content = document.querySelector('#tab3-content');
  var tab4Content = document.querySelector('#tab4-content');
  function matchDetailsPageFunction() {
    //create ajax get request

    var request = new XMLHttpRequest();
    request.open('GET', `https://worldcup.sfg.io/matches`, true);
    //when a response is ready
    request.onload = function (e) {
      e.preventDefault();
      if (this.status == 200) {
        var Match_data = JSON.parse(this.responseText)
        console.log(Match_data[0]);
        var officials = Match_data[0].officials;

        //Tab content for summary
        var tab1Output =
          '<div class="officials-data">' +
          '<h5>' + 'Match Officials' + '</h5>' +
          '<span>' + officials + '</span>' +
          '</div>' +
          '<div class="winner-team">' +
          '<h5>' + 'Winner Team' + '</h5>' +
          '<span>' + Match_data[0].winner + '</span>' +
          '</div>';
        tab1Content.innerHTML = tab1Output;

        //Tab content for weather
        var tab2Output =
          '<div class="weather">' +
          '<h5>' + 'Weather' + '</h5>' +
          '<p>' + '<span>humidity : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>' + Match_data[0].weather.humidity + '%' + '</p>' +
          '<p>' + '<span>temperature : &nbsp;&nbsp;</span>' + Match_data[0].weather.temp_celsius + '%' + '</p>' +
          '<p>' + '<span>wind speed : &nbsp;&nbsp;&nbsp; </span>' + Match_data[0].weather.wind_speed + '&nbsp;km/s' + '</p>' +
          '<p>' + '<span>discription : &nbsp; </span>' + Match_data[0].weather.description + '</p>' +
          '</div>';
        tab2Content.innerHTML = tab2Output;

        //Tab content for Events
        var output1 = '';
        var output2 = ''
        var homeEvents = Match_data[0].home_team_events;
        var awayEvents = Match_data[0].away_team_events;
        for (var i = 0; i < homeEvents.length; i++) {
          output1 +=
            '<p>' + homeEvents[i].player + '&nbsp;:&nbsp;&nbsp;' + '<span>' + homeEvents[i].type_of_event + '</span>' + '</p>';
        }

        for (var j = 0; j < awayEvents.length; j++) {
          output2 +=
            '<p>' + awayEvents[j].player + '&nbsp;:&nbsp;&nbsp;' + '<span>' + awayEvents[j].type_of_event + '</span>' + '</p>';
        }

        var tab3Output =
          '<div>' +
          '<h5>' + Match_data[0].home_team.country + '</h5>' +
          output1 +
          '</div>' +
          '<div>' +
          '<h5>' + Match_data[0].away_team.country + '</h5>' +
          output2 +
          '</div>';
        tab3Content.innerHTML = tab3Output;

        //tab content for members
        var tab4Output =
          '<div>' +
          '<h5>' + Match_data[0].home_team.country + '&nbsp;player' + '</h5>' +
          '<ul class="hometeamMembers"></ul>' +
          '</div>';
        tab4Content.innerHTML = tab4Output;
        var hometeamMemberElement = document.querySelector('.hometeamMembers');
        var hometeamMembers = Match_data[0].home_team_statistics.starting_eleven;
        hometeamMembers.forEach(function (player, position) {
          var licreation = document.createElement('li');
          var span = document.createElement('span');
          licreation.innerText = player.name;
          span.innerText = player.position;
          licreation.appendChild(span);
          hometeamMemberElement.appendChild(licreation);
        })
      }
    }
    request.send();

    // tab functionality
    var tabItems = document.querySelectorAll('.tab-item');
    var tabItemContent = document.querySelectorAll('.tab-content');
    function getContent(e) {
      removeBorder();
      removeContent();
      this.classList.add('tab-border');
      var tabcontent = document.querySelector(`#${this.id}-content`);
      tabcontent.classList.add('show');
    }

    function removeBorder() {
      tabItems.forEach(function (item) {
        item.classList.remove('tab-border');
      });
    }

    function removeContent() {
      tabItemContent.forEach(function (item) {
        item.classList.remove('show');
      })
    }

    tabItems.forEach(function (item) {
      item.addEventListener('click', getContent);
    });
  }


  function newsPageFunction() {
    // video slider functionality
    $('.video-slider').slick({
      autoplay: true,
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToScroll: 1,
      slidesToShow: 1
    });
  }


  //function for hamburger//
  var burger = document.querySelector('.burger');

  burger.addEventListener('click', function () {
    var navlinks = document.querySelector('nav ul');
    var socialIcons = document.querySelector('.header-social-links');
    var logOut = document.querySelector('.log-out');
    if (navlinks.classList.contains('nav-active')) {
      navlinks.classList.remove('nav-active');
      burger.classList.remove('burger-active');
      socialIcons.classList.remove('social-active');
      logOut.classList.remove('log-out-active');
      html.classList.remove('no-scroll');
    } else {
      navlinks.classList.add('nav-active');
      burger.classList.add('burger-active');
      socialIcons.classList.add('social-active');
      logOut.classList.add('log-out-active');
      html.classList.add('no-scroll');
    }
  });

  //function for logout
  var logOut = document.querySelector('#log-out');
  logOut.addEventListener('click', logoutSession);

  function logoutSession(e) {
    localStorage.clear();
    window.location.assign("index.html");
  }

  //function for banck-top top
  var backToTop = document.querySelector('.top');
  window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTop.style.display = "block"
    } else {
      backToTop.style.display = "none"
    }
  }

  backToTop.addEventListener('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

}