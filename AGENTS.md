# AGENTS.md — 程式設計學習資料庫開發規範

## 1. 專案目的與定位
本專案是一個**純靜態的程式設計學習資料庫網站**，用於系統化整理程式語言、資料結構、網頁開發與資料庫的學習筆記。
本文件的目的是提供清晰的結構、樣式與開發規範，讓 AI 助手在未來新增筆記、修改頁面或擴充功能時，能夠維持全站風格一致、結構標準化且無需額外建置工具即可直接部署。

---

## 2. 技術棧與環境限制
- **核心技術**：純靜態 HTML5、CSS3、原生 JavaScript（Vanilla JS, ES6+）。
- **零依賴原則**：禁止引入 React、Vue、Tailwind CSS、npm 套件或任何需要打包編譯（Build step）的工具，確保檔案可直接透過瀏覽器開啟並部署至 GitHub Pages。
- **路徑規範**：全站一律使用**相對路徑**（首頁使用 `./`，`notes/` 內的頁面使用 `../`），禁止使用開頭為 `/` 的根目錄絕對路徑。

---

## 3. 資料夾與檔案結構
```text
/
├── AGENTS.md                 # 本專案開發規則書（AI 必讀）
├── index.html                # 網站首頁（總覽、分類篩選、關鍵字搜尋）
├── assets/
│   ├── style.css             # 全站共用樣式表（亮色多層次技術文件風）
│   └── main.js               # 全站共用互動邏輯（分類篩選、搜尋、程式碼一鍵複製）
└── notes/                    # 存放所有單篇學習筆記 HTML 檔案
    └── <category>-<topic>.html
```

### 檔案命名規範
- 所有筆記頁面必須放置於 `notes/` 資料夾內。
- 檔名一律採用 **全英文小寫 + 連字號（kebab-case）**，格式為 `<分類前綴>-<主題名稱>.html`，禁止使用空格或中文字元。
- 合法分類前綴對照表：
  - `cpp-`（對應分類：`C++`）
  - `python-`（對應分類：`Python`）
  - `web-`（對應分類：`Web開發 (HTML/CSS/JS)`）
  - `dsa-`（對應分類：`資料結構與演算法`）
  - `db-`（對應分類：`資料庫`）
  - *範例*：`cpp-static-members.html`、`python-list-comprehension.html`

---

## 4. 視覺風格與設計系統
- **整體風格**：現代亮色技術文件風（白底卡片搭配深藍/靛藍主色，並依知識領域賦予鮮明的分類色彩）。
- **色彩規範（定義於 `assets/style.css` 的 CSS 變數）**：
  - 頁首橫幅（Header）：深藍至靛藍漸層（`linear-gradient(135deg, #1E3A8A 0%, #3730A3 55%, #4F46E5 100%)`）搭配純白文字
  - 頁面底色：`#F1F5F9`（柔和冷灰藍，用來襯托純白卡片的立體感）
  - 卡片與內容區塊底色：`#FFFFFF`（純白），搭配 `#CBD5E1` 邊框與柔和陰影
  - 主要文字色：`#0F172A`（深墨藍），次要說明文字：`#475569`
  - 主強調色與互動狀態：`#1E3A8A`（深藍）與 `#4F46E5`（靛藍）；篩選按鈕選取（Active）狀態採用淺靛藍底色（`#E0E7FF`）搭配深藍文字（`#1E3A8A`）與靛藍外框，保持文字高對比且不反白
  - 程式碼區塊（Code Block）：深色終端機背景 `#0F172A` 搭配高對比淺色字體 `#F8FAFC` 與視窗三色圓點裝飾。

---

## 5. 分類標籤與專屬配色規範
目前全站支援以下 **5 個固定分類**。寫入 HTML `data-category` 屬性、顯示文字以及 `.badge` 的色彩 class 時，必須嚴格遵守以下對照表：

| 分類名稱（`data-category` 與顯示文字） | 標籤 CSS Class | 視覺代表色系 |
| :--- | :--- | :--- |
| `C++` | `badge-cpp` | 寶藍色系（藍底深藍字） |
| `Python` | `badge-python` | 翡翠綠色系（綠底深綠字） |
| `Web開發 (HTML/CSS/JS)` | `badge-web` | 活力珊瑚橘色系（暖橘底深橘字） |
| `資料結構與演算法` | `badge-dsa` | 優雅紫羅蘭色系（淡紫底深紫字） |
| `資料庫` | `badge-db` | 青碧藍綠色系（青底深青字） |

> **規則**：AI 不得自行發明上述 5 項以外的分類名稱；首頁卡片 `.note-card` 只要正確設定 `data-category`，CSS 會自動為卡片頂部加上對應顏色的強調色條。

---

## 6. 單篇筆記頁面結構規範
每一篇位於 `notes/` 的筆記 HTML，必須包含頂部漸層頁首與「返回筆記總覽（`../index.html`）」按鈕，且主內容區 `<main class="note-container">` **必須嚴格依照以下 4 個固定區塊順序撰寫**：

1. **標題資訊區（`.note-header`）**
   - 分類標籤（`<span class="badge badge-<分類>">`）與最後更新日期（`YYYY-MM-DD`）
   - 筆記主標題（`<h1>`）
   - 一句話核心摘要（`.note-summary`）
2. **觀念說明區（`#concept`）**
   - 包覆在 `<section id="concept" class="note-section">` 卡片中，使用條列式（`<ul>` / `<ol>`）或簡短段落清楚解釋核心原理與適用時機。
3. **程式碼範例區（`#example`）**
   - 包覆在 `<section id="example" class="note-section">` 卡片中，提供完整、可執行且附有繁體中文註解的程式碼。
   - 必須使用標準程式碼容器結構（`<div class="code-block">` 包含 `.code-header` 視窗圓點與語言標示、`.copy-btn` 複製按鈕與 `<pre><code>`），以確保 `assets/main.js` 的一鍵複製功能正常運作。
   - 程式碼下方附上逐段或重點解說。
4. **常見錯誤與注意事項（`#pitfalls`）**
   - 包覆在 `<section id="pitfalls" class="note-section">` 卡片中，使用琥珀色警示區塊（`.callout-warning`）列出初學者容易犯的語法錯誤、邏輯盲點或除錯提醒。

---

## 7. 新增筆記標準作業程序（SOP）
當使用者要求「新增一篇關於 X 的筆記」時，AI 必須完整執行以下 **3 個步驟**，缺一不可：

1. **建立筆記檔案**：
   - 依命名規範在 `notes/` 下建立新的 `.html` 檔案。
   - 複製既有筆記（如 `notes/cpp-static-members.html`）的 HTML 骨架，填入符合第 6 節規範的 4 個內容區塊，正確套用對應的 `badge-<分類>` class，並確認引入 `../assets/style.css` 與 `../assets/main.js`。
2. **更新首頁索引（`index.html`）**：
   - 在 `index.html` 的筆記列表容器（`#notes-grid`）中，新增一張對應的筆記卡片（`<article class="note-card" data-category="...">`），內含對應的 `<span class="badge badge-<分類>">`、更新日期、標題、一句話摘要，以及連往 `./notes/<檔名>.html` 的連結。
3. **自我檢查**：
   - 確認檔案路徑大小寫完全一致。
   - 確認 HTML 內的 `<` 與 `>` 符號在 `<code>` 區塊中已正確轉義為 `&lt;` 與 `&gt;`（特別是 C++ 的 `#include <iostream>` 或泛型語法），避免瀏覽器誤判為 HTML 標籤。