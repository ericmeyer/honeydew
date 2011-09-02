(function() {
  window.ModalForm = (function() {
    function ModalForm(element) {
      this.element = element;
      this.element.dialog({
        autoOpen: false
      });
    }
    return ModalForm;
  })();
  $(function() {
    var form;
    return form = new ModalForm($('form.new_task'));
  });
}).call(this);
