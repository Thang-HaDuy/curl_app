# curl_app
## `I. Các bước cần làm:`
### I.1 be
1. Clone code
2. Chạy câu lệnh: npm i
3. Chạy dự án: npm run dev
### I.1 fe
1. Clone code
2. Mở VSCode
3. Chạy liveServer cài VSCode


&nbsp;

 ## `II.Các endpoint (apis) sử dụng:`
 ```
1. Lấy tất cả blogs:
GET    /blogs

2. Lấy blog theo id
GET    /blogs/:id

ví dụ: GET    /blogs/1

3. Tạo mới 1 blog
POST   /blogs
body truyền lên object { title, author, content}

4. Cập nhật 1 blog
PUT /blogs/:id
body truyền lên object { title, author, content}

ví dụ: PUT /blogs/1

5. Xóa 1 blog
DELETE  /blogs/:id

ví dụ: DELETE   /blogs/1

6. Khởi tạo data:
GET    /seed-data
```

### `III.Về Tác Giả`
`Tác giả: Thang HaDuy`