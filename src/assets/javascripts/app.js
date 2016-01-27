import $ from 'jquery'

$( () => {
  const $language_navigators = $('.js--language-navigator li')
  const $language_articles = $('.js--article')
  $language_navigators.on('click', (event) => {
    event.preventDefault()
    $language_articles.hide()
    const readLanguage = $(event.currentTarget).data('language')
    console.log(readLanguage)
    $language_articles
    .filter(`.js--article--language-${readLanguage}`)
    .show()
  })
})
