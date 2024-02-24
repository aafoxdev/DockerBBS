# 1. NginxとDockerを利用したWEB開発

Dockerを用いて、データベースと連携したNEXTJSで動くWEBサイトを作る
練習用リポジトリです。

# 2. 今回の開発内容
実装予定の基本機能は次のものを考えています(開発中)。
## 2.1. NextJSで作る掲示板サイト(SNSみたいなの)
- 気軽にメッセージの投稿ができる
- メッセージに対して返信できる
- ログイン機能がある
## 2.2. 学習目標
- Dockerを利用してサーバーを構築できる(完了済み)
- データベースと連携したNEXTJSによるWEB開発ができる(未完)
- TailWindCSSなどのCSSライブラリを使用できる(未完)
- Googleログインなどモダンなシステムをひとつでも組み込む(未完)

# 3. 今回のサーバー設計図
![画像の説明や代替テキスト](https://work.aafox.net/dataimg/nextjsproject.png)

今回の設計図の場合、localhost:8080からデータベースまでの接続過程は次の通りです。
1. Docker側でホストマシンの8080番ポートを予約します。
1. Dockerでホスト8080をDockerコンテナ内の80番に変換します。
1. コンテナ内80番はNginxが使用しており、これが3000番に転送します。
1. 3000番はNextJSコンテナが受信し、クライアントにDOMを送信します。
1. データベースにアクセスする場合は、NextJSとMySQL間にPrismaを置き、Hubにしてアクセスします。

このようにして、仮想的にサーバーを構築します。

# 4. Dockerを用いたデプロイ手順
NextJSコンテナをたちあげ、NextJSをコンテナ内に作成する。
```ruby:qiita.rb
docker compose run --rm nextjs sh -c 'npx create-next-app@latest app'
```
Yamlファイルに基づき、コンテナを立ち上げる。
```ruby:qiita.rb
docker compose up -d
```
MySQLのユーザーにDB操作権限を付与します。
```ruby:qiita.rb
docker exec -it mysql mysql -uroot -prootps
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' WITH GRANT OPTION;
exit
```
PrismaをNextJSに構築します。
```ruby:qiita.rb
docker exec -it -w /app/ nextjs npm install prisma --save-dev
docker exec -it -w /app/ nextjs npx prisma init
```
Prismaディレクトリができるのでprisma/schema.prismaを編集します。
```ruby:qiita.rb
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```
.envファイルにURLリンクを記述します。next-app内でなければ作ります.
```ruby:qiita.rb
DATABASE_URL="mysql://user:userps@mysql:3306/mydatabase?schema=public"
```
Prismaクライアントとマイグレーションを設定します。
```ruby:qiita.rb
docker exec -it -w /app/ nextjs npm install @prisma/client
docker exec -it -w /app/ nextjs npx prisma migrate dev --name initial-migration
```
Prismaスキーマの編集をします。
```ruby:qiita.rb
model reviews {
  id  Int  @id @default(autoincrement())
  title String
  author String
  price Int
  publisher String
  memo String
}
```
Prismaクライアントを生成します。
```ruby:qiita.rb
docker exec -it -w /app/ nextjs npx prisma generate
```

# 5. Dockerで困ったときのコマンド
たとえば、次のコマンドを使えば、特定コンテナのエラーログなどをみれます。
```ruby:qiita.rb
docker logs nextjs
```
コンテナ内部に移動したいとき
```ruby:qiita.rb
docker exec -it nextjs /bin/bash
```
ヘッダーでlocalhost8000のリクエストを3000として許可する設定
```ruby:qiita.rb
nano next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
experimental: {
    serverActions: {
      allowedOrigins: ["localhost:8080", "localhost:3000"]
    }
  }
};

export default nextConfig;
```
