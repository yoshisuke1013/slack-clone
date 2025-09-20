# Slack Clone

Slack クローンのリアルタイムチャットアプリケーションです。React、TypeScript、Socket.IO を使用して構築されており、ワークスペース、チャンネル、メッセージング機能を提供します。

## 🚀 機能

### 認証機能

- ユーザー登録（サインアップ）
- ユーザーログイン（サインイン）
- JWT トークンベースの認証
- 自動ログイン状態の維持

### ワークスペース管理

- ワークスペースの作成
- ワークスペースの選択・切り替え
- ワークスペース一覧の表示

### チャンネル機能

- チャンネルの作成
- チャンネル一覧の表示
- チャンネル間の切り替え

### メッセージング

- リアルタイムメッセージ送信・受信
- メッセージの表示
- メッセージの削除
- 画像アップロード対応
- 日時表示（日本語形式）

### ユーザー管理

- ユーザー検索機能
- プロフィール表示・編集

## 🛠 技術スタック

### フロントエンド

- **React 19.1.1** - UI ライブラリ
- **TypeScript 5.8.3** - 型安全性
- **Vite 7.1.2** - ビルドツール
- **React Router DOM 7.9.1** - ルーティング
- **Jotai 2.14.0** - 状態管理
- **Axios 1.12.2** - HTTP クライアント
- **Socket.IO Client 4.8.1** - リアルタイム通信

### 開発ツール

- **ESLint 9.33.0** - コード品質管理
- **TypeScript ESLint 8.39.1** - TypeScript 用リンター

## 📁 プロジェクト構造

```
src/
├── App.tsx                          # メインアプリケーションコンポーネント
├── main.tsx                         # アプリケーションエントリーポイント
├── index.css                        # グローバルスタイル
├── lib/
│   └── api/
│       ├── index.ts                 # Axios設定
│       ├── socket.ts                # Socket.IO設定
│       └── interceptors/
│           └── request.ts           # リクエストインターセプター
├── modules/                         # ドメインロジック
│   ├── auth/                        # 認証関連
│   │   ├── auth.repository.ts       # 認証API
│   │   └── current-user.state.ts    # 現在のユーザー状態
│   ├── workspaces/                  # ワークスペース関連
│   │   ├── workspace.entity.ts      # ワークスペースエンティティ
│   │   └── workspace.repository.ts  # ワークスペースAPI
│   ├── channels/                    # チャンネル関連
│   │   ├── channel.entity.ts        # チャンネルエンティティ
│   │   └── channel.repository.ts    # チャンネルAPI
│   ├── messages/                    # メッセージ関連
│   │   ├── message.entity.ts        # メッセージエンティティ
│   │   └── message.repository.ts    # メッセージAPI
│   ├── users/                       # ユーザー関連
│   │   ├── user.entity.ts           # ユーザーエンティティ
│   │   └── user.repository.ts       # ユーザーAPI
│   ├── workspace-users/             # ワークスペースユーザー関連
│   │   ├── workspace-user.entity.ts # ワークスペースユーザーエンティティ
│   │   └── workspace-user.repository.ts # ワークスペースユーザーAPI
│   └── ui/                          # UI状態管理
│       └── ui.state.ts              # UI状態
└── pages/                           # ページコンポーネント
    ├── Home/                        # ホームページ
    │   ├── index.tsx                # メインレイアウト
    │   ├── Home.css                 # スタイル
    │   ├── MainContent/             # メインコンテンツエリア
    │   ├── Sidebar/                 # サイドバー
    │   └── WorkspaceSelector/       # ワークスペース選択
    ├── Signin/                      # ログインページ
    ├── Signup/                      # サインアップページ
    └── CreateWorkspace/             # ワークスペース作成ページ
```

## 🚀 セットアップ

### 前提条件

- Node.js (v18 以上推奨)
- npm または yarn

### インストール

1. リポジトリをクローン

```bash
git clone <repository-url>
cd slack-clone
```

2. 依存関係をインストール

```bash
npm install
```

3. 環境変数を設定
   `.env`ファイルを作成し、以下の変数を設定してください：

```env
VITE_API_URL=http://localhost:3000
```

4. 開発サーバーを起動

```bash
npm run dev
```

5. ブラウザで `http://localhost:5173` にアクセス

## 📝 利用可能なスクリプト

- `npm run dev` - 開発サーバーを起動
- `npm run build` - 本番用ビルドを作成
- `npm run preview` - ビルド結果をプレビュー
- `npm run lint` - ESLint でコードをチェック

## 🏗 アーキテクチャ

### 状態管理

- **Jotai**を使用したアトミック状態管理
- 各ドメインごとに状態を分離
- グローバル状態の最小化

### API 設計

- **Repository パターン**を採用
- 各エンティティごとにリポジトリを分離
- Axios インターセプターによる認証ヘッダーの自動付与

### リアルタイム通信

- **Socket.IO**を使用したリアルタイムメッセージング
- ワークスペース単位でのイベント購読
- メッセージの送信・削除イベントの処理

### ルーティング

- **React Router**による SPA ルーティング
- 認証状態に基づくリダイレクト
- 動的ルート（`/:workspaceId/:channelId`）

## 🔧 主要な機能の実装

### 認証フロー

1. ユーザー登録/ログイン
2. JWT トークンの取得と保存
3. 自動ログイン状態の確認
4. 認証が必要な API リクエストへの自動ヘッダー付与

### メッセージングフロー

1. ワークスペースへの接続
2. チャンネル選択
3. メッセージの送信・受信
4. リアルタイム更新

### データフロー

1. エンティティクラスによる型安全なデータ管理
2. Repository パターンによる API 抽象化
3. 状態管理による UI 更新

## 🎨 UI/UX

- モダンな Slack ライクなデザイン
- レスポンシブ対応
- 日本語ローカライゼーション
- 直感的なナビゲーション

## 🔒 セキュリティ

- JWT トークンベースの認証
- ローカルストレージでのトークン管理
- HTTPS 通信（本番環境）
- 入力値の検証

## 🚀 デプロイ

### 本番ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

ビルドされたファイルは `dist/` ディレクトリに生成されます。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 📞 サポート

質問や問題がある場合は、Issue を作成してください。

---

**注意**: このアプリケーションは学習目的で作成された Slack クローンです。本番環境での使用には適切なバックエンド API の実装が必要です。
