// import 'vant/lib/index.css' // 引入vant全局样式
// export { Button, Cell, List, Toast, Dialog, Field, Row, Col, Form, Uploader, RadioGroup, Radio, PullRefresh, Empty, Divider, Popup, DropdownMenu, DropdownItem, DatetimePicker, Picker, ActionSheet } from 'vant' // 按需引入vant组件

// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, Cell, List, Skeleton, Empty, Grid, GridItem, PullRefresh, Tabs, Tab, Search, Icon, NavBar, Sticky, Tabbar, TabbarItem, SwipeCell, Card, Image as VanImage, Lazyload, Dialog, RadioGroup, Radio, Tag, Popup } from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List).use(PullRefresh).use(Skeleton).use(Empty).use(Grid).use(GridItem).use(Tabs).use(Tab).use(Search).use(Icon).use(NavBar).use(Sticky)
Vue.use(Tabbar)
Vue.use(TabbarItem).use(SwipeCell).use(Card).use(VanImage).use(Lazyload, { lazyComponent: false }).use(Dialog).use(Popup).use(RadioGroup).use(Radio).use(Tag)
