$(function () {
  var i = 0;
  var t = $.timer(
    function () {
      i += 1;
      $('#list').append('<li>new item: ' + i + '</li>');
    },
    { repeat: true, interval: 200, autostart: false }
  );
  
  $('#btn-stop').click(function () {
    if (t.isRunning()) {
      t.stop();
      $(this).attr('value', 'Start');
    } else {
      t.start();
      $(this).attr('value', 'Stop');
    }
  });
});