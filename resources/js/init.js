	 /**
	*
	* JS Script used to init some variables but also to ask the user for a username.
	* @author Hamed ZITOUN (zitoun.hamed@gmail.com)
	* @Date: 2015-06-07
	*/
	var currentUser = '';
	var userBase = new Firebase("https://resplendent-fire-5470.firebaseio.com/");
	var myUserRef = userBase.push();
	var connectedRef = new Firebase("https://resplendent-fire-5470.firebaseio.com//.info/connected");
	$( "#join" ).click(function() {
		currentUser = $('#customUS').val();
		if(currentUser != ''){
			if ($("#connectedDiv:contains(" + currentUser + ")").length){
				alert(currentUser + " is already used !");
				return;
			}
			connectedRef.on("value", function(isOnline) {
				if (isOnline.val()) {
					setUserStatus("online");
				}
				else {
					setUserStatus("away");
				}
			});
			var currentStatus = "online";
			$('#popup').fadeOut(100);
			$("#messageInput").removeAttr('disabled');
			$("#send").removeAttr('disabled');
			document.onIdle = function () {
				setUserStatus("idle");
			}
			document.onAway = function () {
				setUserStatus("away");
			}
			document.onBack = function (isIdle, isAway) {
				setUserStatus("online");
			}
		}
	});
	userBase.on("child_added", function(element) {
		var user = element.val();
		$("<div/>")
		.attr("id", getMessageId(element))
		.append('<div>' + user.username + "  is " + user.status + '<hr class="hr-clas-low" />')
		.appendTo("#connectedDiv");
	});
	userBase.on("child_removed", function(element) {
		setUserStatus("away");
	});
	userBase.on("child_changed", function(element) {
		var user = element.val();
		$("#connectedDiv").children("#" + getMessageId(element))
		.html('<div>' + user.username + " is " + user.status + '<hr class="hr-clas-low" />')
	});

	function setUserStatus(status) {
		currentStatus = status;
		if(currentUser != ''){
			myUserRef.set({ username: currentUser, status: status });
		}
	}