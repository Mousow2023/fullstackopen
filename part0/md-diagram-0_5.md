sequenceDiagram
    participant Browser
    participant Server

    Browser->Server: request the html page for the notes
    activate Server
    Server-->>Browser: JSON raw data
    deactivate Server    

    Browser->Browser: Client-side JS displays the data