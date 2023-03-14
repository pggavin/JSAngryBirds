// Copyright (C) 2023 Gavin Van Hussen

export default class App {

    #dialogState;

    constructor() {
        // this is where we build an instance of this app
        this.#dialogState = false;

        // handle a simple button press
        $("#press-me").on("click", event =>
            this.openDialog("Opened the dialog")
        );

        $("#close-me").on("click", event => {
            // when the user presses the button...
            this.closeDialog("Closed the dialog")
        });

        $("#send-me").on('click', event => {
            // send the form data to the server
            this.sendFormDataToServer(event);
        });

        $("#fav-bev-form").on('submit', event => {
            // send the form data to the server
            this.sendFormDataToServer(event);
        })
    }

    sendFormDataToServer(event) {
        // prevent the default thing from happening
        event.preventDefault();

        // Collect the inputs from the form
        let bev = $('[name="fav-bev"]').val();
        //   OR
        let msg = $("#fav-bev-form").serialize();
        let inputList = $("#fav-bev-form").serializeArray();

        // create a request for the server
        $.post('/api/send_bev', inputList)
            .then(result => {
                // I only get triggered after the server returns
                // wait for an answer
                let data = JSON.parse(result);
                let resultMsg = `Your favorite beverage is: ${data.fav_bev}`;
                $("#output").html(resultMsg);
                console.log(resultMsg)
            })
    }


    openDialog(msg = "opened") {

        if (this.#dialogState)
            return;

        this.#dialogState = !this.#dialogState;
        $("#result-dlg").show();
        console.log(msg)
    }


    closeDialog(msg = "closed") {

        if (!this.#dialogState)
            return;

        this.#dialogState = !this.#dialogState;
        $("#result-dlg").hide();
        console.log(msg)
    }
}