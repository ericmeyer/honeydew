(function() {
  describe('Honeydew', function() {
    beforeEach(function() {
      return loadFixtures('index.html');
    });
    return describe('ModalForm', function() {
      var form;
      form = null;
      beforeEach(function() {
        return form = new ModalForm($('form.new_task'));
      });
      return it('form hidden on page load', function() {
        return expect($(form.element)).toBeHidden();
      });
    });
  });
}).call(this);
