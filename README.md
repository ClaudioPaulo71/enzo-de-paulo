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

### Passo 2: Rode o Container com Volumes Permanentes (Traefik)

Como as edições do CMS acontecem dentro da pasta `/app/public/data` e `/app/public/uploads` do container, precisamos criar um "Volume" no seu Linux para que esses dados **nunca se percam**, mesmo que você reconstrua a imagem no futuro. 

E, como eu vi que você utiliza o **Traefik** no seu servidor, nós não precisamos usar a porta 3000 ou configurar Nginx, basta subir o container com as **Labels (regras)** do Traefik para o domínio correto!

```bash
# Crie pastas seguras no seu servidor Hostinger
mkdir -p /opt/enzo-portfolio/public/data
mkdir -p /opt/enzo-portfolio/public/uploads

# Copie os arquivos iniciais do seu código para essa pasta na VPS:
cp public/data/* /opt/enzo-portfolio/public/data/

# Dê a devida permissão para o usuário Nextjs (Criado no Dockerfile com ID 1001)
chown -R 1001:1001 /opt/enzo-portfolio/public

# Rode o container integrando à mesma REDE do Traefik e com as Labels:
docker run -d \
  --name enzo-site \
  --network NOME_DA_REDE_DO_TRAEFIK \
  -v /opt/enzo-portfolio/public/data:/app/public/data \
  -v /opt/enzo-portfolio/public/uploads:/app/public/uploads \
  --label "traefik.enable=true" \
  --label "traefik.http.routers.enzosite.rule=Host(\`enzodepaulo.tech\`, \`www.enzodepaulo.tech\`)" \
  --label "traefik.http.services.enzosite.loadbalancer.server.port=3000" \
  --restart always \
  enzo-portfolio
```
*(Nota: não esqueça de substituir `NOME_DA_REDE_DO_TRAEFIK` pelo nome exato da rede Docker que o seu Traefik está operando.)*

Pronto! Seu site estará disponível em `http://enzodepaulo.tech` ou até mesmo em HTTPS dependo de como o seu Traefik gerencia os certificados SSL (Let's Encrypt). 🚀


