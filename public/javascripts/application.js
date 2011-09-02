(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
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
  window.ModalEditForm = (function() {
    __extends(ModalEditForm, window.ModalForm);
    function ModalEditForm() {
      ModalEditForm.__super__.constructor.apply(this, arguments);
    }
    ModalEditForm.prototype.activate = function(event) {
      this.element.unbind('submit');
      this.url = event.target;
      this.getTaskInfo();
      return ModalEditForm.__super__.activate.call(this, event);
    };
    ModalEditForm.prototype.getTaskInfo = function() {
      return $.getJSON(this.url, __bind(function(data) {
        return this.populateForm(data);
      }, this));
    };
    ModalEditForm.prototype.populateForm = function(data) {
      if (this.url != null) {
        this.element.attr('action', this.url);
      }
      this.element.attr('method', 'PUT');
      return $.each(data.task, __bind(function(key, value) {
        this.element.find("input[name='task[" + key + "]']").val(value);
        return this.element.find("textarea[name='task[" + key + "]']").val(value);
      }, this));
    };
    ModalEditForm.prototype.onSuccess = function(html) {
      return alert("implement me!");
    };
    return ModalEditForm;
  })();
  $(function() {
    var editForm, form;
    form = new ModalForm($('form.new_task'), $('a.new_task'), $('.tasks'));
    return editForm = new ModalEditForm($('form.edit_task'), $('a.edit_task'), $('.tasks'));
  });
}).call(this);
