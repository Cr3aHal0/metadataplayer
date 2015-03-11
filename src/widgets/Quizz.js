/* This widget displays the image associated to the annotation in the given container */

IriSP.Widgets.Quizz = function(player, config) {
    IriSP.Widgets.Widget.call(this, player, config);
}

IriSP.Widgets.Quizz.prototype = new IriSP.Widgets.Widget();

IriSP.Widgets.Quizz.prototype.defaults = {
    annotation_type: "Quizz"
    // container: "imageContainer"
}

IriSP.Widgets.Quizz.prototype.template = '<div class="Ldt-Quizz-Container"><h1 class="Ldt-Quizz-Title">{{question}}</h1>'
										+ '	<fieldset class="Ldt-Quizz-Questions">'
										+ '	</fieldset>'
										+ '	<div class="Ldt-Quizz-Submit">'
										+ '		<div class="quizz-submit-button"><input type="button" value="Valider" /></div>'
										+ '		<div class="quizz-submit-skip_link"><a href="#">Skip</a></div><div style="clear:both;"></div>'
										+ '	</div>'
										+ '	<div class="Ldt-Quizz-Votes">'
										+ '		<h1>Avez-vous trouvé cette question utile ?</h1>'
										+ '		<div class="Ldt-Quizz-Votes-Buttons">'
										+ '			<div><input type="button" value="Non" class="Ldt-Quizz-Vote-Useless" /></div>'
										+ '			<div><input type="button" value="Oui" class="Ldt-Quizz-Vote-Usefull" /></div>'
										+ '			<div class="Ldt-Quizz-Vote-Skip-Block"><a href="#" class="Ldt-Quizz-Vote-Skip">Skip</a></div>'
										+ ' 	</div>'
										+ '	</div>'
										+ '</div>';

IriSP.Widgets.Quizz.prototype.annotationTemplate = '';

IriSP.Widgets.Quizz.prototype.update = function(annotation) {

	//Pause the current video
	this.media.pause();

	this.annotation = annotation;

	var question = annotation.content.data.question;
	var answers = annotation.content.data.answers;

	$(".Ldt-Quizz-Container .Ldt-Quizz-Title").html(question);

	var i = 0

	this.question = new IriSP.Widgets.UniqueChoiceQuestion(annotation);

	if (annotation.content.data.type == "multiple_choice") {
		this.question = new IriSP.Widgets.MultipleChoiceQuestion(annotation);
	}
	else if (annotation.content.data.type == "unique_choice") {
		this.question = new IriSP.Widgets.UniqueChoiceQuestion(annotation);
	}

	var output = "";
	for (i = 0; i < answers.length; i++) {
		//alert( answers[i].content);

		output += '<div class="quizz-question-block"><p>' + this.question.renderTemplate(answers[i], i) + answers[i].content + '</p>';
		var color = (answers[i].correct == true) ? "green" : "red";
		output += '<p class="quizz-question-feedback" style="color:' + color +';">'+ answers[i].feedback +'</p>';
		output += '</div>';

	}
	$(".Ldt-Quizz-Questions").html(output);
	$(".Ldt-Quizz-Overlay").show();
    
};

IriSP.Widgets.Quizz.prototype.answer = function() { 
	//alert(this.annotation.content.data.question);
	//Display feedbacks
	
	$("video")[0].pause();

	$( ".quizz-question-feedback").each(function(index) {
		$(this).fadeIn();
	});

	var answers = this.annotation.content.data.answers;
	var faux = false;
	var i =0;

	
	while (i < answers.length && faux == false) {
		console.log("Question : "+ i +" => réponse : "+ $(".quizz-question-" + i).is(':checked'));
		if ( !this.question.isCorrect(i, $(".quizz-question-" + i).is(':checked'))) {
			faux = true;
		}
		i++;
	}

	//Todo : display the result in a cool way :)
	if (faux == true) {
		alert("Mauvaise réponse");
	}
	else
	{
		alert("Bonne réponse !");
	}

	$(".Ldt-Quizz-Votes").delay(500).fadeIn();
	
	$(".Ldt-Quizz-Votes-Buttons").click(function(e, media) {
		//Todo : thanks people for their feedback, then close the quizz window

		$(".Ldt-Quizz-Votes").fadeOut();
		$(".Ldt-Quizz-Overlay").hide();

	});

	//$(".Ldt-Quizz-Votes-Buttons").trigger("click", this.media);
};

IriSP.Widgets.Quizz.prototype.skip_question = function() {

}

IriSP.Widgets.Quizz.prototype.draw = function() {   

    var _annotations = this.getWidgetAnnotations().sortBy(function(_annotation) {
        return _annotation.begin;
    });
    var _this = this;
	
	_this.container = $("<div class='Ldt-Quizz-Overlay right_panel'></div>").appendTo($("[widget-type*=Player]"));
	$(".Ldt-Quizz-Overlay").hide();

	_this.container.html(this.template);

    console.log("Quizz was drawn");

    $(".Ldt-Quizz-Submit input").click(function() {
		_this.answer();
    });

    _annotations.forEach(function(_a) {
        _a.on("enter", function() {
            _this.update(_a);
        });
    });
}

//UniqueChoice Question
IriSP.Widgets.UniqueChoiceQuestion = function(annotation) {
    this.annotation = annotation;
}

IriSP.Widgets.UniqueChoiceQuestion.prototype = new IriSP.Widgets.Widget();

IriSP.Widgets.UniqueChoiceQuestion.prototype.isCorrect = function(answer, valid) {
	if (this.annotation.content.data.answers[answer].correct == true && valid == true) {
		return true;
	}
	else if (typeof this.annotation.content.data.answers[answer].correct === "undefined" && valid == false) {
		return true;
	}
	return false;
}

IriSP.Widgets.UniqueChoiceQuestion.prototype.renderTemplate = function(answer, identifier) {
	return '<input type="radio" class="quizz-question quizz-question-'+ identifier +'" name="question" -data-question="'+ identifier +'" value="' + identifier + '" /> ';
}


//MultipleChoice Question
IriSP.Widgets.MultipleChoiceQuestion = function(annotation) {
    this.annotation = annotation;
}

IriSP.Widgets.MultipleChoiceQuestion.prototype = new IriSP.Widgets.Widget();

IriSP.Widgets.MultipleChoiceQuestion.prototype.isCorrect = function(answer, valid) {
	if (this.annotation.content.data.answers[answer].correct == true && valid == true) {
		return true;
	}
	else if (typeof this.annotation.content.data.answers[answer].correct === "undefined" && valid == false) {
		return true;
	}
	return false;
}

IriSP.Widgets.MultipleChoiceQuestion.prototype.renderTemplate = function(answer, identifier) {
	return '<input type="checkbox" class="quizz-question quizz-question-'+ identifier +'" name="question['+ identifier +']" -data-question="'+ identifier +'" value="' + identifier + '" /> ';
}

