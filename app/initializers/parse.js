import $ from 'jquery';

$.ajaxSetup({
  beforeSend(xhr, options) {
    if(options.url.match(/api.parse.com/)) {
      xhr.setRequestHeader('X-Parse-Application-Id', 'V6852DtbDSEvfanXhqU9LZudZ78ud4xJPgJaDYsG');
      xhr.setRequestHeader('X-Parse-REST-API-Key', 'HokcRre9HlC7PdRU4lZqs05bs6MmnSorwvYdVvB5');
    }
  }
});
