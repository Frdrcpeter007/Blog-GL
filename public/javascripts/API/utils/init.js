/**
 * Gere toutes les requetes post d'un formulaire vers l'api
 * @param {*} form le formulaire qui est envoyé 
 * @param {*} button le bouton submit du formulaire, nous sert a y mettre le loader
 * @param {*} route la route a laquelle envoyée les datas
 * @param {*} callback la fonctions callback
 */
const postForm = (form, button, url, callback) => {
    var form = $('#' + form),
        inputs,
        obj = {},
        name,
        btnSubmit,
        btnText;
    form.submit((e) => {
        e.preventDefault();
        inputs = e.target.elements;
        btnSubmit = $("#" + button);
        btnText = btnSubmit.html();
        //Recuperation des inputs text et autres
        for (let index = 0; index < inputs.length; index++) {
            name = inputs[index].name;
            if (name != "") {
                if (/input|textarea/i.test(e.target.elements[index].localName)) {
                    
                    if (/radio/i.test(inputs[index].type)) {
                        
                        if (inputs[index].checked) {
                            obj[name] = inputs[index].value;
                        }
                    }else {
                        obj[name] = inputs[index].value;
                    }
                }
                if (/select/i.test(e.target.elements[index].localName)) {
                    obj[name] = inputs[index].options[inputs[index].selectedIndex].value;
                }
            }
        }
        //Envoi de la requete avec ajax
        $.ajax({
            type: 'POST',
            url: `${url}`,
            dataType: "json",
            data: obj,
            beforeSend: function () {
                btnSubmit.html(`<div class="sbl-circ white"></div>`);
            },
            success: function (data) {
                btnSubmit.html(btnText);
                if (data.state) {
                    callback(true, data);
                } else {
                    callback(false, data);
                }
            },
            error: function (err) {
                btnSubmit.html(btnText);
                callback(false, err);
            }
        });
    })
}

export {postForm}