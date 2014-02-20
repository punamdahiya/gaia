/* jshint node: true*/
/* global MozActivity */

'use strict';

var FakeMusic = {
  //Define variables here to use in activity data
  _URL: null,
  _fileName: null,

  init: function() {
    window.addEventListener('click', this);
    document.querySelector('body').classList.add('loaded');
  },

  setURL: function(path, fileName) {
    this._URL = path;
    this._fileName = fileName;
  },

  getBlob: function(callback) {
     //load music from location into a blob using XHR
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this._URL);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function() {
      callback(xhr.response);
    };
  },

  share: function() {
    //Write code to call share activity by passing activity data
    // alert('test share!');
    this.getBlob(function(blob) {
      var activityData = {
        type: 'audio/*',
        number: 1,
        blobs: [blob],
        filenames: [this._filename],
        filepaths: [this._URL],
        metadata: [{
          title: 'Fake Title',
          artist: 'Fake Artist',
          album: 'Fake Album'
        }]
      };
      var activity = new MozActivity({
        name: 'share',
        data: activityData
      });
      activity.onerror = function(e) {
        console.warn('share activity error:', activity.error.name);
      };
    }.bind(this));
  },

  handleEvent: function(event) {
    switch (event.target.id) {
      case 'shareRing':
        this.setURL('./ringer_classic_electric.opus',
                    'ringer_classic_electric');
        this.share();
        break;
      case 'shareSong':
        this.setURL('./test_song.mp3', 'test_song');
        this.share();
        break;
    }
  }
};

FakeMusic.init();
