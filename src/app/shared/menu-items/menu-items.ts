import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}


let MENUITEMS = [];


let MENUITEMS_ADMIN = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'sub',
        icon: 'ti-home',
        children: [
          {
            state: 'dashboard',
            name: 'Default'
          },
        ]
      }
    ],
  },
  {
    label: 'Tables',
    main: [
      {
        state: 'trainer',
        name: 'Trainer',
        type: 'sub',
        icon: 'ti-widgetized',
        children: [
          {
            state: 'trainerList',
            name: 'Trainer List'
          }
        ]
      },
      {
        state: 'member',
        name: 'Member',
        type: 'sub',
        icon: 'ti-widgetized',
        children: [
          {
            state: 'memberList',
            name: 'Member List'
          }
        ]
      }
    ]
  }
];

let MENUITEMS_MEMBER = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'sub',
        icon: 'ti-home',
        children: [
          {
            state: 'dashboard',
            name: 'Default'
          },
        ]
      }
    ],
  }, {
    label: 'Tables',
    main: [
      {
        state: 'member',
        name: 'Member',
        type: 'sub',
        icon: 'ti-widgetized',
        children: [
          {
            state: 'memberList',
            name: 'Member List'
          }
        ]
      }
    ]
  }
];


let MENUITEMS_TRAINER = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'sub',
        icon: 'ti-home',
        children: [
          {
            state: 'dashboard',
            name: 'Default'
          },
        ]
      }
    ],
  }, {
    label: 'Tables',
    main: [
      {
        state: 'trainer',
        name: 'Trainer',
        type: 'sub',
        icon: 'ti-widgetized',
        children: [
          {
            state: 'trainerList',
            name: 'Trainer List'
          }
        ]
      }
    ]
  }
];




@Injectable()
export class MenuItems {

  getAll(): Menu[] {

    if (localStorage.getItem('user')) {
      if (JSON.parse(localStorage.getItem('user')).role == 1) {
        MENUITEMS = MENUITEMS_TRAINER;
      }
      else if (JSON.parse(localStorage.getItem('user')).role == 2) {
        MENUITEMS = MENUITEMS_MEMBER;
      }
      else {
        MENUITEMS = MENUITEMS_ADMIN;
      }
    }

    return MENUITEMS;

  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
