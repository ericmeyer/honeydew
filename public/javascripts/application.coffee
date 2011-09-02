class window.ModalForm
  constructor: (@element) ->
    @element.dialog(autoOpen: false)

$ ->
  form = new ModalForm($('form.new_task'))
