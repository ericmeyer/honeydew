describe 'Honeydew', ->
  beforeEach -> loadFixtures('index.html')

  describe 'ModalForm', ->
    form = null
    beforeEach ->
      form = new ModalForm($('form.new_task'))

    it 'form hidden on page load', ->
      expect($(form.element)).toBeHidden()
