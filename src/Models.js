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
      render: params => `${params.item.event_date}`
    },
    { name: "notes", label: "Notes" }
  ]
};

const tag = {
  title: "Tags",
  form: [{ label: "title", name: "title", type: "text" }],
  list: [{ name: "title", label: "Title" }]
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

const models = {
  user,
  page,
  tag,
  article,
  menuItem,
  hamburg,
  role,
  permission
};

export default models;
