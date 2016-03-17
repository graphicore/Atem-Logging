define([
    'util-logging/logger'
], function (
    Parent
) {
"use strict";
    function Logger(options) {
        Parent.call(this, options);
    }
    var _p = Logger.prototype = Object.create(Parent.prototype);

    /**
     * Re-log the given {@link LogRecord} (with the original time stamp)
     * @param {LogRecord} record LogRecord to relog
     *
     * Used to reload a saved log.
     *
     * @returns {Logger}
     */
    _p.relog = function(record) {
      this.getHandlers().forEach(function(handler) {
        if (record.getLevel() >= this.getLevel())
          handler.publish(record);
      }, this);
      return this;
    };

    return Logger;
});
