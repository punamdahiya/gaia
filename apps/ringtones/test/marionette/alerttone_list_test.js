/* jshint node: true*/
/* global marionette, setup, suite, test*/
'use strict';

var Ringtones = require('./lib/ringtones');
var Settings = require('../../../settings/test/marionette/app/app');
var assert = require('assert');

marionette('Alerttones > List', function() {
  
  var client = marionette.client();
  var settingsApp;
  var soundPanel;
  var app;

  setup(function() {
    settingsApp = new Settings(client);
    app = new Ringtones(client);
    settingsApp.launch();
    // Navigate to the sound menu
    soundPanel = settingsApp.soundPanel;
  });

  suite('Alert tones > List of alert tones', function() {
    test('Load Alert tones list', function() {
      soundPanel.clickAlertToneSelect();
      client.switchToFrame();
      client.apps.switchToApp(Ringtones.URL);

      assert.ok(
        app.defaultSoundsList,
        'Alert tones successfully loaded'
      );
    });


    test('Alert tones list length > 0', function() {
      soundPanel.clickAlertToneSelect();
      client.switchToFrame();
      client.apps.switchToApp(Ringtones.URL);

      assert.ok(
        app.getDefaultSoundsList().length > 0,
        'Alert tones list is not empty'
      );
    });
  });
});
