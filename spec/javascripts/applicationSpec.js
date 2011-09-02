(function() {
  describe('Honeydew', function() {
    return describe('ModalForm', function() {
      var form;
      form = null;
      beforeEach(function() {
        return form = new ModalForm;
      });
      return it('form hidden on page load', function() {
        return expect($(form.element)).toBeHidden();
      });
    });
  });
}).call(this);
