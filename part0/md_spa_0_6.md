sequenceDiagram
    participant Browser
    participant Server

    Browser->Server: request the html page for the notes
    activate Server
    Server-->>Browser: html document (with css and js links)
    deactivate Server

    Browser->Server: POST https://fullstack-exampleapp.herokuapp.com/new_note using AJAX
    activate Server
    Server-->>Browser: JSON raw data
    deactivate Server

    Browser->Browser: Client-side JS dynamically updates the DOM without full page reload
    