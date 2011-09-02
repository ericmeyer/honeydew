(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.ModalForm = (function() {
    function ModalForm(element, link, target) {
      this.element = element;
      this.link = link;
      this.target = target;
      this.element.dialog({
        autoOpen: false,
        modal: true
      });
      this.link.live('click', __bind(function(e) {
        return this.activate(e);
      }, this));
      $('.ui-icon-closethick').die().bind('click', __bind(function(e) {
        return this.closeDialog();
      }, this));
    }
    ModalForm.prototype.closeDialog = function() {
      return this.element.dialog("close").unbind('submit');
    };
    ModalForm.prototype.activate = function(event) {
      if (event != null) {
        event.preventDefault();
      }
      this.element.dialog("open");
      return this.element.bind('submit', __bind(function(e) {
        e.preventDefault();
        return this.makeRequest();
      }, this));
    };
    ModalForm.prototype.makeRequest = function() {
      return $.ajax({
        type: this.element.attr('method'),
        url: this.element.attr('action'),
        data: this.element.serialize(),
        dataType: "html",
        success: __bind(function(html) {
          return this.onSuccess(html);
        }, this),
        statusCode: {
          422: __bind(function(json) {
            return this.onError(json);
          }, this)
        }
      });
    };
    ModalForm.prototype.onSuccess = function(html) {
      this.target.prepend(html);
      this.element[0].reset();
      return this.closeDialog();
    };
    ModalForm.prototype.onError = function(json) {
      alert("validation error");
      return console.log(json);
    };
    return ModalForm;
  })();
  $(function() {
    var form;
    return form = new ModalForm($('form.new_task'), $('a.new_task'), $('.tasks'));
  });
}).call(this);
