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
      
    });
  };












})();
