/* TODO: Add Social Network Sharing */

IriSP.Widgets.QuizzCreator = function(player, config) {
    var _this = this;
    IriSP.Widgets.Widget.call(this, player, config);
    if (_this.editable_storage != '' && window.localStorage[_this.editable_storage]) {
        this.source.onLoad(function () {
            var _export = _this.player.sourceManager.newLocalSource({serializer: IriSP.serializers['ldt_localstorage']});
            _export.deSerialize(window.localStorage[_this.editable_storage]);
            _this.source.merge(_export);
        });
    };
};

IriSP.Widgets.QuizzCreator.prototype = new IriSP.Widgets.Widget();

IriSP.Widgets.QuizzCreator.prototype.defaults = {
    show_title_field : true,
    show_creator_field : true,
    start_visible : true,
    always_visible : false,
    show_slice : true,
    show_controls: false,
    show_arrow : true,
    show_mic_record: false,
    show_mic_play: false,
    minimize_annotation_widget : true,
    creator_name : "",
    creator_avatar : "",
    tags : false,
    tag_titles : false,
    pause_on_write : true,
    max_tags : 8,
    polemics : [{
        keyword: "++",
        background_color: "#00a000",
        text_color: "#ffffff"
    },{
        keyword: "--",
        background_color: "#c00000",
        text_color: "#ffffff"
    },{
        keyword: "??",
        background_color: "#0000e0",
        text_color: "#ffffff"
    },{
        keyword: "==",
        background_color: "#f0e000",
        text_color: "#000000"
    }],
    slice_annotation_type: "chap",
    annotation_type: "Contributions",
    api_serializer: "ldt_annotate",
    api_endpoint_template: "",
    api_method: "POST",
    // Id that will be used as localStorage key
    editable_storage: "",
    after_send_timeout: 0,
    close_after_send: false,
    tag_prefix: "#",
    slice_widget: null
};

IriSP.Widgets.QuizzCreator.prototype.messages = {
    en: {
        from_time: "from",
        to_time: "to",
        at_time: "at",
        submit: "Submit",
        add_keywords_: "Add keywords:",
        add_polemic_keywords_: "Add polemic attributes :",
        your_name_: "Your name:",
        annotate_video: "New note",
        type_title: "Annotation title",
        type_description: "Enter a new note...",
        wait_while_processing: "Please wait while your annotation is being processed...",
        error_while_contacting: "An error happened while contacting the server. Your annotation has not been saved.",
        annotation_saved: "Thank you, your annotation has been saved.",
        share_annotation: "Would you like to share it on social networks ?",
        close_widget: "Hide the annotation form",
        "polemic++": "Agree",
        "polemic--": "Disagree",
        "polemic??": "Question",
        "polemic==": "Reference",
        "in_tooltip": "Set begin time to current player time",
        "out_tooltip": "Set begin time to current player time",
        "play_tooltip": "Play the fragment"
    },
    fr: {
        from_time: "de",
        to_time: "à",
        at_time: "à",
        submit: "Envoyer",
        add_keywords_: "Ajouter des mots-clés\u00a0:",
        add_polemic_keywords_: "Ajouter des attributs polémiques\u00a0:",
        your_name_: "Votre nom\u00a0:",
        annotate_video: "Entrez une nouvelle note...",
        type_title: "Titre de l'annotation",
        type_description: "Prenez vos notes...",
        wait_while_processing: "Veuillez patienter pendant le traitement de votre annotation...",
        error_while_contacting: "Une erreur s'est produite en contactant le serveur. Votre annotation n'a pas été enregistrée.",
        annotation_saved: "Merci, votre annotation a été enregistrée.",
        share_annotation: "Souhaitez-vous la partager sur les réseaux sociaux ?",
        close_widget: "Cacher le formulaire de création d'annotations",
        "polemic++": "Accord",
        "polemic--": "Désaccord",
        "polemic??": "Question",
        "polemic==": "Référence",
        "in_tooltip": "Utiliser le temps courant comme début",
        "out_tooltip": "Utiliser le temps courant comme fin",
        "play_tooltip": "Jouer le fragment"
    }
};

IriSP.Widgets.QuizzCreator.prototype.template =
	  '<div class="Ldt-QuizzCreator-Ui Ldt-TraceMe">'
	+	'<div class="Ldt-QuizzCreator-Question-Form">'
	+		'<textarea style="width:calc(100% - 20px);">Votre question</textarea>'
	+	'</div>'
	+ 	'<div class="Ldt-QuizzCreator-Form Ldt-TraceMe">'
	+		'<p>Type de question : '
	+ 		'<select name="type" class="Ldt-QuizzCreator-Question-Type">'
	+			'<option value="unique_choice">Choix unique</option>'
	+			'<option value="multiple_choice">Choix multiple</option>'
	+		'</select><button class="Ldt-QuizzCreator-Question-Add">Ajouter</button></p>'
	+ 		'</div>'
	+ 		'<div class="Ldt-QuizzCreator-Questions-Block">'
	+ 	'</div>'
	+ '</div>';

IriSP.Widgets.QuizzCreator.prototype.draw = function() {
    var _this = this;

    this.begin = new IriSP.Model.Time();
    this.end = this.source.getDuration();


    this.renderTemplate();
   
	/* Quizz creator */
	this.nbQuestions = 1;

	this.question = new IriSP.Widgets.UniqueChoiceQuestion();

	//	alert(this.question.renderTemplate(null, 1));
	this.$.find(".Ldt-QuizzCreator-Question-Type").bind("change", this.functionWrapper("onQuestionTypeChange"));
	this.$.find(".Ldt-QuizzCreator-Question-Add").bind("click", this.functionWrapper("onQuestionAdd"));
};

IriSP.Widgets.QuizzCreator.prototype.onQuestionTypeChange = function(e) {

    var _field = this.$.find(".Ldt-QuizzCreator-Question-Type");
    var _contents = _field.val();

	var _this = this;
	switch(_contents) {
		case "unique_choice":
			this.question = new IriSP.Widgets.UniqueChoiceQuestion();
		break;

		case "multiple_choice":
			this.question = new IriSP.Widgets.MultipleChoiceQuestion();
		break;
	}

	this.nbQuestions = 1;

	var output = '<div class="Ldt-QuizzCreator-Questions-Question">'
	+ 	'<div class="Ldt-QuizzCreator-Questions-Question-Correct">'+ this.question.renderTemplate(null, _this.nbQuestions) +'</div>'
	+ 	'<div class="Ldt-QuizzCreator-Questions-Question-Content">Réponse :<br /><input type="text" id="question'+ _this.nbQuestions +'" /><br />'
	+	'Feedback :<br/><textarea id="feedback'+ _this.nbQuestions +'"></textarea></div>' 
	+	'<div class="Ldt-QuizzCreator-Questions-Question-Time">à <input type="text" placeholder="hh:mm:ss" id="time'+ _this.nbQuestions +'" /></div>'
	+ 	'<div class="Ldt-QuizzCreator-Questions-Question-Delete"><button class="Ldt-QuizzCreator-Remove" id="remove'+ _this.nbQuestions +'">x</button></div>'
	+ '</div>';

	$("body").on("click", ".Ldt-QuizzCreator-Remove", function() {
		var id = this.id;
		$("#"+ id).closest(".Ldt-QuizzCreator-Questions-Question").remove();
		_this.nbQuestions--;
	});

	$(".Ldt-QuizzCreator-Questions-Block").html(output);
	
    this.pauseOnWrite();
};

IriSP.Widgets.QuizzCreator.prototype.onQuestionAdd = function(e) {
	
	this.nbQuestions++;

	var output = '<div class="Ldt-QuizzCreator-Questions-Question">'
	+ 	'<div class="Ldt-QuizzCreator-Questions-Question-Correct">'+ this.question.renderTemplate(null, this.nbQuestions) +'</div>'
	+ 	'<div class="Ldt-QuizzCreator-Questions-Question-Content">Réponse :<br /><input type="text" id="question'+ this.nbQuestions +'" /><br />'
	+	'Feedback :<br/><textarea id="feedback'+ this.nbQuestions +'"></textarea></div>'
	+	'<div class="Ldt-QuizzCreator-Questions-Question-Time">à <input type="text" placeholder="hh:mm:ss" id="time'+ this.nbQuestions +'" /></div>'
	+ 	'<div class="Ldt-QuizzCreator-Questions-Question-Delete"><button class="Ldt-QuizzCreator-Remove" id="remove'+ this.nbQuestions +'">x</button></div>'
	+ '</div>';

	$(".Ldt-QuizzCreator-Questions-Block").append(output);
	
    this.pauseOnWrite();
};

IriSP.Widgets.QuizzCreator.prototype.pauseOnWrite = function() {
    if (this.pause_on_write && !this.media.getPaused()) {
        this.media.pause();
    }
};

/* Fonction effectuant l'envoi des annotations */
IriSP.Widgets.QuizzCreator.prototype.onSubmit = function() {
    //TODO
    return false;
};
