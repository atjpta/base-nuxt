## `Nghịch Code`

`Nghịch code`: Blog công nghệ dành riêng cho ae dev đam mê viết lách, tìm hiểu công nghệ mới.

- Dự án được khởi đầu bởi những thanh niên đam mê công nghệ, muốn tìm ra con đường của bản thân trong thế giới lập trình đầy khó khăn này.
- Ở đây không có những kỹ thuật phức tạp, mà chỉ tập trung vào những điều cơ bản, hãy coi đây như một cuốn sổ tay note lại những kiến thức, những hướng đi đúng đắn trên con đường lập trình của bạn!
- Với các module nào cần chú ý sẽ có file `readme.md` riêng cho module đó.
- Với source này thì chỉ là base, có sẵn các chức năng cơ bản mà mọi server đều sẽ cần sử dụng, để có thể dễ dàng phát triển, mở rộng ra các project khác, cụ thể hơn.
- hi vọng với source này có thể giúp cho các bạn thực hiện các project lớn hơn và thành công hơn ^^!

- link demo : https://base-nuxt-theta.vercel.app/
- đây là dự án base frontend, có thể xem thêm dự án base backend tại đây https://github.com/atjpta/base-nest
- dự án sẽ dúng các api có trong base backend trên

## Công nghệ

- `Backend`: NestJs
- `Database`: MongoDb
- `Frontend`: NuxtJs, Angular

## Hướng dẫn chạy dự án

- Tải các thư viện về máy tính:

```bash
npm i
```

- Chạy dự án

```bash
npm run dev
```

## Cấu trúc source code

- Dự án gồm 2 nhánh chính:

  - `master`: nhánh code chính, tập trung các chức năng đã ổn định để có thể deploy (có thể dùng fork ra git mới để deloy)
  - `dev`: nhánh thử nghiệm những chức năng mới, chạy được nhưng chưa kiểm thử

- Các bước bắt đầu một feature mới:

  - `checkout dev`: Chuyển sang nhánh dev.
  - `git pull origin dev`: Pull code từ dev về (cập nhập code mới nhất từ dev)
  - `checkout -b [feature-name]`: clone source từ dev sang [feature-name]
  - Coding trên [feature-name]
  - Upload code lên remote.
  - Tạo merge request qua nhánh dev.

- Merge dev vào master: các chức năng cần phải hoạt động oke mới merge sang master

## Các chức năng trong dự án.

- Hệ thống đang sử dụng các công nghệ sau

  - i18n: dùng để thiết kế đa ngôn ngữ.
  - tailwindCss + daisyUI: dùng để thiết kế giao diện.
  - pinia: dùng để quản lí trạng thái các biế
  - fortawesome: sử dủng icon của fortawesome
  - theme-change: thay đổi theme hệ thống
  - vee-validate + Yup: để kiểm tra kiểu dữ liệu from
  - dayjs: xứ lí time

- các chức năng hiện có của hệ thống

  - chia sẵn layout header + reponsive
  - base service theo mẫu base nest
  - hệ thống login
  - đổi mật khẩu
  - chuyển theme, ngôn ngữ

- các chức năng trong tương lai
  - ....

## Note

- Ghi chú lại các vấn đề gặp phải trong quá trình phát triển dự án.
