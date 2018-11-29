# testePeoplePRO
Teste de avaliação - conhecimentos em Java, Rest, RestFull, nodeJS, MongoDB, Postman

Ambiente utilizado para desenvolvimento (Ubuntu 18.4).

Softwares utilizados:

    MongoDB:
    ========
    
    edivaldo@edivaldo-AHV:~/clone/testePeoplePRO$ mongo --version

        MongoDB shell version v3.6.3
        git version: 9586e557d54ef70f9ca4b43c26892cd55257e1a5
        OpenSSL version: OpenSSL 1.1.0g  2 Nov 2017
        allocator: tcmalloc
        modules: none
        build environment:
            distarch: x86_64
            target_arch: x86_64

    Instalação do MongoDB no Ubuntu:
        
    # apt-get update
    # sudo apt install -y mongodb
    # sudo systemctl status mongodb

        ● mongodb.service - An object/document-oriented database
       Loaded: loaded (/lib/systemd/system/mongodb.service; enabled; vendor preset: enabled)
       Active: active (running) since Thu 2018-11-29 07:22:56 -02; 5h 19min ago
         Docs: man:mongod(1)
     Main PID: 886 (mongod)
        Tasks: 23 (limit: 4555)
       CGroup: /system.slice/mongodb.service
               └─886 /usr/bin/mongod --unixSocketPrefix=/run/mongodb --config /etc/mongodb.conf

    nov 29 07:22:56 edivaldo-AHV systemd[1]: Started An object/document-oriented database.
  
    NodeJS:
    =======
    
    edivaldo@edivaldo-AHV:~/clone/testePeoplePRO$ node -v
    v8.11.1

    Instalação do NodeJS no Ubuntu:
    
    # sudo apt update
    # sudo apt install nodejs

    npm:
    ====
    
    edivaldo@edivaldo-AHV:~/clone/testePeoplePRO$ npm --version
    5.6.0

    Instalação do npm no Ubuntu:
    
    # sudo apt update
    # sudo apt install npm
    
    Postman (Chrome):
    =================

    Instalação do postman no Ubuntu:
    
    # wget https://dl.pstmn.io/download/latest/linux64 -O postman.tar.gz
    # sudo tar -xzf postman.tar.gz -C /opt
    # rm postman.tar.gz
    # sudo ln -s /opt/Postman/Postman /usr/bin/postman
    # postman
    
    nodemon:
    ========
    
    Instalação do nodemon no Ubuntu:
    
    # sudo npm install -g nodemon

Configuração do projeto:

    Criar área de trabalho.
    
    # mkdir -p /home/edivaldo/peoplePRO
    # cd /home/edivaldo/peoplePRO
    
    Configurar projeto.
    
    # sudo npm init
    
        (Responder formulário, confirmar com "yes")
        
    # sudo npm install express --save
    # sudo npm install body-parser --save
    # sudo npm install validator -- save
    # sudo npm install mongoose --save
    
    Arquivo "package.json" gerado:
    
    # cat package.json
    {
      "name": "peoplepro",
      "version": "1.0.0",
      "description": "Teste vaga Santa Cecília - Uol",
      "main": "app.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [
        "peoplePRO",
        "rest",
        "restFull"
      ],
      "author": "Edivaldo Ribeiro",
      "license": "ISC",
      "dependencies": {
        "body-parser": "^1.18.3",
        "express": "^4.16.4",
        "mongoose": "^5.3.14",
        "validator": "^10.9.0"
      }
    }

Preparando o "back-end" para testes, usando "nodemon". Daemon faz reset da aplicaço quando ocorre correções.

    # nodemon app.js
    [nodemon] 1.18.7
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching: *.*
    [nodemon] starting `node app.js`
    db connection open to mongodb://127.0.0.1/peoplePRO2
    db connect ok!

Preparando o "front-end" para testes, usando "postman". Ferramenta faz request dos testes desejados, com amplo suporte
na comunicação rest.

    Abrir uma segunda janela do terminal.
    
    # cd /home/edivaldo/peoplePRO
    # postman
    Gtk-Message: 07:48:34.681: Failed to load module "canberra-gtk-module"
    1543484924450 main info ["Booting Postman 6.5.3, linux-4.15.0-39-generic on x64"]
    1543484924453 main info ["EventBus~initialize - Success"]
    1543484924459 main info ["UpdateHandler~init - Success"]
    1543484924460 main info ["RuntimeExecutionService~initialized: Success"]
    1543484924664 main info ["ProtocolHandler~init - Success with status: false]"]
    1543484927013 main info ["Bootstrap-models~bootstrap - Success"]
    1543484931733 main info ["Main~AppEvents - Received booted event for process shared"]
    1543484934209 main info ["UpdateHandler~app-update-events - Received event",{"name":"checkForElectronVersionUpdated","namespace":"appUpdate"}]
    1543484934211 main info ["Main~AppEvents - Received booted event for process requester"]

Simulador de testes, envio de requisições rest (Postman)




    





