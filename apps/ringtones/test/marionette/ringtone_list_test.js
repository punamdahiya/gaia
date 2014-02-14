/* jshint node: true*/
/* global marionette, setup, suite, test*/
'use strict';

var Ringtones = require('./lib/ringtones');
var Settings = require('../../../settings/test/marionette/app/app');
var assert = require('assert');

marionette('Ringtones > List', function() {
  
  var client = marionette.client();
  var settingsApp;
  var soundPanel;
  var app;
  var SETTINGS_URL = 'app://settings.gaiamobile.org';

  function switchAppToURL(client, URL) {
    client.switchToFrame();
    client.apps.switchToApp(URL);
  }

  setup(function() {
    settingsApp = new Settings(client);
    app = new Ringtones(client);
    client.contentScript.inject(__dirname +
      '/lib/mocks/mock_navigator_moztelephony.js');

    settingsApp.launch();
    // Navigate to the sound menu
    soundPanel = settingsApp.soundPanel;

  });

  suite('Ringtones > List of Ringtones: ', function() {

    test('Default ringtone on first time load', function() {
      var text = soundPanel.getSelectedRingTone();
      assert.strictEqual(text.toLowerCase(), 'change');
    });

    test('Load list of ringtones', function() {
      soundPanel.clickRingToneSelect();
      switchAppToURL(client, Ringtones.URL);

      assert.ok(
        app.defaultSoundsList,
        'Ring tones successfully loaded'
      );
    });

    test('Ringtones list length > 0', function() {
      soundPanel.clickRingToneSelect();
      switchAppToURL(client, Ringtones.URL);

      assert.ok(
        app.getDefaultSoundsList().length > 0,
        'Ring tones list is not empty'
      );
    });

    test('Select second ringtone', function() {
      soundPanel.clickRingToneSelect();
      switchAppToURL(client, Ringtones.URL);

      //Select second sound
      app.selectSound(1);
      // Get selected sound name
      var sound = app.getSelectedSound(1);
      assert.strictEqual(sound.toLowerCase(), 'classic courier');
    });

    test('Set new ringtone in sound panel', function() {
      soundPanel.clickRingToneSelect();
      switchAppToURL(client, Ringtones.URL);

      //Select first sound
      app.selectSound(1);
      app.tapBackButton();
      switchAppToURL(client, SETTINGS_URL);

      var text = soundPanel.getSelectedRingTone();
      assert.strictEqual(text.toLowerCase(), 'classic courier');
    });
  });
});
