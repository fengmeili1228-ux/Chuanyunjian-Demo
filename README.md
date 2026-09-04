# 穿云箭 Chuanyunjian Demo

标签名片与需求匹配 MVP 项目。

> 标签即名片，名片即传播入口；用户发布即时需求后，平台基于标签匹配度、地理距离、在线状态寻找附近合适的技能方。

## 技术栈

- 前端：React 18 + TypeScript + Vite + Tailwind CSS + Axios + dnd-kit
- 后端：Spring Boot 3.x + MyBatis-Plus + Java 17
- 数据库：MySQL 8
- 缓存：Redis 7
- 构建：Maven / npm

## 项目结构

```text
.
├── backend/          Spring Boot 后端
│   ├── src/main/java/com/chuanyunjian/
│   └── src/main/resources/
├── frontend/         React + TypeScript 前端
│   └── src/
├── docker-compose.yml
└── README.md
```

## 环境要求

- Java 17+
- Node.js 18+
- Maven 3.8+
- Docker & Docker Compose

## 启动 MySQL / Redis

如果你已在本机安装 MySQL / Redis，请确保：

- MySQL 端口：`3306`，root 密码与 `application.yml` 中一致
- Redis 端口：`6379`，无密码

也可使用 Docker 启动：

```bash
docker compose up -d
```

默认 root 密码：`root8.0`。

## 启动后端

如果你的本机 MySQL root 密码不同，直接在 `backend/src/main/resources/application.yml` 中修改 `spring.datasource.password`。

后端默认运行在 http://localhost:8080

首次启动会自动执行 `schema.sql` 与 `data.sql` 初始化数据库和 Mock 数据。

> 说明：`schema.sql` 会先创建 `chuanyunjian` 数据库，因此 `application.yml` 中的 JDBC URL 不指定具体数据库，确保首次启动也能成功建库。

## 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端默认运行在 http://localhost:5173

开发模式下已配置代理，API 请求会自动转发到 `http://localhost:8080`。

如需手动指定后端地址，可在 `frontend/.env.local` 中配置：

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

## API 文档

后端集成 SpringDoc OpenAPI，启动后访问：

```text
http://localhost:8080/swagger-ui/index.html
```

## Demo 演示流程

### 1. 创建名片

- 打开首页 http://localhost:5173
- 输入姓名（如：张三）和职业（如：汽车维修）
- 点击「智能推荐标签」
- 选择或取消推荐标签，也可在标签树中手动选择
- 拖拽调整标签顺序
- 点击「生成我的名片」

### 2. 分享裂变

- 进入名片页后点击「分享我的名片」
- 选择微信 / 钉钉 / 朋友圈 / 复制链接
- 每分享一次，分享计数 +1
- 达到 3/3 后显示「🎉 已解锁优先匹配权」

### 3. 发布即时需求

- 进入「发布需求」页面
- 填写需求标题、选择需求标签、预算、时效、位置
- 点击「立即发布」

### 4. 查看匹配结果

- 发布后自动跳转到匹配结果页
- 系统根据标签重合率、距离、在线状态计算匹配分
- 展示 Top 10 技能方，按匹配分从高到低排序

## 匹配算法

```text
matchScore = tagMatchScore * 0.60 + distanceScore * 0.25 + onlineScore * 0.15
```

- 标签匹配：重合标签数 / 需求标签总数 * 100（权重 60%）
- 距离评分：
  - 0 ~ 2 km：100
  - 2 ~ 3 km：80
  - 3 ~ 5 km：50
  - > 5 km：20
  - > 10 km：过滤
- 在线评分：在线 100，离线 40（权重 15%）

距离使用 Haversine 公式计算。

## Open Graph

分享页面路径：`/share/card/:id`

Demo 在页面 head 中动态注入：

```html
<meta property="og:title" content="张三｜汽车维修专家">
<meta property="og:description" content="汽车维修 · 电瓶更换 · 轮胎修补">
<meta property="og:image" content="...">
```

当前为前端 SPA 模拟实现，供浏览器预览使用。生产环境可通过服务端 SSR / Next.js / 后端动态 HTML 实现真正的社交平台分享卡片。

## 后续生产环境优化

- 接入真正微信 / 钉钉分享 SDK
- 消息推送与即时通讯
- Redis 在线状态集群化与心跳机制完善
- 更复杂的标签相似度与技能图谱
- 接入地图服务（高德 / 腾讯地图）
- 用户认证与权限体系
- 订单与支付系统
- 消息系统

## 开发说明

- 后端 Controller 只负责接口入口，核心业务逻辑在 Service
- 统一返回结构 `Result<T>`，全局异常处理
- 标签列表读取时优先使用 Redis 缓存 `tag:tree`
- 用户在线状态通过 Redis `user:online:{userId}` 判断，支持 MySQL `online_status` fallback
