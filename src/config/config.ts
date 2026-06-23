export interface NavLink {
  name: string
  icon: string
  path?: string
  url?: string
  isFolder: boolean
  isUrl: boolean
  children?: NavLink[]
}
export const NavLinks: NavLink[] = [
  { name: '首页', icon: 'Home', path: '/', isFolder: false, isUrl: false },
  { name: '文章', icon: 'Folders', isFolder: true, isUrl: false, children: [
    { name: '文章列表', icon: 'List', path: '/list', isFolder: false, isUrl: false },
    { name: '归档', icon: 'Archive', path: '/archive', isFolder: false, isUrl: false },
    { name: '分类', icon: 'Folders', path: '/category', isFolder: false, isUrl: false },
  ] },
  { name: '我的', icon: 'User', isFolder: true, isUrl: false, children: [
    { name: '日记', icon: 'Notebook', path: '/diary', isFolder: false, isUrl: false },
    { name: '图库', icon: 'Photo', path: '/gallery', isFolder: false, isUrl: false },
    { name: '赞助', icon: 'Heart', path: '/sponsor', isFolder: false, isUrl: false },
    { name: '关于', icon: 'InfoCircle', path: '/about', isFolder: false, isUrl: false },
  ] },
  { name: '社交', icon: 'Social', isFolder: true, isUrl: false, children: [
    { name: '友链', icon: 'Link', path: '/links', isFolder: false, isUrl: false },
    { name: '留言', icon: 'Message', path: '/guestbook', isFolder: false, isUrl: false },
  ] },
  { name: '主站', icon: 'Sitemap', url: 'https://olivetint.com', isFolder: false, isUrl: true },
]