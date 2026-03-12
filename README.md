# Enzo de Paulo - Protfolio & Timeline

Este repositório contém o portfólio pessoal e planejamento do Enzo, construído com Next.js, React, Tailwind CSS e Framer Motion.
O projeto conta com um **CMS Local** (Content Management System), desenvolvido sob medida.
Qualquer texto ou imagem pode ser editado pelo frontend e essas edições são salvas diretamente no código (arquivos JSON na pasta `/public/data`).

## 🛠 Como rodar localmente (Desenvolvimento)

Para rodar o projeto na sua máquina com o modo de edição ativo:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000?edit=1](http://localhost:3000?edit=1) no seu navegador para ver o botão flutuante de Edição do CMS.

---

## 🚀 Como fazer o Deploy na Hostinger (VPS)

Como o projeto possui um CMS que precisa gravar arquivos no disco (`/public/data` e `/public/uploads`), a melhor forma de organizar o ambiente na sua VPS da Hostinger é utilizando o Docker mapeando um **Volume**.

### Passo 1: Clone e construa a imagem na VPS

Acesse sua VPS da Hostinger via SSH.
Baixe o seu código pelo GitHub:
```bash
git clone https://github.com/SEU_USUARIO/enzo-de-paulo.git
cd enzo-de-paulo
```

Construa a imagem Docker (isso vai ler o `Dockerfile` que preparamos para o Next.js no modo *standalone*):
```bash
docker build -t enzo-portfolio .
```

### Passo 2: Rode o Container com Volumes Permanentes

Como as edições do CMS acontecem dentro da pasta `/app/public/data` e `/app/public/uploads` do container, precisamos criar um "Volume" no seu Linux para que esses dados **nunca se percam**, mesmo que você reconstrua a imagem no futuro.

```bash
# Crie pastas seguras no seu servidor Hostinger
mkdir -p /opt/enzo-portfolio/public/data
mkdir -p /opt/enzo-portfolio/public/uploads

# Copie os arquivos iniciais do seu código para essa pasta na VPS:
cp public/data/* /opt/enzo-portfolio/public/data/

# Dê a devida permissão para o usuário Nextjs (Criado no Dockerfile com ID 1001)
chown -R 1001:1001 /opt/enzo-portfolio/public

# Rode o container na porta 3000, linkando as pastas externas:
docker run -d \
  --name enzo-site \
  -p 3000:3000 \
  -v /opt/enzo-portfolio/public/data:/app/public/data \
  -v /opt/enzo-portfolio/public/uploads:/app/public/uploads \
  --restart always \
  enzo-portfolio
```

### Passo 3: Configurando o Nginx e o Domínio

O site agora está rodando na porta 3000 da sua VPS. Para que o domínio (`enzodepaulo.tech` ou `enzodepaulo.site`) funcione, precisamos configurar o **Nginx** como *Reverse Proxy*.

Crie o arquivo do site no Nginx:
```bash
sudo nano /etc/nginx/sites-available/enzodepaulo
```

Cole a configuração abaixo (Substitua SEU_DOMINIO pelo domínio que você escolheu):
```nginx
server {
    listen 80;
    server_name SEU_DOMINIO.tech www.SEU_DOMINIO.tech;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ative e reinicie o Nginx:
```bash
ln -s /etc/nginx/sites-available/enzodepaulo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Passo 4: HTTPS Seguro com o Certbot

Por fim, instale o SSL grátis para o site ficar seguro:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d SEU_DOMINIO.tech -d www.SEU_DOMINIO.tech
```

Pronto! Seu site estará disponível em `https://enzodepaulo.tech` 🚀


