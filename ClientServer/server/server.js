// Copyright (C) Gavin Van Hussen
'use strict';

import Express from 'express'
import HTTP from 'http'

import FileSystem from 'fs-extra'
import Path from 'path'

const __dirname = Path.resolve();

const PORT = 4000;


class Server {

    constructor(api, port = PORT) {

        console.log("Creating server");

        this.api = Express();
        this.port = port;
        this.title = "Sample client Server App"

        this.api
            .use(Express.json())
            .use(Express.urlencoded({ extended: false }))
            .use('/', Express.static(`${Path.join(__dirname, '..')}`));

        this.api.get('/', (request, response) => {

            console.log('Request for static files');
            let file = `${Path.join(__dirname, '/..')}`;
            response.sendFile(file);
        });


        this.api.post('/api/send_bev', (request, response) => {
            // handle post requests sent to this server for this edge
            let params = request.body;

            params.fav_bev = "Coke";
            let result = JSON.stringify(params);
            response.send(result)
        })
    }


    run() {

        console.log("Server running");

        this.api.set('port', this.port);
        this.listener = HTTP.createServer(this.api);
        this.listener.listen(this.port);

        this.listener.on('listening', event => this.handleListenerListening(event));
    }

    handleListenerListening(event) {

        let address = this.listener.address();
        let bind = "";
        if (typeof address === `string`) {
            bind = `pipe ${address}`
        }
        else {
            bind = `port ${address.port}`
        }
        console.log(`Listening on ${bind}`)
    }
}

const server = new Server();
server.run();