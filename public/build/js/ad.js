(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/ad"],{

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

/***/ })

},[["./assets/js/ad.js","runtime","vendors~js/ad~js/app"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWQuanMiXSwibmFtZXMiOlsiJCIsImNsaWNrIiwiaW5kZXgiLCJ2YWwiLCJ0bXBsIiwiZGF0YSIsInJlcGxhY2UiLCJhcHBlbmQiLCJoYW5kbGVEZWxldGVCdXR0b25zIiwidGFyZ2V0IiwiZGF0YXNldCIsInJlbW92ZSIsInVwZGF0ZUNvdW50ZXIiLCJjb3VudCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFRQSxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCQyxLQUFqQixDQUF1QixZQUFZO0FBQUU7QUFDakMsTUFBTUMsS0FBSyxHQUFHLENBQUVGLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCRyxHQUF0QixFQUFoQixDQUQrQixDQUcvQjs7QUFDQSxNQUFNQyxJQUFJLEdBQUdKLENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0JLLElBQWhCLENBQXFCLFdBQXJCLEVBQWtDQyxPQUFsQyxDQUEwQyxXQUExQyxFQUF1REosS0FBdkQsQ0FBYixDQUorQixDQU0vQjs7QUFDQUYsR0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQk8sTUFBaEIsQ0FBdUJILElBQXZCO0FBRUFKLEdBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCRyxHQUF0QixDQUEwQkQsS0FBSyxHQUFHLENBQWxDLEVBVCtCLENBVy9COztBQUNBTSxxQkFBbUI7QUFDdEIsQ0FiRDs7QUFlQSxTQUFTQSxtQkFBVCxHQUErQjtBQUMzQlIsR0FBQyxDQUFDLDhCQUFELENBQUQsQ0FBa0NDLEtBQWxDLENBQXdDLFlBQVk7QUFDaEQsUUFBTVEsTUFBTSxHQUFHLEtBQUtDLE9BQUwsQ0FBYUQsTUFBNUI7QUFDQVQsS0FBQyxDQUFDUyxNQUFELENBQUQsQ0FBVUUsTUFBVjtBQUNILEdBSEQ7QUFJSDs7QUFFRCxTQUFTQyxhQUFULEdBQXdCO0FBQ3BCLE1BQU1DLEtBQUssR0FBRyxDQUFDYixDQUFDLENBQUMsMkJBQUQsQ0FBRCxDQUErQmMsTUFBOUM7QUFFQWQsR0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JHLEdBQXRCLENBQTBCVSxLQUExQjtBQUNIOztBQUVERCxhQUFhO0FBQ2JKLG1CQUFtQixHIiwiZmlsZSI6ImpzL2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiICAgICAgICAkKCcjYWRkLWltYWdlcycpLmNsaWNrKGZ1bmN0aW9uICgpIHsgLy8gSmUgcsOpY3Vww6hyZSBsZXMgbnVtw6lyb3MgZGVzIGZ1dHVycyBjaGFtcHMgcXVlIGplIHZhaXMgY3LDqWVyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICsgJCgnI3dpZGdldHMtY291bnRlcicpLnZhbCgpO1xuXG4gICAgICAgICAgICAvLyBKZSByw6ljdXDDqHJlIGxlIHByb3RvdHlwZSBkZXMgZW50csOpZXNcbiAgICAgICAgICAgIGNvbnN0IHRtcGwgPSAkKCcjYWRfaW1hZ2VzJykuZGF0YSgncHJvdG90eXBlJykucmVwbGFjZSgvX19uYW1lX18vZywgaW5kZXgpO1xuXG4gICAgICAgICAgICAvLyBKJ2luamVjdGUgY2UgY29kZSBhdSBzZWluIGRlIGxhIGRpdlxuICAgICAgICAgICAgJCgnI2FkX2ltYWdlcycpLmFwcGVuZCh0bXBsKTtcblxuICAgICAgICAgICAgJCgnI3dpZGdldHMtY291bnRlcicpLnZhbChpbmRleCArIDEpO1xuXG4gICAgICAgICAgICAvLyBKZSBnw6hyZSBsZSBib3V0b24gc3VwcHJpbWVyXG4gICAgICAgICAgICBoYW5kbGVEZWxldGVCdXR0b25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZURlbGV0ZUJ1dHRvbnMoKSB7XG4gICAgICAgICAgICAkKCdidXR0b25bZGF0YS1hY3Rpb249XCJkZWxldGVcIl0nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5kYXRhc2V0LnRhcmdldDtcbiAgICAgICAgICAgICAgICAkKHRhcmdldCkucmVtb3ZlKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ291bnRlcigpe1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSArJCgnI2FkX2ltYWdlcyBkaXYuZm9ybS1ncm91cCcpLmxlbmd0aDtcblxuICAgICAgICAgICAgJCgnI3dpZGdldHMtY291bnRlcicpLnZhbChjb3VudCk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVDb3VudGVyKCk7XG4gICAgICAgIGhhbmRsZURlbGV0ZUJ1dHRvbnMoKTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==