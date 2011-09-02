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

class window.ModalEditForm extends window.ModalForm
  activate: (event) ->
    @element.unbind('submit')
    @url = event.target
    @getTaskInfo()
    super event

  getTaskInfo: -> $.getJSON @url, (data) => @populateForm(data)

  populateForm: (data) ->
    @element.attr('action', @url) if @url?
    @element.attr('method', 'PUT')
    $.each data.task, (key, value) =>
      @element.find("input[name='task[#{key}]']").val(value)
      @element.find("textarea[name='task[#{key}]']").val(value)

  onSuccess: (html) ->
    alert "implement me!"

$ ->
  form = new ModalForm($('form.new_task'), $('a.new_task'), $('.tasks'))
  editForm = new ModalEditForm($('form.edit_task'), $('a.edit_task'), $('.tasks'))
