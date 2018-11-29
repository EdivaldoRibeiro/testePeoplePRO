# testePeoplePRO
Teste de avaliação - conhecimentos em Java, Rest, RestFull, nodeJS, MongoDB, Postman

Proposta do teste:

    - Considere apenas a parte backend. Não é necessário desenvolver tela/formulário, apenas os endpoints REST.
    - Um cliente é composto apenas por nome e idade 
    - API aberta de geolocalização por IP https://www.ipvigilante.com/
    - API aberta de clima por geolocalização https://www.metaweather.com/api/
    - Quando executar a busca de clima por geolocalização, caso não exista a cidade especifica de origem, utilize o resultado mais próximo.

    Sua tarefa é desenvolver os serviços REST abaixo:
    
    - Criar um Cliente
    - Alterar um Cliente
    - Consultar um Cliente por id
    - Listar todos os Clientes salvos
    - Remover Cliente por id

    Ao criar um cliente, apenas para fins estatísticos e históricos, busque qual a localização geográfica de quem executou a requisição, usando o IP de origem. Com a localização geográfica, consulte qual é a temperatura máxima e mínima do dia da requisição de criação no local do IP de origem. Salve essa informação e a associe ao cliente resultado da requisição de origem.

    Tenha em mente que a consulta de Cliente por ID será altamente requisitada.

Protótipo realizado:

    Criei no MongoDB o esquema:
    
    var userShema = mongoose.Schema({
        fullname: String,           // Nome do usuário
        email: String,              // Email do usuário
        password: String,           // Password do usuário
        created_at: Date,           // Data de criação
        ip: String,                 // IP do usuário
        latitude: String,           // Latitude (obtido em https://www.ipvigilante.com/)
        longitude: String,          // Longitude (obtido em https://www.ipvigilante.com/)
        woeid: String,              // Id universal (obtido em https://www.metaweather.com/api/)
        city: String,               // Cidade próx. 1a. ocorrência (obtido em https://www.metaweather.com/api/)
        min_temp: String,           // Temperatura mínima 1a. ocorrência (obtido em https://www.metaweather.com/api/)
        max_temp: String            // Temperatura máxima 1a. ocorrência (obtido em https://www.metaweather.com/api/)
      });

Ambiente utilizado para desenvolvimento (Ubuntu 18.4).

Softwares utilizados:

    MongoDB:
    ========
    
    MongoDB é um software de banco de dados orientado a documentos livre.
    
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
    
    Node.js é um interpretador de código JavaScript com o código aberto, focado em migrar o Javascript do lado do cliente para servidores.
    
    edivaldo@edivaldo-AHV:~/clone/testePeoplePRO$ node -v
    v8.11.1

    Instalação do NodeJS no Ubuntu:
    
    # sudo apt update
    # sudo apt install nodejs

    npm:
    ====
    
    O npm é um gerenciador de pacotes para a linguagem de programação JavaScript.
    
    edivaldo@edivaldo-AHV:~/clone/testePeoplePRO$ npm --version
    5.6.0

    Instalação do npm no Ubuntu:
    
    # sudo apt update
    # sudo apt install npm
    
    Postman (Chrome):
    =================
    
    Postman is the only complete API development environment, for API developers, used by more than 5 million developers and 100000 companies worldwide.

    Instalação do postman no Ubuntu:
    
    # wget https://dl.pstmn.io/download/latest/linux64 -O postman.tar.gz
    # sudo tar -xzf postman.tar.gz -C /opt
    # rm postman.tar.gz
    # sudo ln -s /opt/Postman/Postman /usr/bin/postman
    # postman
    
    nodemon:
    ========
    
    Just use nodemon instead of node to run your code, and now your process will automatically restart when your code changes. 
    
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

Preparando o "front-end" para testes, usando "postman". Ferramenta faz request dos testes desejados, com amplo suporte http.

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

    Teste 1 - POST:
    ===============
    
    Envio:
    
    http://127.0.0.1:5000/users/?fullname=Edivaldo RIbeiro&email=java.betel@uol.com.br&password=123456&ip=/8.8.8.8/full&city=são paulo&latitude=100.10&longitude=200.20&min_temp=0.5&max_temp=25.6
    
    Resposta:
    
    {
        "_id": "5c000975a030cd31702b3e3d",
        "fullname": "Edivaldo RIbeiro",
        "email": "java.betel@uol.com.br",
        "password": "123456",
        "latitude": "37.38600",
        "longitude": "-122.08380",
        "ip": "/8.8.8.8/full",
        "city": "Mountain View",
        "woeid": "2455920",
        "min_temp": "10.2375",
        "max_temp": "14.004999999999999",
        "created_at": "2018-11-29T15:44:53.730Z",
        "__v": 0
    }

    Teste 2 - POST:
    ===============
    
    Envio:
    
    http://127.0.0.1:5000/users/?fullname=Antonio Florentino&email=antonio@teste.com.br&password=1234568&ip=/8.8.8.8/full&city=são paulo&latitude=100.10&longitude=200.20&min_temp=0.5&max_temp=25.6
    
    Resposta:
    
    {
        "_id": "5c000a11a030cd31702b3e3e",
        "fullname": "Antonio Florentino",
        "email": "antonio@teste.com.br",
        "password": "1234568",
        "latitude": "37.38600",
        "longitude": "-122.08380",
        "ip": "/8.8.8.8/full",
        "city": "Mountain View",
        "woeid": "2455920",
        "min_temp": "10.2375",
        "max_temp": "14.004999999999999",
        "created_at": "2018-11-29T15:47:29.793Z",
        "__v": 0
    }

    Teste 3 - GET: (Retorno de lista)
    ==============
    
    Envio:
    
    http://127.0.0.1:5000/users/
    
    Resposta:
    
    [
        {
            "_id": "5c000975a030cd31702b3e3d",
            "fullname": "Edivaldo RIbeiro",
            "email": "java.betel@uol.com.br",
            "password": "123456",
            "latitude": "37.38600",
            "longitude": "-122.08380",
            "ip": "/8.8.8.8/full",
            "city": "Mountain View",
            "woeid": "2455920",
            "min_temp": "10.2375",
            "max_temp": "14.004999999999999",
            "created_at": "2018-11-29T15:44:53.730Z",
            "__v": 0
        },
        {
            "_id": "5c000a11a030cd31702b3e3e",
            "fullname": "Antonio Florentino",
            "email": "antonio@teste.com.br",
            "password": "1234568",
            "latitude": "37.38600",
            "longitude": "-122.08380",
            "ip": "/8.8.8.8/full",
            "city": "Mountain View",
            "woeid": "2455920",
            "min_temp": "10.2375",
            "max_temp": "14.004999999999999",
            "created_at": "2018-11-29T15:47:29.793Z",
            "__v": 0
        }
    ]

    Teste 4 - GET: (Consulta do usuário Edivaldo)
    ==============
    
    Envio:
    
    http://127.0.0.1:5000/users/5c000975a030cd31702b3e3d

    Resposta:

    {
        "_id": "5c000975a030cd31702b3e3d",
        "fullname": "Edivaldo RIbeiro",
        "email": "java.betel@uol.com.br",
        "password": "123456",
        "latitude": "37.38600",
        "longitude": "-122.08380",
        "ip": "/8.8.8.8/full",
        "city": "Mountain View",
        "woeid": "2455920",
        "min_temp": "10.2375",
        "max_temp": "14.004999999999999",
        "created_at": "2018-11-29T15:44:53.730Z",
        "__v": 0
    }

    Teste 5 - PUT - (Alteração do usuário Edivaldo)
    =============
    
    Envio:
    
    http://127.0.0.1:5000/users?fullname=Edivaldo Ribeiro Senior&password=654321&id=5c000975a030cd31702b3e3d
    
    Resposta:
    
    {
        "_id": "5c000d33a030cd31702b3e3f",
        "fullname": "Edivaldo Ribeiro Senior",
        "password": "654321",
        "longitude": "-46.64170",
        "latitude": "-23.57330",
        "city": "São Paulo",
        "woeid": "455827",
        "min_temp": "18.19333333333333",
        "max_temp": "27.866666666666664",
        "created_at": "2018-11-29T16:00:51.111Z",
        "__v": 0
    }

    Tese 6 - GET - (Consulta do Edivaldo)
    ============
    
    Envio:
    
    http://127.0.0.1:5000/users/5c000975a030cd31702b3e3d
    
    Resposta:
    
    {
        "_id": "5c000975a030cd31702b3e3d",
        "fullname": "Edivaldo Ribeiro Senior",
        "email": "java.betel@uol.com.br",
        "password": "123456",
        "latitude": "-23.57330",
        "longitude": "-46.64170",
        "ip": "/8.8.8.8/full",
        "city": "São Paulo",
        "woeid": "455827",
        "min_temp": "18.19333333333333",
        "max_temp": "27.866666666666664",
        "created_at": "2018-11-29T15:44:53.730Z",
        "__v": 0
    }
    
    Teste 7 - DELETE - (Exclusão do usuário Edivaldo)
    ================
    
    Envio:
    
    http://127.0.0.1:5000/users/5c000975a030cd31702b3e3d
    
    Resposta:
    
    {
        "resposta": " Usuário excluído com sucesso"
    }
    
    Teste 8 - GET - (Lista)
    =============
    
    Envio:
    
    http://127.0.0.1:5000/users/
    
    Resposta:
    
    [
        {
            "_id": "5c000a11a030cd31702b3e3e",
            "fullname": "Antonio Florentino",
            "email": "antonio@teste.com.br",
            "password": "1234568",
            "latitude": "37.38600",
            "longitude": "-122.08380",
            "ip": "/8.8.8.8/full",
            "city": "Mountain View",
            "woeid": "2455920",
            "min_temp": "10.2375",
            "max_temp": "14.004999999999999",
            "created_at": "2018-11-29T15:47:29.793Z",
            "__v": 0
        }
    ]
