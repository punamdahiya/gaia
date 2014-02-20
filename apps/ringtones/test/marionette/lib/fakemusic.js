/* jshint node: true*/
/* global module*/

'use strict';

function FakeMusic(client, origin) {
  this.client = client;
  this.origin = origin;
}

module.exports = FakeMusic;

FakeMusic.Selector = Object.freeze({
  albumOneElement: '#album-one',
  shareRing: '#shareRing',
  shareSong: '#shareSong'
});

FakeMusic.prototype = {
  client: null,

  get albumOneElement() {
    return this.client.findElement(FakeMusic.Selector.albumOneElement);
  },

  get shareRing() {
    return this.client.helper.waitForElement(FakeMusic.Selector.shareRing);
  },

  get shareSong() {
    return this.client.helper.waitForElement(FakeMusic.Selector.shareSong);
  },

  launch: function() {
    this.client.apps.launch(this.origin);
    this.client.apps.switchToApp(this.origin);
    // Wait until the app has told us it's fully loaded.
    this.client.helper.waitForElement('body.loaded');
  },

  close: function() {
    this.client.apps.close(this.origin);
  }
};
