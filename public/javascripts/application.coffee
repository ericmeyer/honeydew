class window.ModalForm
  constructor: (@element, @link, @target) ->
    @element.dialog(autoOpen: false, modal: true)
    @link.live 'click', (e) => @activate(e)
    $('.ui-icon-closethick').die().bind 'click', (e) => @closeDialog()

  closeDialog: -> 
    @element.dialog("close").unbind('submit')

  activate: (event) ->
    event.preventDefault() if event?
    @element.dialog "open"
    @element.bind 'submit', (e) =>
      e.preventDefault()
      @makeRequest()

  makeRequest: ->
    $.ajax
      type: @element.attr('method')
      url:  @element.attr('action')
      data: @element.serialize()
      dataType: "html"
      success: (html) => @onSuccess(html)
      statusCode: { 422: (json) => @onError(json) }

  onSuccess: (html) ->
    @target.prepend(html)
    @element[0].reset()
    @closeDialog()

  onError: (json) ->
    alert "validation error"
    console.log(json)


$ ->
  form = new ModalForm($('form.new_task'), $('a.new_task'), $('.tasks'))
