(function() {
  window.ModalForm = (function() {
    function ModalForm(element, activator) {
      this.element = element;
      this.activator = activator;
      console.log("yippee");
    }
    return ModalForm;
  })();
  $(function() {
    var form;
    return form = new ModalForm($('form.new_story'), $('form.edit_story'));
  });
}).call(this);
