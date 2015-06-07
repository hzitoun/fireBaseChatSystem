/**
*
* JS Script handling the connected user box.
* @author Hamed ZITOUN (zitoun.hamed@gmail.com)
* @Date: 2015-06-07
*/

function getMessageId(element) {
    return element.key().replace(/[^a-z0-9\-\_]/gi,'');
  }
  userBase.on("child_added", function(element) {
    var user = element.val();
    $("<div/>")
      .attr("id", getMessageId(element))
      .append('<div>' + user.username + "  is " + user.status + '<hr class="hr-clas-low" />')
      .appendTo("#presenceDiv");
  });
  userBase.on("child_removed", function(element) {
    $("#presenceDiv").children("#" + getMessageId(element))
      .remove();
  });
  userBase.on("child_changed", function(element) {
    var user = element.val();
    $("#presenceDiv").children("#" + getMessageId(element))
      .html('<div>' + user.username + " is " + user.status + '<hr class="hr-clas-low" />')
  });
  document.onIdle = function () {
    setUserStatus("idle");
  }
  document.onAway = function () {
    setUserStatus("away");
  }
  document.onBack = function (isIdle, isAway) {
    setUserStatus("online");
  }
  setIdleTimeout(10000);
  setAwayTimeout(10000);