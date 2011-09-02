describe 'Honeydew', ->
  
  describe 'ModalForm', ->
    form = null
    beforeEach ->
      form = new ModalForm

    it 'form hidden on page load', ->
      expect($(form.element)).toBeHidden()
