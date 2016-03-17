define([
    'util-logging/logrecord'
  , 'util-logging/level'
], function (
    LogRecord
  , Level
) {
    "use strict";

    function logRecordFromObject(obj) {
        var options = Object.create(obj);
        options.level = new Level(obj.level);
        options.millis = Date.parse(obj.date);
        return new LogRecord(options);
    }

    return logRecordFromObject;
});
