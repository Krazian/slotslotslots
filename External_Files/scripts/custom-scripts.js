$(document).ready(function(){
	//Set up words
  var firstwheel = ["Be","Dare","Encourage","Challenge","Disrupt","Rev","Do","Recharge","Amplify","Make","One","Beyond","Build","Discover","Create",""];
  var secondwheel = ["The","It","To",""];
  var thirdwheel =["Heard","Link","Extraordinary","Power","Courage","Amplify","One","Best","Difference","Momentum","All","Unicorn","Recharge","Smorgasbord","Move","Extreme","Future","Focus","Possibilities","Success","Aspire"];
  
  //Append words to wheels
  firstwheel.forEach(function(word){
    $("#machine1").append("<div>"+word+"</div>");
  });
  secondwheel.forEach(function(word){
    $("#machine2").append("<div>"+word+"</div>");
  });
  thirdwheel.forEach(function(word){
    $("#machine3").append("<div>"+word+"</div>");
  });

  //Instantiate the button to copy words to clipboard
	new Clipboard('#copywords');

	//Disable copying on load
	$("#copywords").prop("disabled",true);

	//Instantiate slot machines
	var machine1 = $("#machine1").slotMachine({
		active	: 0,
		delay	: 900
	});

	var machine2 = $("#machine2").slotMachine({
		active	: 0,
		delay	: 900
	});

	var machine3 = $("#machine3").slotMachine({
		active	: 0,
		delay	: 900
	});

	//Start shuffling/spinning on click
	$("#randomizeButton").click(function(){
		$(".twitter-share-button").remove();
		$(this).css("animation-name","na");
		machine1.shuffle();
		machine2.shuffle();
		machine3.shuffle();
		//Resets the randomize object to completely random
		machine2.setRandomize();
		machine3.setRandomize();
		//Disables randomize and copy button
		$("#randomizeButton").prop("disabled",true);
		$("#copywords").prop("disabled",true);
		//Clears the previous value in the input field
		$(".showwords").val("");
		//Function for setRandomize that selects appropriate word
		var acceptableWords = function(array){
			return array[Math.floor(Math.random() * array.length)];
		};

		//Stops first wheel and will determine the value of second will if applicable
		setTimeout(
			function(){
				machine1.stop();
				switch (machine1.active){
					//If 1st word is: Be, Encourage, Discover, Create
					case 0:
					case 2:
					case 13:
					case 14:
						//2nd word can only be: The, [Space]
						machine2.setRandomize(acceptableWords([0,3]));
					break;

					//If 1st word is: Dare
					case 1:
						//2nd word can only be: The, To, [Space]
						machine2.setRandomize(acceptableWords([0,2,3]));
					break;

					////If 1st word is: Challenge, Disrupt, Rev, Recharge, Amplify, Build
					case 3:
					case 4:
					case 5:
					case 7:
					case 8:
					case 12:
						//2nd word can only be: The
						machine2.setRandomize(0);
					break;

					//If 1st word is: Do
					case 6:
						//2nd word can only be: The, It, [Space]
						machine2.setRandomize(acceptableWords([0,1,3]));
					break;

					//If 1st word is: Make
					case 9:
						//2nd word can only be: It
						machine2.setRandomize(1);
					break;

					//If 1st word is: One, Beyond, [Space]
					case 10:
					case 11:
					case 15:
						//2nd word can only be: [Space]
						machine2.setRandomize(3);
					break;

					//Default results in completely random 2nd word.
					default:
						machine2.setRandomize();
				};
		},1000);

		setTimeout(function(){
			machine2.stop();
			switch (machine1.active+""+machine2.active){
				//Be + [Space]
				case "03":
					machine3.setRandomize(acceptableWords([0,2,3,4,6,9,15]));
					break;
				//Dare The
				case "10":
					machine3.setRandomize(acceptableWords([6,7,11,15,16]));
					break;
				
				//Dare To
				case "12":
					machine3.setRandomize(acceptableWords([1,5,11,12,13,14,17,20]));
					break;
				
				//Dare +[Space]
				case "13":
					machine3.setRandomize(acceptableWords([3,4,8,9,10]));
					break;
				//Encourage The
				case "20":
					machine3.setRandomize(acceptableWords([1,6,7,8,11,12,13,14,15]));
					break;
				//Encourage + [Space]
				case "23":
					machine3.setRandomize(acceptableWords([2,3,4,8,9,10,17,18,19]));
					break;
				//Do The
				case "60":
					machine3.setRandomize(acceptableWords([2,7,8,9,11,14,15,18,19]));
					break;
				//Do It
				case "61":
					machine3.setRandomize(acceptableWords([7,11]));
					break;
				//Do + [Space]
				case "63":
					machine3.setRandomize(acceptableWords([2,3,4,5,8,10,12,13,14,15,]));
					break;
				//One +[Space]
				case "100":
					machine3.setRandomize(acceptableWords([1,3,4,8,9,11,12,14,17]));
					break;
				//Beyond + [Spaces]
				case "113":
					machine3.setRandomize(acceptableWords([2,3,4,7,9,10,15,18]));
					break;
				//Discover +[Space]
				case "133":
					machine3.setRandomize(acceptableWords([2,6,9,10,17,18,19]));
					break;
				//Create + [Space]
				case "143":
					machine3.setRandomize(acceptableWords([2,3,4,6,8,9,12,16,17,18,19]));
					break;
				//If none applies, 3rd word is completely random
				default:
					machine3.setRandomize();			
			};
			machine3.stop();
		},2000);

		setTimeout(function(){
			//Copy and randomize buttons are enabled
			$("#copywords").prop("disabled",false);
    	$("#randomizeButton").prop("disabled",false);

			//Input field is populated by selected words
			var one = $("#machine1").children().children()[machine1.active+1].innerHTML;
     	var two = $("#machine2").children().children()[machine2.active+1].innerHTML;
     	var three = $("#machine3").children().children()[machine3.active+1].innerHTML;
     	var twitterScript = $("<script id='twitter-script'>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>")
     	var eventName;
     	//If either the first or second word is blank, remove extra whitespace
     	if ((one === "") && (two === "")){
     		eventName = three;
     		eventHashtag = three;
     	} else if (two === ""){
      	eventName = one+" "+three;
      	eventHashtag = one+three;
    	} else {
    		eventName = one+" "+two+" "+three;
    		eventHashtag = one+two+three;
    	};
    	$(".showwords").val(eventName);
    	$("#randomizeButton").css("animation-name","blink");
    	var $tweetBtn = $('<a></a>').addClass('twitter-share-button').attr("href","https://twitter.com/share").attr("url","http://tinyurl.com/ht777r5").attr("data-text","I used the 'Event Name Generator' by @gramercytech and got '"+eventName+"'!").attr("data-hashtags",eventHashtag).html("Tweet");
    	$(".social-share .col-xs-12").append($tweetBtn);
    	$tweetBtn.hide();
    	twttr.widgets.load();
    	$tweetBtn.show();
		},3900);
	});
})