import React, { Component } from "react";
import RichEditor from './RichEditor';

class Page extends Component {
  render() {
    let data = `
    {"blocks":[{"key":"eestl","text":"NADPIS","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"328ke","text":" aaa vvvv yyyy","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":5,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"aavv6","text":"eeffefeefrrrrrrryyyyyyyyyyyyyyyy","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":2,"length":4,"style":"UNDERLINE"},{"offset":16,"length":14,"style":"UNDERLINE"},{"offset":9,"length":21,"style":"ITALIC"},{"offset":24,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"5uii7","text":"iiuiuiuiui rrrr","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
    `

    return <div>
    page
    <RichEditor
      data={data}
      readOnly
    />
    </div>;
  }
}

export default Page;
