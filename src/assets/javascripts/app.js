import $ from 'jquery';

$(() => {
  const $body = $('body');
  const $languageNavigators = $('.js--language-navigator li');
  const $languageArticles = $('.js--article');
  const $pageScrollers = $('.js--page-scroller');
  const changeArticle = (readLanguage) => {
    $languageArticles.hide();
    $languageArticles
      .filter(`.js--article--language-${readLanguage}`)
      .show();
  };
  $languageNavigators.on('click', (event) => {
    event.preventDefault();
    $languageNavigators.removeClass('active');
    const readLanguage = $(event.currentTarget).data('language');
    $(event.currentTarget).addClass('active');
    changeArticle(readLanguage);
  });
  changeArticle('ruby');

  $pageScrollers.on('click', (event) => {
    event.preventDefault();
    const scrollTo = $(event.currentTarget).data('scrollTo');
    if (scrollTo === 'top') {
      $body.animate({ scrollTop: 0 }, 200);
    } else if (scrollTo === 'bottom') {
      $body.animate({ scrollTop: $(window).height() }, 200);
    }
    $(event.currentTarget).blur();
  });

  // $(window).on('scroll', (event) => {
  //   if($(window).scrollTop() < 60) {
  //     $pageScrollers.fadeOut()
  //   }
  //   else if($pageScrollers.is(':hidden')) {
  //     $pageScrollers.fadeIn()
  //   }
  // })
});
