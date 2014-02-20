/* jshint node: true*/
/* global marionette, setup, suite, test, __dirname*/
/* exported Ringtones*/
'use strict';

var Ringtones = require('./lib/ringtones');
var Settings = require('../../../settings/test/marionette/app/app');
var FakeMusic = require('./lib/fakemusic');
var assert = require('assert');

var FAKE_MUSIC_ORIGIN = 'fakemusic.gaiamobile.org';

marionette('Ringtones > Share Activity', function() {

  var apps = {};
  apps[FAKE_MUSIC_ORIGIN] = __dirname + '/fakemusic';
  
  var client = marionette.client({
    apps: apps
  });
  var settingsApp, soundPanel, music;
  var SETTINGS_URL = 'app://settings.gaiamobile.org';

  function switchAppToURL(client, URL) {
    client.switchToFrame();
    client.apps.switchToApp(URL);
  }

  setup(function() {
    settingsApp = new Settings(client);
    music = new FakeMusic(client, 'app://' + FAKE_MUSIC_ORIGIN);
    client.contentScript.inject(__dirname +
      '/lib/mocks/mock_navigator_moztelephony.js');
    music.launch();
  });

  suite('Ringtones > share activity: ', function() {

    test('Set custom ringtone via share in music', function() {
      music.shareRing.click();

      // Code to click on setringtone button
      // once share flow works

      music.close();

      settingsApp.launch();
      // Navigate to the sound menu
      soundPanel = settingsApp.soundPanel;
      switchAppToURL(client, SETTINGS_URL);

      var text = soundPanel.getSelectedRingTone();
      // Update the assert equal once share flow works
      assert.strictEqual(text.toLowerCase(), 'change');
    });
  });
});
