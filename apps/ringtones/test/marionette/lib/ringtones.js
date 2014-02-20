/* jshint node: true*/
/* exported findElement */
'use strict';
/**
 * Abstraction around Ringtones app.
 * @constructor
 * @param {Marionette.Client} client for operations.
 */
function Ringtones(client) {
  this.client = client;
  this.client.setSearchTimeout(10000);
}

/**
 * @type String Origin of Ringtones app
 */
Ringtones.URL = 'app://ringtones.gaiamobile.org';

module.exports = Ringtones;

Ringtones.Selectors = {
  body: 'body',
  defaultSounds: '#default-list li',
  defaultSoundsList: '#default-list li label.pack-radio',
  backButton: 'button#back',
  soundName: 'label.pack-radio span',
  soundInput: 'label.pack-radio input[type="radio"]',
  soundLabel: 'label.pack-radio'
};

/**
 * @private
 * @param {Marionette.Client} client for selector.
 * @param {String} name of selector [its a key in Ringtones.Selectors].
 */
function findElement(client, name) {
  return client.findElement(Ringtones.Selectors[name]);
}

Ringtones.prototype = {
  /**
   * Launches Ringtones app and focuses on frame.
   */
  launch: function() {
    this.client.apps.launch(Ringtones.URL, 'ringtones');
    this.client.apps.switchToApp(Ringtones.URL, 'ringtones');
    this.client.helper.waitForElement(Ringtones.Selectors.body);
  },

  get defaultSoundsList() {
    return this.client.helper.waitForElement(Ringtones.Selectors.defaultSounds);
  },

  isSoundSelected: function(index) {
    var elements = this.client.findElements(Ringtones.Selectors.soundInput);
    return elements[index]
      .getAttribute('checked');
  },

  selectSound: function(index) {
    var elements = this.client.findElements(Ringtones.Selectors.soundLabel);
    this.client.helper.waitForElement(elements[index]).tap();
    this.client.waitFor(function() {
        return this.isSoundSelected(index);
    }.bind(this));
  },

  getSelectedSound: function(index) {
    var elements = this.client.findElements(Ringtones.Selectors.soundName);
    return this.client.helper.waitForElement(elements[index])
      .text();
  },

  getDefaultSoundsList: function() {
   return this.client.findElements(Ringtones.Selectors.defaultSounds);
  },

  tapBackButton: function() {
    this.client.helper.waitForElement(Ringtones.Selectors.backButton).tap();
  }
};
