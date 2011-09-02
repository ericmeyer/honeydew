describe 'Honeydew', ->
  beforeEach -> loadFixtures('index.html')

  describe 'ModalForm', ->
    form = null

    beforeEach -> form = new ModalForm($('form.new_task'), $('a.new_task'), $('.tasks'))
    afterEach -> form.closeDialog()

    it 'form hidden on page load', ->
      expect(form.element).toBeHidden()

    it 'a.new_task shows the form', ->
      spyOn(form, 'activate')
      $('a.new_task').trigger('click')
      expect(form.activate).toHaveBeenCalled()

    it 'form.activate shows the form', ->
      form.activate()
      expect(form.element).toBeVisible()

    it 'form.activate listens for form submit', ->
      form.activate()
      expect(form.element).toHandle('submit')

    it 'form.closeDialog() hides form', ->
      form.closeDialog()
      expect(form.element).toBeHidden()

    it 'form.closeDialog() unbinds submit', ->
      spyOn(form.element, 'unbind')
      form.closeDialog()
      expect(form.element.unbind).toHaveBeenCalledWith('submit')

    it "form.makeRequest calls ajax, uses form method and action", ->
      spyOn($, 'ajax')
      form.makeRequest()
      expect($.ajax).toHaveBeenCalled()

    it "onSuccess appends returned HTML to .tasks", ->
      form.onSuccess('<div id="test">FOO</div>')
      expect(form.target).toContain('#test')

    it "onSuccess closes dialog", ->
      spyOn(form, 'closeDialog')
      form.onSuccess('<div id="test">FOO</div>')
      expect(form.closeDialog).toHaveBeenCalled()

    it "onSuccess resets the form", ->
      form.onSuccess('<div id="test">FOO</div>')
      expect(form.element.find('input[type="text"]').first().val()).toEqual("")

  describe 'ModalEditForm', ->
    form = null

    beforeEach -> form = new ModalEditForm($('form.edit_task'), $('a.edit_task'), $('.tasks'))
    afterEach -> form.closeDialog()

    #sanity spec
    it 'starts hidden', -> expect(form.element).toBeHidden()

    it 'gets task data on activate', ->
      spyOn(form, 'getTaskInfo')
      form.activate(jQuery.Event('click'))
      expect(form.getTaskInfo).toHaveBeenCalled()

    it 'unbinds submit on activate', ->
      spyOn(form.element, 'unbind')
      form.activate(jQuery.Event('click'))
      expect(form.element.unbind).toHaveBeenCalledWith('submit')

    it 'requests JSON from the url of the link', ->
      spyOn($, 'getJSON')
      form.getTaskInfo()
      expect($.getJSON).toHaveBeenCalled()

    it 'populates the form fields', ->
      data = { task: {name: 'bruce'} }
      form.populateForm(data)
      expect(form.element.find('input#task_name').val()).toEqual("bruce")
      expect(form.element.attr('method')).toEqual('PUT')


