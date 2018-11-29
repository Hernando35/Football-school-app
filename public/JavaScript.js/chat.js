var login = document.getElementById("login").addEventListener("click", login);
var write = document.getElementById("create-post").addEventListener("click", writeNewPost);

getPosts();

function login() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider);
}

function writeNewPost() {
	var text = document.getElementById("textInput").value;
	var userName = firebase.auth().currentUser.displayName;

	var post = {
		name: userName,
		body: text,
	};
	var newPostKey = firebase.database().ref().child('chat').push().key;
	var updates = {};
	updates[newPostKey] = post;
	document.getElementById("textInput").value = "";
	return firebase.database().ref('chat').update(updates);
}


function getPosts() {
	firebase.database().ref('chat').on('value', function (data) {
		var posts = document.getElementById("posts");
		posts.innerHTML = "";
		var messages = data.val();
		for (var key in messages) {
			var text = document.createElement("div");
			text.setAttribute("class", "message");
			var anotherUser = document.createElement("div");
			if (messages[key].name === firebase.auth().currentUser.displayName) {
				anotherUser.setAttribute("class", "yourMessage text-right");
			} else {
				anotherUser.setAttribute("class", "message text-left");
			}
			var elements = document.createElement("div");
			elements.innerHTML = messages[key].name + " says:";
			anotherUser.append(elements);
			var element = messages[key];
			anotherUser.append(element.body);
			text.append(element.body);
			posts.append(anotherUser);
		}
		//$(".posts").animate({scrollTop: $(".posts").prop("scrollHeight")}, 500);
	})
}


function showChatWindow(displayToNone, displayToBlock) {
	var p = document.getElementById(displayToNone);
	var q = document.getElementById(displayToBlock);
	if (p.style.display = "none") {
		p.style.display = "block";
		q.style.display = "none";
	} else {
		p.style.display = "none";
		q.style.display = "block";
	}
}

function hideLogin() {
	var s = document.getElementById("loggedIn");
	if (firebase.auth().currentUser) {
		s.style.display = "none";
	} else {
		console.log("whatsup Bob")
	}
}
