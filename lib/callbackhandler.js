define([
    'util'
  , 'util-logging/level'
  , 'util-logging/handler'
  , 'util-logging/formatter'
], function (
    util
  , Level
  , Handler
  , Formatter
) {
"use strict";

/**
 * The published {@link LogRecord} objects are fed to a callback
 *
 * Internally, the {@link CallbackHandler} uses the {@link Formatter} class to generate the string.
 *
 * @name CallbackHandler
 * @param cb callback to pass each formatted log entry to
 * @returns {CallbackHandler}
 * @constructor
 * @extends Handler
 */
var CallbackHandler = function(cb) {
  var self = this;
  (self.super_ = CallbackHandler.super_).call(self);
  self._defaultFormatter = new Formatter();
  self._callback = cb;
  return self;
};

util.inherits(CallbackHandler, Handler);


CallbackHandler.prototype.getDefaultFormatter = function() {
  return this._defaultFormatter;
};

/**
 * Logs formatted log record to a file.
 *
 * @param {LogRecord} logRecord {@link LogRecord} to be published
 */
CallbackHandler.prototype.publish = function(logRecord) {
  if (!this.isLoggable(logRecord)) {
    return;
  }

  var formatter = this.getFormatter();
  if (!formatter || !(formatter instanceof Formatter)) {
    formatter = this.getDefaultFormatter();
  }

  var message = formatter.formatMessage(logRecord);
  if (!message || typeof message !== "string") {
    return;
  }

  this._callback(message);
};


return CallbackHandler;
});
