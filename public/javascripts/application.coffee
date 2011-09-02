class window.ModalForm
  constructor: (@element, @activator) ->
    console.log("yippee")

$ ->
  form = new ModalForm($('form.new_story'), $('form.edit_story'))
