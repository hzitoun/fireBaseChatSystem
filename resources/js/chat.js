/**
*
* JS Script handling the chat box.
* @author Hamed ZITOUN (zitoun.hamed@gmail.com)
* @Date: 2015-06-07
*/
var chatBase = new Firebase('https://fbdchat.firebaseio.com/');
$('#messageInput').keypress(function (e) {
  if (e.keyCode === 13) {
    fnSendMsg();
  }
});
var msgCount = 0;
chatBase.on('child_added', function(snapshot) {
  msgCount++;
  if(msgCount === 1){
    $('#messagesDiv').html('');
  }
  var message = snapshot.val();
  addMsg(message.username, message.msg, message.date);
});
var direction = '';
function addMsg(username, msg, date) {
  direction = 'left'; 
  if(msgCount % 2 === 0) {
    direction = 'right'; 
  }
 $('
<div/>').append('
<div title="'+date+'" class="chat-box-'+direction+'">' + msg + '</div>').append('
<div class="chat-box-name-'+direction+'">
	<img src="resources/img/user.png" alt="bootstrap Chat box user image" class="img-circle" /> -'+ username + ' 
</div>
<hr class="hr-clas" />').appendTo($('#messagesDiv'));
 $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};
function fnSendMsg(){
  var  msg = $('#messageInput').val();
  if (msg !== '') {
    var now = new Date();
    var dateToPersist = now.toLocaleFormat('%d-%b-%Y %H:%M');
    chatBase.push({ date : dateToPersist, msg: msg, username: currentUser});
    $('#messageInput').val('');
  }
}
if (msgCount === 0) {
  $('#messagesDiv').html('
<b>Don\'t be Shy and Say Hey !</b>');
}

