import $ from 'jquery'

$( () => {
  const $body = $('body')
  const $language_navigators = $('.js--language-navigator li')
  const $language_articles = $('.js--article')
  const $page_scrollers = $('.js--page-scroller')
  const changeArticle = (read_language) => {
    $language_articles.hide()
    $language_articles
      .filter(`.js--article--language-${read_language}`)
      .show()
  }
  $language_navigators.on('click', (event) => {
    event.preventDefault()
    $language_navigators.removeClass('active')
    const read_language = $(event.currentTarget).data('language')
    $(event.currentTarget).addClass('active')
    changeArticle(read_language)
  })
  changeArticle('ruby')

  $page_scrollers.on('click', (event) => {
    event.preventDefault()
    const scroll_to = $(event.currentTarget).data('scrollTo')
    if(scroll_to === 'top') {
      $body.animate({ scrollTop: 0 }, 200)
    }
    else if(scroll_to === 'bottom') {
      $body.animate({ scrollTop: $(window).height() }, 200)
    }
    $(event.currentTarget).blur()
  })

  // $(window).on('scroll', (event) => {
  //   if($(window).scrollTop() < 60) {
  //     $page_scrollers.fadeOut()
  //   }
  //   else if($page_scrollers.is(':hidden')) {
  //     $page_scrollers.fadeIn()
  //   }
  // })
})
