import React, { Component } from "react";
import RichEditor from './Form/RichEditor';

class Page extends Component {
  render() {
    let data = `
    {"blocks":[{"key":"eestl","text":"NADPIS","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"328ke","text":" aaa vvvv yyyy","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":5,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"aavv6","text":"eeffefeefrrrrrrryyyyyyyyyyyyyyyy","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":2,"length":4,"style":"UNDERLINE"},{"offset":16,"length":14,"style":"UNDERLINE"},{"offset":9,"length":21,"style":"ITALIC"},{"offset":24,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"5uii7","text":"iiuiuiuiui rrrr","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
    `

    return <div>
      Simple menus open over the anchor element by default (this option can be changed via props). When close to a screen edge, simple menus vertically realign to make all menu items are completely visible.

  Choosing an option should immediately ideally commit the option and close the menu.

  Disambiguation: In contrast to simple menus, simple dialogs can present additional detail related to the options available for a list item or provide navigational or orthogonal actions related to the primary task. Although they can display the same content, simple menus are preferred over simple dialogs because simple menus are less disruptive to the user’s current context.
    <RichEditor
      data={data}
      readOnly
    />
    </div>;
  }
}

export default Page;
