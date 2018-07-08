const user = {
  title: "Users",
  form: [
    { name: "name", type: "text" },
    { name: "email", type: "text" },
    {
      name: "roles",
      type: "checklist",
      label: "Roles",
      resource: "role",
      show: "title"
    }
  ],
  list: [{ name: "name", label: "Name" }, { name: "email", label: "Email" }]
};

const article = {
  title: "Articles",
  form: [
    { name: "title", type: "text" },
    { name: "author", type: "text" },
    { name: "content", type: "editor" },
    {
      name: "tags",
      type: "checklist",
      resource: "tag",
      show: "title",
      label: "Tags"
    }
  ],
  list: [{ name: "title" }, { name: "author" }]
};

const menuItem = {
  title: "Menu items",
  form: [
    { label: "Title", name: "title", type: "text" },
    {
      label: "Menu",
      name: "menu_id",
      type: "relation",
      resource: "menu",
      show: "title"
    },
    {
      label: "Page",
      name: "page_id",
      type: "relation",
      resource: "page",
      show: "title"
    },
    {
      label: "Parent",
      name: "parent_id",
      type: "relation",
      resource: "menuItem",
      show: "title"
    }
  ],
  list: [
    { name: "title", label: "Title" },
    {
      name: "parent",
      label: "Parent",
      render: params => params.parent && params.parent.title
    },
    {
      name: "page",
      label: "Page",
      render: params => params.page && params.page.title
    }
  ]
};

const page = {
  title: "Pages",
  form: [
    { label: "Title", help: "Enter title", name: "title", type: "text" },
    { type: "rich-editor", label: "Body", name: "body" }
  ],
  list: [
    {
      name: "title",
      label: "Title"
    }
  ]
};

const hamburg = {
  title: "Pages",
  form: [
    { label: "Title", name: "title", type: "text" },
    { label: "Date", name: "event_date", type: "datepicker" },
    { label: "Notes", type: "textarea", rows: 8, name: "notes" }
  ],
  list: [
    { name: "title", label: "Title" },
    {
      name: "event_date",
      label: "Event date",
      render: row => `${row.event_date}`
    },
    { name: "notes", label: "Notes" }
  ]
};

const tag = {
  title: "Tags",
  form: [{ label: "title", name: "title", type: "text" }],
  list: [{ name: "title", label: "Title" }]
};

const guestbook = {
  title: "Tags",
  form: [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "text" },
    { label: "Message", name: "message", type: "textarea" }
  ],
  list: [{ name: "name", label: "Name" }, { label: "email", name: "email" }]
};

const role = {
  title: "Roles",
  form: [
    { label: "Title", name: "title", type: "text" },
    {
      name: "permissions",
      type: "checklist",
      resource: "permission",
      show: "permission",
      label: "Permissions"
    }
  ],
  list: [{ name: "title", label: "Title" }]
};

const permission = {
  title: "Permissions",
  form: [{ label: "Permission", name: "permission", type: "text" }],
  list: [{ name: "permission", label: "Permission" }]
};

const renderTeaser = row => {
  let message = row.message;
  var div = document.createElement("div");
  div.innerHTML = message;
  message = div.innerText;

  if (message.length > 70) {
    message = message.substr(0, 70) + "...";
  }

  return message;
};

const news = {
  title: "Messages",
  form: [
    { label: "Message", name: "message", type: "rich-editor" },
    { label: "Created", name: "created_at", type: "date" },
    { label: "Published", name: "published", type: "switch" }
  ],
  list: [
    { name: "message", label: "Message", render: renderTeaser },
    { name: "created_at", label: "Created at" }
  ]
};

const models = {
  user,
  page,
  tag,
  article,
  menuItem,
  hamburg,
  role,
  permission,
  news,
  guestbook
};

export default models;
