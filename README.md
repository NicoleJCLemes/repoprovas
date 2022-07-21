# RepoProvas
## Usage
$ git clone https://github.com/NicoleJCLemes/repoprovas

$ cd repoprovas

$ npm install

$ npm run dev

## API:
### Rota de usuário
- POST /sign-up
    - Rota para o usuário criar uma conta
    - body: {
        "email": "",
        "password": "",
        "passwordConfirmed": ""
    }