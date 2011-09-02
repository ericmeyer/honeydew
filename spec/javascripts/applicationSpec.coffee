describe 'Honeydew', ->
  beforeEach -> loadFixtures('index.html')

  describe 'ModalForm', ->
    form = null

    beforeEach -> form = new ModalForm($('form.new_task'), $('a.new_task'), $('.tasks'))
    afterEach -> form.closeDialog()

    it 'form hidden on page load', ->
      expect(form.element).toBeHidden()

    it 'a.new_task activates the form', ->
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


