var dribbbleWall = dribbbleWall || {};

$(function($, dribbbleWall) {

  var username = 'Tusk';
  var access_token = 'd287e55ef1f607c0706dc069ac156b6116cd03dcf4463b26b5eb0c3b9270b378';
  var page = 1;

  dribbbleWall.init = function init() {
    function blurToggle(elem) {
      $('.blur').removeClass('blur');
      elem.addClass('blur');
    }

    $('.item-overlay').on('mouseover click', function() {
      blurToggle($(this).parent().find('img.item-background'));
    });

    function toggleFavourite(heart) {
      if (heart.hasClass('favourited')) {
        heart.removeClass('favourited');
      } else {
        heart.addClass('favourited');
      }
    }

    $('.item-favourite').on('click', function() {
      toggleFavourite($(this).parent().find('.heart'));
    });
  }

  dribbbleWall.loadItems = function loadItems() {
    var url = 'https://api.dribbble.com/v1/users/' + username + '/shots?access_token=' + access_token + '&page=' + page + '&callback=?';
    $.getJSON(url, function(resp) {
      page += 1;
      if (resp.data.length > 0) {
        $.each(resp.data.reverse(), function(i, item) {
          $('.container').append(
            `
              <div class="item">
                <img class="item-background" src="` + item.images.hidpi + `">
                <div class="item-overlay">
                  <div class="item-name">
                    ` + item.title + `
                  </div>
                  <div class="item-author">
                    ` + username + `
                  </div>
                  <br>
                  <img class="heart" src="img/heart.svg" alt="heart">
                  <input class="item-favourite" type="button" value="Favourite">
                </div>
              </div>
            `
          );
        });
        dribbbleWall.init();
      }
    });
  }

  dribbbleWall.loadItems();

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  window.onscroll = debounce(function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        dribbbleWall.loadItems();
    }
  }, 250, false);

  return dribbbleWall;

}(jQuery, dribbbleWall));
