import {Component} from '@angular/core';

@Component({
  selector: 's-menu',
  templateUrl: './menu.html'
})
export class MenuComponent {
  // its just list data from here down
  items = [{
    title: 'childless',
    children: []
  }, {
    title: 'great grandparent',
    children: [{
      title: 'childless grandsibiling',
      children: []
    }, {
      title: 'grandparent',
      children: [{
        title: 'childless sibiling',
        children: []
      }, {
        title: 'another childless sibiling',
        children: []
      }, {
        title: 'parent',
        children: [{
          title: 'child',
          children: []
        }, {
          title: 'another child',
          children: []
        },]
      }, {
        title: 'another parent',
        children: [{
          title: 'child',
          children: []
        },]
      },]
    }, {
      title: 'another grandparent',
      children: [{
        title: 'parent',
        children: [{
          title: 'child',
          children: []
        }, {
          title: 'another child',
          children: []
        }, {
          title: 'a third child',
          children: []
        }, {
          title: 'teen mother',
          children: [{
            title: 'accident',
            children: []
          }]
        }]
      }]
    }]
  }];

  selectionNode(event, item) {
    alert(item.title);
    event.stopPropagation();
  }
}
