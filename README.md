
# Ferremas - API Inventario

Este repositorio contiene la implemetación de un API de inventario diseñado para gestionar el contro de inventario de la empresa Ferremas.


## Installation

Clone this repository

```bash
  git clone https://github.com/matias0033/front-ferremas.git
```

Install Ferremas/api-inventario with npm
```bash
  cd front-ferremas
  npm install 
```

#### Update .env
##### Se debe escoger en funcion de si levantara las APIs en su maquina o ocupara las APIs directo desde la nube


```plaintext
#example localhost
# VITE_APP_API_AUTH = http://localhost:3001
# VITE_APP_API_PEDIDOS = http://localhost:3002
# VITE_APP_API_INVENTARIO = http://localhost:3003
```

```plaintext
#example en la nube
# VITE_APP_API_AUTH = http://172.172.245.209:8002
# VITE_APP_API_PEDIDOS =  http://172.172.245.209:8003
# VITE_APP_API_INVENTARIO =  http://172.172.245.209:8001

```

## Deployment

To deploy this project run

```bash
 npm run dev
```

To implement this project remotely

```http
 http://172.172.245.209:8004/login
```
## User Login

| Type |  Parameter   | 
| :-------- | :------- |
| username: | `angel@gmail.com` | 
| password: | `123456` | 

