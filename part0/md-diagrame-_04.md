sequenceDiagram
    participant Browser
    participant Server

    Browser->Server: POST https://fullstack-exampleapp.herokuapp.com/new_note
    activate Server
    Server-->>Browser: HTTP 302 redirect to the notes pages
    deactivate Server

    Browser->Server: request the html page for the notes
    activate Server
    Server-->>Browser: html document (with css and js links)
    deactivate Server

    Browser->Server: request Cascading Style Sheet
    activate Server
    Server->>Browser: CSS
    Browser->Server: request javascript
    Server-->>Browser: javascript
    Browser->Server: request JSON data containing the notes
    Server-->>Browser: Data in JSON format
    deactivate Server

    Browser->Browser: callback handles the data