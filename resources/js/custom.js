jQuery(function ($) {  
  //aside
  $('.asidebar').hover(function(){
    $(this).addClass('wide');
  },function(){
    $(this).removeClass('wide');
    if($('.aside li').hasClass('active')){
      $('.aside li').removeClass('active');
      $('.aside li').find('ul').slideUp(300);
    };
  });
  $('.asidebar > .close').click(function(){
    $('.asidebar').removeClass('wide');
  });

  $(function(){
    var aside = $('.aside');

    aside.find('li a').click(function(e){
      var li = $(this).parent();

      if(li.find('ul').length > 0){
        e.preventDefault();

        if(li.hasClass('active')){
          li.removeClass('active').find('li').removeClass('active');
          li.find('ul').slideUp(300);
        }else{

          if(li.parents('li.active').length == 0){
            aside.find('li').removeClass('active');
            aside.find('ul').slideUp(300);
          }else{
            li.parent().find('li').removeClass('active');
            li.parent().find('> li ul').slideUp(300);
          }

          li.addClass('active');
          li.find('>ul').slideDown(300);
        }
      };
    });
  });

  // mobile - header 
  $('.m-gnb-btn').on('click',function(){
    if($(this).hasClass('gnb-open')){
      $('body').removeClass('layer-open');
      $('.dim').remove(); 
      $(this).removeClass('gnb-open');
      $('#gnb').removeClass('gnb-open');
      $("a.dim").off('click');
      $('.nav_depth2').slideUp(500);//mobile 2depth menu
      $('.hub_gnb>ul>li').removeClass('active')//mobile 2depth menu
    } else {
      $('body').addClass('layer-open');
      $(this).before('<a class="dim"></a>');
      $(this).addClass('gnb-open');
      $('#gnb').addClass('gnb-open');
     
      $("a.dim").on('click', function(){
       $('.m-gnb-btn').trigger('click');       
      });
    }
  });  

  //mobile - aside
  asideOpen($('#mypage-btn'), $('#mpnb'));
  asideOpen($('#network-btn'), $('#ncnb'));

  function asideOpen(btnObj, asideObj) {
    $(btnObj).on('click',function(){
      $('body').addClass('layer-open');
      $(this).parents().next('.asidebar').before('<a class="dim"></a>');
      $(this).addClass('aside-open');
      $(asideObj).addClass('aside-open');
    });
    $('.asidebar .close').on('click',function(){
      $('body').removeClass('layer-open');
      $('.dim').remove(); 
      $(this).removeClass('aside-open');
      $(asideObj).removeClass('aside-open');
    });
  }


  //아코디언
  $(".sub-title.tog").on('click',function(){
    $(this).toggleClass('off');
    $(this).next("div.tog").slideToggle(200);
  });
  
  // 검색 탭
  $('.cate-list').click(function() {
    var activeTab = $(this).attr('data-tab');
    // $('.cate-list').removeClass('current');
    // $('.cate-list-tab').removeClass('current');
    
    if($(this).hasClass('current')){
      $(this).removeClass('current');
      $('#' + activeTab).removeClass('current');
    } else{
      $('.cate-list').removeClass('current');
      $('.cate-list-tab').removeClass('current');
      $(this).addClass('current');
      $('#' + activeTab).addClass('current');
    }
  });

  // 검색 - 플로팅
  $('#search-btn').on('click',function(){
    $('body').addClass('layer-open');
    $(this).after('<a class="dim"><i class="sr-only">close</i></a>');
    $('.search-bx').addClass('open');
  });
  $('.search-bx > .search-close').on('click',function(){
    $('body').removeClass('layer-open');
    $('.dim').remove(); 
    $('.search-bx').removeClass('open');
  });

  // ScrollTop 버튼
  $('#topBtn').hide();
  $(document).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('#topBtn').fadeIn();
    } else {
      $('#topBtn').fadeOut();
    }
  });
  $('#topBtn').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 200);
      return false;
  });

  //댓글 sub-btn 버튼
  $('.cBox-sub-btn .sub-btn').on('click', function(){
    $(this).next('.cBox-sub-inner').toggleClass('on');
  });

  // 기업자료 다운로드 버튼
  $('.site-list .btn2').on('click', function(){
    if ($(this).hasClass('btn-white')) {
      $(this).removeClass('btn-white');
      $(this).next('.list-sub').show();
    } else {
      $(this).addClass('btn-white');
      $('.list-sub').hide();
    }
  });

  // sns 공유하기
  $(".share-bx .sns-share").on('click',function(){
    $('.share-bx .sns-list').show();
  });
  $(".sns-list .close").on('click',function(){
    $('.sns-list').hide();
  }); 

  /****2022.04 추가 스크립트 */
 
 //리사이즈 dim 처리 
  $(window).resize(function(){
		if( window.innerWidth > 990 ){     
			location.reload();
		}
	});

  //pc 2depth menu
  var PCNAV = (function() {
    var $navBg = $("#gnb .dim_bg"),
      pcHeader = document.querySelector('#gnb'),
      targetMenu = null;
    function slideUp() {
      targetMenu.classList.remove('current');
      var th = $('.nav_depth2').innerHeight();
      $navBg.stop().animate({height:'0px'},0);
      $navBg.removeClass('on');
      // $('.gnb_dimmed').removeClass('active')
    }

    function slideDown(ev) {
      targetMenu = ev.target;
      if (targetMenu.querySelector(".nav_depth2")) {
        var th = $('.nav_depth2').innerHeight();
        $navBg.stop().animate({height:th + 'px'},0); 
        $navBg.addClass('on');
          ev.target.classList.add('current');
      }
      // $('.gnb_dimmed').addClass('active')
    }

    function event(target, evtType, fn) {
      var elList = document.querySelectorAll(target);

      Array.prototype.slice.call(elList).forEach(function(el) {
        el.addEventListener(evtType, fn);
      });
    }

    function init() {
      event("#gnb .hub_gnb>ul>li", "mouseenter", slideDown);
      event("#gnb .hub_gnb>ul>li, .navBg", "mouseleave", slideUp);
    }

    return {
        init: init,
        slideUp: slideUp,
        slideDown: slideDown
    }
  })();
  PCNAV.init();
  
  //mobile 2depth menu
  $('.hub_gnb>ul>li>a').click(function(e){
		if( window.innerWidth <= 990 ){
			e.preventDefault();
		}
	});
  
	$('.hub_gnb>ul>li').click(function(){
		if( window.innerWidth <= 1200 ){
			if($(this).hasClass('active')){									
				$(this).find('.nav_depth2').slideUp(500);					
				$(this).removeClass('active');
			}else{
				$('.nav_depth2').slideUp(500);
				$('.hub_gnb>ul>li').removeClass('active');
				$(this).find('.nav_depth2').slideDown(500);
				$(this).addClass('active');
			}
		}
	});

});

// 레이어팝업
function callPop(classId){
	// $(classId).bPopup();
  var bpopup = $(classId).bPopup();
	bpopup.reposition(0);
}

/******2022-04******/
$(function() {	
  AOS.init({
    duration: 1200		
  });
  // onElementHeightChange(document.body, function(){
  //   AOS.refresh();	
  // });
});

/*****ios bounce 막기******/
$(document).bind(
  'touchmove',
  function(e) {
  e.preventDefault();
  }
);


