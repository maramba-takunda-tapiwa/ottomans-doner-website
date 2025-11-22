export type MenuItem = { id: string; name: string; desc: string; price: string; img?: string };
export type MenuCategory = { key: string; title: string; items: MenuItem[] };

export const MENU: MenuCategory[] = [
  {
    key: 'doner',
    title: 'Döner',
    items: [
      { id: 'durum', name: 'Dürüm', desc: 'Tortilla csirkével vagy marhával, zöldségekkel és választható szószokkal / Tortilla with chicken or beef, veggies & chosen sauces.', price: '2500 Ft', img: '/images/durum.jpeg' },
      { id: 'doner', name: 'Döner', desc: 'Friss Török pita csirkével vagy marhával, zöldségekkel és szószokkal / Fresh Turkish bread with chicken or beef, veggies & sauces.', price: '2500 Ft', img: '/images/doner.jpeg' },
      { id: 'doner-tal', name: 'Döner tál', desc: 'Egy tányér étel csirkével vagy marhával, zöldségekkel és választható szószokkal / Plate with chicken or beef, veggies & sauces.', price: '3800 Ft', img: '/images/donor box.jpeg' },
      { id: 'doner-box', name: 'Döner box', desc: 'Doboz étel csirkével vagy marhával, zöldségekkel és választható szószokkal / Box with chicken or beef, veggies & sauces.', price: '2500 Ft', img: '/images/donor box.jpeg' },
      { id: 'currywurst-fries', name: 'Currywurst + Fries', desc: 'Német kolbász sült krumplival és házi currywurst szósszal / German sausage with fries & house currywurst sauce.', price: '2400 Ft', img: '/images/currywurst.jpeg' }
    ]
  },
  {
    key: 'menu-combos',
    title: 'Menü',
    items: [
      { id: 'durum-menu', name: 'Dürüm menü', desc: 'Sült krumplival és 330ml üdítővel / With fries & 330ml drink.', price: '3200 Ft', img: '/images/durum-menu-dish.jpeg' },
      { id: 'doner-menu', name: 'Döner menü', desc: 'Sült krumplival és 330ml üdítővel / With fries & 330ml drink.', price: '3200 Ft', img: '/images/donor box.jpeg' },
      { id: 'curry-menu', name: 'Curry wurst menü', desc: 'Fries + 330ml drink combo.', price: '2700 Ft', img: '/images/currywurst.jpeg' }
    ]
  },
  {
    key: 'sides',
    title: 'Köretek',
    items: [
      { id: 'belga-fries', name: 'Belga Fries', desc: 'Belgian style crispy fries.', price: '900 Ft', img: '/images/fries.jpeg' }
    ]
  }
];
