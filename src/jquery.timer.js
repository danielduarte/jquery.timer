/*!
 * jQuery plugin: jquery.timer
 * 
 * jQuery plugin to set up temporized events that can execute a user callback
 * repeatedly or only one time, after the specified period of time.
 * @author Daniel David Duarte
 * @version 1.0.0
 * @license See LICENTE file included in package
 */
 
/**
 * @param function callback User function called as callback.
 * @param object options Options for the plugin:
 * @option number interval Period of time in milliseconds after the first execution of
 *         the callback and between the succesives executions (if there are).
 * @option boolean repeat Specifies if the timer is autoactivated again, after each
 *         callback execution.
 * @option boolean autostart Specifies if the timer starts to work just after its creation
 *         without calling start() explicitly.
 */
 
(function ($) {

  var _timer = function (callback, options) {

    // Default options.
    var _options = {
      callback: null,
      interval: 1000,
      repeat: false,
      autostart: true
    };
    
    // To tack if the timer is running.
    var _running = false;
    
    // Current timer id (or null if the it hasn't been started).
    var _timerId = null;

    // Initializes the closure with the user parameters.
    var _init = function () {
      $.extend(_options, options, {callback: callback});
      if (_options.autostart) {
        _start();
      }
    };
    
    // @method Begin running the timer.
    var _start = function () {
      if (_running || typeof _options.callback !== 'function') return;
      _running = true;
      
      var _callback = function () {
        _options.callback();
        if (_options.repeat) {
          if (_timerId !== null) {
            clearTimeout(_timerId);
          }
          _timerId = setTimeout(_callback, _options.interval);
        }
        else {
          _stop();
        }
      };
      
      _timerId = setTimeout(_callback, _options.interval);
    };

    // @method Restarts the timer interval, counting the time from the beginning.
    var _reset = function () {
      _stop();
      _start();
    };

    // @method Stops the current execution of the timer.
    //         The next execution of the callback will not be executed.
    var _stop = function () {
      if (_timerId !== null) {
        clearTimeout(_timerId);
        _timerId = null;
      }
      _running = false;
    };
    
    // @method Indicates if the timer is currently running.
    var _isRunning = function () {
      return _running;
    };

    // Automatic initialization when closure is created.
    _init();

    // Object returned to the user.
    return {
      start: _start,
      reset: _reset,
      stop: _stop,
      isRunning: _isRunning
    };
  };

  // jQuery extension
  if (typeof $.timer === 'undefined') {
    $.timer = _timer;
  } else {
    throw "Utility method named 'timer' already defined for jQuery.";
  }

})(jQuery);