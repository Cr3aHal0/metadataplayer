IriSP.Widgets.CreateAnnotation = function(player, config) {
    IriSP.Widgets.Widget.call(this, player, config);
    this.lastAnnotation = false;
};

IriSP.Widgets.CreateAnnotation.prototype = new IriSP.Widgets.Widget();

IriSP.Widgets.CreateAnnotation.prototype.defaults = {
    single_time_mode : false,
    show_title_field : true,
    user_avatar : "https://si0.twimg.com/sticky/default_profile_images/default_profile_1_normal.png"
/*
        tags : [
            {
                id: "digitalstudies",
                meta: {
                    description: "#digital-studies"
                }
            },
            {
                id: "amateur",
                meta: {
                    description: "#amateur"
                },
            }
        ],
        remote_tags : false,
        random_tags : false,
        show_from_field : false,
        disable_share : false,
        polemic_mode : true, // enable polemics
        polemics : [{
            className: "positive",
            keyword: "++"
        }, {
            className: "negative",
            keyword: "--"
        }, {
            className: "reference",
            keyword: "=="
        }, {
            className: "question",
            keyword: "??"
        }],
        cinecast_version : false, // put to false to enable the platform version, true for the festival cinecast one.

        // where does the widget PUT the annotations - this is a mustache template. id refers to the id of the media and is filled by the widget.
         
        api_endpoint_template : "", // platform_url + "/ldtplatform/api/ldt/annotations/{{id}}.json",
        api_method : "PUT"
 */
}

IriSP.Widgets.CreateAnnotation.prototype.messages = {
    en: {
        from_time: "from",
        to_time: "to",
        at_time: "at",
        submit: "Submit",
        add_keywords: "Add keywords",
        add_polemic_keywords: "Add polemic keywords",
        your_name: "Your name",
        no_title: "Annotate this video",
        type_title: "Annotation title",
        type_description: "Type the full description of your annotation here.",
        wait_while_processing: "Please wait while your request is being processed...",
        error_while_contacting: "An error happened while contacting the server. Your annotation has not been saved.",
        empty_annotation: "Your annotation is empty. Please write something before submitting.",
        annotation_saved: "Thank you, your annotation has been saved.",
        share_annotation: "Would you like to share it on social networks ?",
        share_on: "Share on",
        more_tags: "More tags",
        cancel: "Cancel"
    },
    fr: {
        from_time: "from",
        to_time: "à",
        at_time: "à",
        submit: "Envoyer",
        add_keywords: "Ajouter des mots-clés",
        add_polemic_keywords: "Ajouter des mots-clés polémiques",
        your_name: "Votre nom",
        no_title: "Annoter cette vidéo",
        type_title: "Titre de l'annotation",
        type_description: "Rédigez le contenu de votre annotation ici.",
        wait_while_processing: "Veuillez patienter pendant le traitement de votre requête...",
        error_while_contacting: "Une erreur s'est produite en contactant le serveur. Votre annotation n'a pas été enregistrée",
        empty_annotation: "Votre annotation est vide. Merci de rédiger un texte avant de l'envoyer.",
        annotation_saved: "Merci, votre annotation a été enregistrée.",
        share_annotation: "Souhaitez-vous la partager sur les réseaux sociaux ?",
        share_on: "Partager sur",
        more_tags: "Plus de mots-clés",
        cancel: "Cancel"
    }
}

IriSP.Widgets.CreateAnnotation.prototype.template =
    '<div class="Ldt-CreateAnnotation"><div class="Ldt-CreateAnnotation-Inner">'
    + '<form class="Ldt-CreateAnnotation-Screen Ldt-CreateAnnotation-Main">'
    + '<h3>{{#show_title_field}}<input class="Ldt-CreateAnnotation-Title" placeholder="{{l10n.type_title}}" />{{/show_title_field}}'
    + '{{^show_title_field}}<span class="Ldt-CreateAnnotation-NoTitle">{{l10n.no_title}}</span>{{/show_title_field}}'
    + ' <span class="Ldt-CreateAnnotation-Times">{{#single_time_mode}}{{l10n.at_time}}{{/single_time_mode}}'
    + '{{^single_time_mode}}{{l10n.from_time}}{{/single_time_mode}} <span class="Ldt-CreateAnnotation-Begin"></span>'
    + ' {{^single_time_mode}}{{l10n.to_time}} <span class="Ldt-CreateAnnotation-End"></span>{{/single_time_mode}}</span></h3>'
    + '<textarea class="Ldt-CreateAnnotation-Description" placeholder="{{type_description}}"></textarea>'
    + '<input type="submit" class="Ldt-CreateAnnotation-Submit" />'
    + '</form>'
    + '</div></div>';
    
IriSP.Widgets.CreateAnnotation.prototype.draw = function() {
    this.renderTemplate();
}
    
/*    
    + '        <div class="Ldt-CreateAnnotation-Screen Ldt-createAnnotation-startScreen">'
    + '            <div style="margin-bottom: 7px; overflow: auto;">'
    + '                <div class="Ldt-createAnnotation-Title"></div>'
    + '                <div class="Ldt-createAnnotation-TimeFrame"></div>'
    + '                {{^cinecast_version}} <div class="Ldt-createAnnotation-Minimize Ldt-TraceMe" title="Cancel"></div>'
    + '                {{/cinecast_version}}'
    + '            </div>'
    + '            <div class="Ldt-createAnnotation-Container">'
    + '                {{#show_from_field}}'
    + '                <label>{{l10n.your_name}}&nbsp;: </label><input class="Ldt-createAnnotation-userName Ldt-TraceMe" value="{{user_name}}" />'
    + '                {{/show_from_field}}'
    + '                <textarea class="Ldt-createAnnotation-Description Ldt-TraceMe"></textarea>'
    + '                <div class="Ldt-createAnnotation-userAvatar Ldt-TraceMe">'
    + '                    {{^user_avatar}} <img src="https://si0.twimg.com/sticky/default_profile_images/default_profile_1_normal.png"></img>'
    + '                    {{/user_avatar}}'
    + '                    {{#user_avatar}} <img src="{{ user_avatar }}"></img>'
    + '                    {{/user_avatar}}'
    + '                </div>'
    + '                <div class="Ldt-createAnnotation-profileArrow"></div>'
    + '            </div>'
    + '            <button class="Ldt-createAnnotation-submitButton Ldt-TraceMe">{{l10n.submit}}</button>'
    + '            {{#tags.length}}'
    + '            <div class="Ldt-createAnnotation-btnblock Ldt-createAnnotation-keywords">'
    + '                <label>{{l10n.add_keywords}} :</label>'
    + '                <ul class="Ldt-floatList">'
    + '                {{#tags}}'
    + '                    <li><button class="Ldt-createAnnotation-keyword-button Ldt-TraceMe" tag-id="{{id}}">{{meta.description}}</button></li>'
    + '                {{/tags}}'
    + '                </ul>'
    + '            </div>'
    + '            {{#random_tags}}'
    + '                <button class="Ldt-createAnnotation-moar-keywordz">{{l10n.more_tags}}</button>'
    + '            {{/random_tags}}'
    + '            {{/tags.length}}'
    + '            {{#polemic_mode}}'
    + '            {{#polemics.length}}'
    + '            <div class="Ldt-createAnnotation-btnblock Ldt-createAnnotation-polemics">'
    + '                <label>{{l10n.add_polemic_keywords}} :</label>'
    + '                <ul class="Ldt-floatList">'
    + '                {{#polemics}}'
    + '                    <li><button class="Ldt-createAnnotation-polemic-{{className}} Ldt-createAnnotation-polemic-button Ldt-TraceMe">{{keyword}}</button></li>'
    + '                {{/polemics}}'
    + '                </ul>'
    + '            </div>'
    + '            {{/polemics.length}}'
    + '            {{/polemic_mode}}'
    + '        </div>'
    + '        <div class="Ldt-createAnnotation-screen Ldt-createAnnotation-waitScreen" style="display: none; text-align: center">'
    + '            <div class="Ldt-createAnnotation-spinner"></div>'
    + '            {{l10n.wait_while_processed}}'
    + '        </div>'
    + '        <div class="Ldt-createAnnotation-screen Ldt-createAnnotation-errorScreen" style="display: none; text-align: center">'
    + '            <div class="Ldt-createAnnotation-Minimize" title="Hide"></div>'
    + '            {{l10n.error_while_contacting}}'
    + '        </div>'
    + '        <div class="Ldt-createAnnotation-screen Ldt-createAnnotation-endScreen" style="display: none">'
    + '            <div class="Ldt-createAnnotation-Minimize" title="Hide"></div>'
    + '            {{l10n.annotation_saved}}'
    + '            <br>'
    + '            {{^disable_share}}'
    + '            {{l10n.share_annotation}}'
    + '            <div style="margin-top: 12px; text-align: center;">'
    + '                <a target="_blank" class="Ldt-createAnnotation-endScreen-TweetLink Ldt-TraceMe"></a>'
    + '                <a target="_blank" class="Ldt-createAnnotation-endScreen-FbLink Ldt-TraceMe"></a>'
    + '                <a target="_blank" class="Ldt-createAnnotation-endScreen-GplusLink Ldt-TraceMe"></a>'
    + '            </div>'
    + '            {{/disable_share}}'
    + '        </div>'
    + '        <div class="Ldt-floatClear"></div>'
*/

