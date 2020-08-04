(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/app"],{

/***/ "./assets/js/ad.js":
/*!*************************!*\
  !*** ./assets/js/ad.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");

$('#add-images').click(function () {
  // Je récupère les numéros des futurs champs que je vais créer
  var index = +$('#widgets-counter').val(); // Je récupère le prototype des entrées

  var tmpl = $('#ad_images').data('prototype').replace(/__name__/g, index); // J'injecte ce code au sein de la div

  $('#ad_images').append(tmpl);
  $('#widgets-counter').val(index + 1); // Je gère le bouton supprimer

  handleDeleteButtons();
});

function handleDeleteButtons() {
  $('button[data-action="delete"]').click(function () {
    var target = this.dataset.target;
    $(target).remove();
  });
}

function updateCounter() {
  var count = +$('#ad_images div.form-group').length;
  $('#widgets-counter').val(count);
}

updateCounter();
handleDeleteButtons();

/***/ }),

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

global.$ = global.jQuery = $;

__webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");

__webpack_require__(/*! ./ad.js */ "./assets/js/ad.js");
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

},[["./assets/js/app.js","runtime","vendors~js/ad~js/app","vendors~js/app"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2FwcC5qcyJdLCJuYW1lcyI6WyIkIiwiY2xpY2siLCJpbmRleCIsInZhbCIsInRtcGwiLCJkYXRhIiwicmVwbGFjZSIsImFwcGVuZCIsImhhbmRsZURlbGV0ZUJ1dHRvbnMiLCJ0YXJnZXQiLCJkYXRhc2V0IiwicmVtb3ZlIiwidXBkYXRlQ291bnRlciIsImNvdW50IiwibGVuZ3RoIiwicmVxdWlyZSIsImdsb2JhbCIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFRQSxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCQyxLQUFqQixDQUF1QixZQUFZO0FBQUU7QUFDakMsTUFBTUMsS0FBSyxHQUFHLENBQUVGLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCRyxHQUF0QixFQUFoQixDQUQrQixDQUcvQjs7QUFDQSxNQUFNQyxJQUFJLEdBQUdKLENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0JLLElBQWhCLENBQXFCLFdBQXJCLEVBQWtDQyxPQUFsQyxDQUEwQyxXQUExQyxFQUF1REosS0FBdkQsQ0FBYixDQUorQixDQU0vQjs7QUFDQUYsR0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQk8sTUFBaEIsQ0FBdUJILElBQXZCO0FBRUFKLEdBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCRyxHQUF0QixDQUEwQkQsS0FBSyxHQUFHLENBQWxDLEVBVCtCLENBVy9COztBQUNBTSxxQkFBbUI7QUFDdEIsQ0FiRDs7QUFlQSxTQUFTQSxtQkFBVCxHQUErQjtBQUMzQlIsR0FBQyxDQUFDLDhCQUFELENBQUQsQ0FBa0NDLEtBQWxDLENBQXdDLFlBQVk7QUFDaEQsUUFBTVEsTUFBTSxHQUFHLEtBQUtDLE9BQUwsQ0FBYUQsTUFBNUI7QUFDQVQsS0FBQyxDQUFDUyxNQUFELENBQUQsQ0FBVUUsTUFBVjtBQUNILEdBSEQ7QUFJSDs7QUFFRCxTQUFTQyxhQUFULEdBQXdCO0FBQ3BCLE1BQU1DLEtBQUssR0FBRyxDQUFDYixDQUFDLENBQUMsMkJBQUQsQ0FBRCxDQUErQmMsTUFBOUM7QUFFQWQsR0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JHLEdBQXRCLENBQTBCVSxLQUExQjtBQUNIOztBQUVERCxhQUFhO0FBQ2JKLG1CQUFtQixHOzs7Ozs7Ozs7OztBQzdCM0Isa0RBQUlSLENBQUMsR0FBR2UsbUJBQU8sQ0FBQyxvREFBRCxDQUFmOztBQUVBQyxNQUFNLENBQUNoQixDQUFQLEdBQVdnQixNQUFNLENBQUNDLE1BQVAsR0FBZ0JqQixDQUEzQjs7QUFFQWUsbUJBQU8sQ0FBQyxnRUFBRCxDQUFQOztBQUVBQSxtQkFBTyxDQUFDLGtDQUFELENBQVAsQyIsImZpbGUiOiJqcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgICAgICAgICQoJyNhZGQtaW1hZ2VzJykuY2xpY2soZnVuY3Rpb24gKCkgeyAvLyBKZSByw6ljdXDDqHJlIGxlcyBudW3DqXJvcyBkZXMgZnV0dXJzIGNoYW1wcyBxdWUgamUgdmFpcyBjcsOpZXJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKyAkKCcjd2lkZ2V0cy1jb3VudGVyJykudmFsKCk7XG5cbiAgICAgICAgICAgIC8vIEplIHLDqWN1cMOocmUgbGUgcHJvdG90eXBlIGRlcyBlbnRyw6llc1xuICAgICAgICAgICAgY29uc3QgdG1wbCA9ICQoJyNhZF9pbWFnZXMnKS5kYXRhKCdwcm90b3R5cGUnKS5yZXBsYWNlKC9fX25hbWVfXy9nLCBpbmRleCk7XG5cbiAgICAgICAgICAgIC8vIEonaW5qZWN0ZSBjZSBjb2RlIGF1IHNlaW4gZGUgbGEgZGl2XG4gICAgICAgICAgICAkKCcjYWRfaW1hZ2VzJykuYXBwZW5kKHRtcGwpO1xuXG4gICAgICAgICAgICAkKCcjd2lkZ2V0cy1jb3VudGVyJykudmFsKGluZGV4ICsgMSk7XG5cbiAgICAgICAgICAgIC8vIEplIGfDqHJlIGxlIGJvdXRvbiBzdXBwcmltZXJcbiAgICAgICAgICAgIGhhbmRsZURlbGV0ZUJ1dHRvbnMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRGVsZXRlQnV0dG9ucygpIHtcbiAgICAgICAgICAgICQoJ2J1dHRvbltkYXRhLWFjdGlvbj1cImRlbGV0ZVwiXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmRhdGFzZXQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICQodGFyZ2V0KS5yZW1vdmUoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDb3VudGVyKCl7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9ICskKCcjYWRfaW1hZ2VzIGRpdi5mb3JtLWdyb3VwJykubGVuZ3RoO1xuXG4gICAgICAgICAgICAkKCcjd2lkZ2V0cy1jb3VudGVyJykudmFsKGNvdW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUNvdW50ZXIoKTtcbiAgICAgICAgaGFuZGxlRGVsZXRlQnV0dG9ucygpO1xuXG4iLCJ2YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG5nbG9iYWwuJCA9IGdsb2JhbC5qUXVlcnkgPSAkO1xuXG5yZXF1aXJlKCdib290c3RyYXAnKTtcblxucmVxdWlyZSgnLi9hZC5qcycpO1xuXG4iXSwic291cmNlUm9vdCI6IiJ9