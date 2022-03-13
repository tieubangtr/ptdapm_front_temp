const Menu = [
  {header: 'Danh mục'},
  {
    title: 'Sách',
    group: 'apps',
    icon: 'book',
    name: 'Book',
    href: '/book'
  },
  {
    title: 'Tác giả',
    group: 'apps',
    name: 'Author',
    icon: 'accessibility',
    href: '/author'
  },
  {
    title: 'Nhà xuất bản',
    group: 'apps',
    icon: 'account_balance',
    name: 'Publisher',
    href: '/publisher'
  },
  {
    title: 'Thể loại',
    group: 'apps',
    name: 'Category',
    icon: 'dns',
    href: '/category'
  },
  {
    title: 'Mượn - trả',
    group: 'apps',
    name: 'Order',
    icon: 'compare_arrows',
    href: '/order'
  },
  {divider: true},
  {header: 'Quản lý người dùng'},
  {
    roles:'admin',
    title: 'Nhân viên',
    group: 'users',
    icon: 'assignment_ind',
    name: 'Employee',
    href: '/user/employee'
  },
  {
    roles:'admin',
    title: 'Độc giả',
    group: 'users',
    name: 'Reader',
    icon: 'face',
    href: '/user/reader'
  },
  {divider: true},
  {header: 'Tài khoản'},
  {
    title: 'Thông tin',
    group: 'account',
    name: 'Account',
    icon: 'account_circle',
    href: '/account'
  },
  {
    title: 'Đổi mật khẩu',
    group: 'account',
    name: 'Changepass',
    icon: 'cached',
    href: '/account/changepass'
  },
  {
    title: 'Đăng xuất',
    group: 'account',
    name: 'Logout',
    icon: 'exit_to_app',
    href: '/logout'
  },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
