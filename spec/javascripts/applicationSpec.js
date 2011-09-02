(function() {
  describe('Honeydew', function() {
    beforeEach(function() {
      return loadFixtures('index.html');
    });
    describe('ModalForm', function() {
      var form;
      form = null;
      beforeEach(function() {
        return form = new ModalForm($('form.new_task'), $('a.new_task'), $('.tasks'));
      });
      afterEach(function() {
        return form.closeDialog();
      });
      it('form hidden on page load', function() {
        return expect(form.element).toBeHidden();
      });
      it('a.new_task shows the form', function() {
        spyOn(form, 'activate');
        $('a.new_task').trigger('click');
        return expect(form.activate).toHaveBeenCalled();
      });
      it('form.activate shows the form', function() {
        form.activate();
        return expect(form.element).toBeVisible();
      });
      it('form.activate listens for form submit', function() {
        form.activate();
        return expect(form.element).toHandle('submit');
      });
      it('form.closeDialog() hides form', function() {
        form.closeDialog();
        return expect(form.element).toBeHidden();
      });
      it('form.closeDialog() unbinds submit', function() {
        spyOn(form.element, 'unbind');
        form.closeDialog();
        return expect(form.element.unbind).toHaveBeenCalledWith('submit');
      });
      it("form.makeRequest calls ajax, uses form method and action", function() {
        spyOn($, 'ajax');
        form.makeRequest();
        return expect($.ajax).toHaveBeenCalled();
      });
      it("onSuccess appends returned HTML to .tasks", function() {
        form.onSuccess('<div id="test">FOO</div>');
        return expect(form.target).toContain('#test');
      });
      it("onSuccess closes dialog", function() {
        spyOn(form, 'closeDialog');
        form.onSuccess('<div id="test">FOO</div>');
        return expect(form.closeDialog).toHaveBeenCalled();
      });
      return it("onSuccess resets the form", function() {
        form.onSuccess('<div id="test">FOO</div>');
        return expect(form.element.find('input[type="text"]').first().val()).toEqual("");
      });
    });
    return describe('ModalEditForm', function() {
      var form;
      form = null;
      beforeEach(function() {
        return form = new ModalEditForm($('form.edit_task'), $('a.edit_task'), $('.tasks'));
      });
      afterEach(function() {
        return form.closeDialog();
      });
      it('starts hidden', function() {
        return expect(form.element).toBeHidden();
      });
      it('gets task data on activate', function() {
        spyOn(form, 'getTaskInfo');
        form.activate(jQuery.Event('click'));
        return expect(form.getTaskInfo).toHaveBeenCalled();
      });
      it('unbinds submit on activate', function() {
        spyOn(form.element, 'unbind');
        form.activate(jQuery.Event('click'));
        return expect(form.element.unbind).toHaveBeenCalledWith('submit');
      });
      it('requests JSON from the url of the link', function() {
        spyOn($, 'getJSON');
        form.getTaskInfo();
        return expect($.getJSON).toHaveBeenCalled();
      });
      return it('populates the form fields', function() {
        var data;
        data = {
          task: {
            name: 'bruce'
          }
        };
        form.populateForm(data);
        expect(form.element.find('input#task_name').val()).toEqual("bruce");
        return expect(form.element.attr('method')).toEqual('PUT');
      });
    });
  });
}).call(this);
