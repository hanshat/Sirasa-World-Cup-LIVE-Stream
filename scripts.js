var MAIN_URL = "https://apilive.sirasatv.lk";

function initialize() {
  loadNowPlaying();
  loadAllMatches();
  loadNextMatches();
};

function loadNowPlaying() {
  $.get(MAIN_URL + "/match/NOW_PLAYING", function (data) {

    for (match in data) {
      var html = "<div class=\"col-md-6 matchCard blob\" style=\"margin:auto\"> " +
        "<div class=\"card mt-3\" " +
        "onclick=\"location.href=('./player.html?match=" + data[match].id + "');\"" +
        "style=\"cursor: pointer;\">" +
        "<div class=\"row\">" +
        "<div class=\"col-4 img-col\">" +
        "<img src=\"" + data[match].imageLeft + "\" class=\"img-fluid mt-1\">" +
        "<h6>" + data[match].teamLeft + " </h6>" +
        "</div>" +
        "<div class=\"col-4\" style=\"margin-top:1%;padding:0;\">" +
        "<h5>" + data[match].cardTitle + "</h5>" +
        "<p class=\"meta-data\"><br> " + data[match].location + "" +
        "<br>" + data[match].airDate + "" +
        "</p>" +
        "<div style=\"display: flex;justify-content: center;align-content: center\">" +

        "<span class=\"badge alert-success\"" +
        "  style=\"background-color: #ff0000;border: 2px solid white;color: white;\">" +
        data[match].cardStatus + "</span>" +
        "</div>" +
        "</div>" +
        "<div class=\"col-4 img-col\">" +
        "<img src=\"" + data[match].imageRight + "\" class=\"img-fluid mt-1\">" +
        "<h6>" + data[match].teamRight + "</h6>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

      $("#div-resentMatch").append(html);
    }
  });
}

var currentPage = 0;
var limit = 5;
var sliderKey = true;

function loadNextMatches() {
  $.get(MAIN_URL + "/match/NEXT?limit=" + limit + "&offset=" + currentPage, function (data) {
    var swiperWrapper = $("#div-next-match");
    if (data.length === 0) { sliderKey = false; }

    for (match in data) {
      var html =
        '<div class="swiper-slide">' +
        '  <div>' +
        '    <a class="tile-img">' +
        "<img src=\"" + data[match].thum_img + "\" class=\"img-fluid mt-1 pr-image\">" +
        '    </a>' +
        '    <div class="d-flex justify-content-between">' +
        '      <p class="epiName">' + data[match].name + '</p>' +
        '    </div>' +
        '    <div class="d-flex justify-content-between">' +
        '      <p class="epiTag">' + data[match].airDate + '</p>' +
        '      <p class="epiTag">' + data[match].location + '</p>' +
        '    </div>' +
        '    <div class="row d-flex justify-content-between">' +
        '      <div class="circle-image"></div>' +
        '      <div class="circle-image"></div>' +
        '    </div>' +
        '  </div>' +
        '</div>';

      swiperWrapper.append(html);
    }

    var swiper = new Swiper(".nextSwiper", {
      slidesPerView: 4,
      spaceBetween: 28,
      loop: false,
      centerSlide: 'true',
      fade: 'true',
      grabCursor: 'true',
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
      },
      on: {
        slideChange: function () {
          if (this.isEnd && sliderKey) {
            currentPage++;
            loadNextMatches();
          }
        }
      },
    });
  });
}

var currentPage2 = 0;
var limit2 = 5;
var sliderKey2 = true;

function loadAllMatches() {
  $.get(MAIN_URL + "/match/RECORDS?limit=" + limit2 + "&offset=" + currentPage2, function (data) {
    var swiperWrapper = $("#div-all-match");
    if (data.length === 0) { sliderKey2 = false; }
    console.log(data.length);
    for (match in data) {
      var html =
        '<div class="swiper-slide">' +
        '  <div>' +
        '    <a class="tile-img">' +
        "<img src=\"" + data[match].thum_img + "\" class=\"img-fluid mt-1 pr-image\">" +
        '    </a>' +
        '    <div class="d-flex justify-content-between">' +
        '      <p class="epiName">' + data[match].name + '</p>' +
        '    </div>' +
        '    <div class="d-flex justify-content-between">' +
        '      <p class="epiTag">' + data[match].airDate + '</p>' +
        '      <p class="epiTag">' + data[match].location + '</p>' +
        '    </div>' +
        '    <div class="row d-flex justify-content-between">' +
        '      <div class="circle-image"></div>' +
        '      <div class="circle-image"></div>' +
        '    </div>' +
        '  </div>' +
        '</div>';

      swiperWrapper.append(html);
    }

    var swiper = new Swiper(".allSwiper", {
      slidesPerView: 4,
      spaceBetween: 28,
      loop: false,
      centerSlide: 'true',
      fade: 'true',
      grabCursor: 'true',
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
      },
      on: {
        slideChange: function () {
          console.log(this.isEnd);
          if (this.isEnd && sliderKey2) {
            currentPage2++;
            loadAllMatches();
          }
        }
      },
    });
  });
}

function initializePlayer() {
  let params = (new URL(document.location)).searchParams;
  let name = params.get("match");

  $.get(MAIN_URL + "/player/" + name, function (data) {
    var html = data.player;
    $("#player-div").append(data.player);
  });

}