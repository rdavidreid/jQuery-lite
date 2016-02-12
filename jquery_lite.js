/* globals
  Root
*/

(function() {
  if(typeof window.Root === "undefined") {
    window.Root = {};
  }

  Root.$l = function(arg) {
    if(typeof arg === "string") {
      var nodeList = document.querySelectorAll(arg);
      nodeList = [].slice.call(nodeList);
      return new DOMNodeCollection(nodeList);
    }
    else if(typeof arg === "object" && arg instanceof HTMLElement) {
      return new DOMNodeCollection([arg]);
    }
  };

  // jQuery lite object

  function DOMNodeCollection(htmlElements) {
    this.htmlElements = htmlElements;
    this.eventHandlers = {};
    this.queuedFunctions = [];
  }

  DOMNodeCollection.prototype.html = function(string) {
    if(string === undefined){
      return this.htmlElements[0].innerHTML;
    }
    this.htmlElements.forEach(function(htmlElement) {
      htmlElement.innerHTML = string;
    });
    return this.htmlElements;
  };

  DOMNodeCollection.prototype.empty = function() {
    this.html("");
    return this.htmlElements;
  };

  DOMNodeCollection.prototype.append = function(arg) {
    if(typeof arg === "object" && arg instanceof DOMNodeCollection) {
      this.htmlElements.forEach(function(htmlElement) {
        arg.htmlElements.forEach(function(argElement) {
          htmlElement.innerHTML += argElement.innerHTML;
        });
      });
    }
    else if(typeof arg === "object" && arg instanceof HTMLElement) {
      this.htmlElements.forEach(function(htmlElement) {
        htmlElement.innerHTML += arg.innerHTML;
      });
    }
    else if (typeof arg === "string") {
      this.htmlElements.forEach(function(htmlElement) {
        htmlElement.innerHTML += arg;
      });
    }
    return this.htmlElements;
  };

  DOMNodeCollection.prototype.attr = function(attribute,value) {
    if (value === undefined) {
      return this.htmlElements[0].getAttribute(attribute);
    }
    this.htmlElements.forEach(function(htmlElement) {
      htmlElement.setAttribute(attribute,value);
    });
  };

  DOMNodeCollection.prototype.addClass = function(className) {
    this.htmlElements.forEach(function(htmlElement) {
      if (htmlElement.className === "") {
        htmlElement.className = className;
      }
      else {
        if(!htmlElement.className.includes(className)) {
          htmlElement.className += (" " + className);
        }
      }
    });
  };

  DOMNodeCollection.prototype.removeClass = function(className) {
    this.htmlElements.forEach(function(htmlElement) {
      if (htmlElement.className.includes(className)) {
        var arr = htmlElement.className.split(" ");
        arr.splice(arr.indexOf(className),1);
        htmlElement.className = arr.join(" ");
      }

    });
    return this.htmlElements;
  };

  DOMNodeCollection.prototype.children = function() {
    var childs = [];
    this.htmlElements.forEach(function(htmlElement) {
      childs.push(htmlElement.children);
    });
    return new DOMNodeCollection(childs);
  };

  DOMNodeCollection.prototype.parent = function() {
    var parents = [];
    this.htmlElements.forEach(function(htmlElement) {
      parents.push(htmlElement.parentElement);
    });
    return new DOMNodeCollection(parents);
  };

  DOMNodeCollection.prototype.find = function(selector) {
    var found = [];
    this.htmlElements.forEach(function(htmlElement) {
      found.push(htmlElement.querySelectorAll(selector));
    });
    return new DOMNodeCollection(found);
  };

  DOMNodeCollection.prototype.remove = function () {
    this.htmlElements.forEach(function(htmlElement) {
      htmlElement.parentNode.removeChild(htmlElement);
    });
    return (this.htmlElements = []);
  };

  DOMNodeCollection.prototype.on = function (type,callback) {
    var that = this;
    this.htmlElements.forEach(function(htmlElement) {
      if(that.eventHandlers[type] == undefined) {
        that.eventHandlers[type] = [callback];
      } else {
        that.eventHandlers[type].push(callback);
      }
      htmlElement.addEventListener(type, callback);
    });
    return this.htmlElements;
  };

  DOMNodeCollection.prototype.off = function(type,callback) {
    var that = this;
    if (callback === undefined) {
      this.htmlElements.forEach(function(htmlElement) {
        that.eventHandlers[type].forEach(function(cb) {
          htmlElement.removeEventListener(type, cb);
        });
      });
      this.eventHandlers[type] = null;
    }
    else {
      this.htmlElements.forEach(function(htmlElement) {
        htmlElement.removeEventListener(type,callback);
      });
      for (var i = this.eventHandlers[type].length - 1; i >= 0; i--) {
        if(this.eventHandlers[type][i] === callback) {
          this.eventHandlers[type].splice(i,1);
        }
      }
    }
    return this.htmlElements;
  };


})();
