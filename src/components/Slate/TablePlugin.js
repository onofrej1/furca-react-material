import { Block } from "slate";
import React, { Component } from "react";
import "./TablePlugin.css";

export default function TablePlugin(onChange) {
  const tablePlugin = {
    addRowTop: function(editorState) {
      tablePlugin.addRow("top", editorState);
    },
    addRowBottom: function(editorState) {
      tablePlugin.addRow("bottom", editorState);
    },
    addColumnLeft: function(editorState) {
      tablePlugin.addColumn("left", editorState);
    },
    addColumnRight: function(editorState) {
      tablePlugin.addColumn("right", editorState);
    },
    deleteRow: function(value) {
      const document = value.document;
      let block = value.blocks.first();
      let change = value.change();

      let row = document.getClosestBlock(block.key);
      let table = document.getClosest(row.key, node => node.type === "table");
      let rowIndex = table.nodes.findKey(node => node.key == row.key);

      change.removeNodeByKey(row.key);
      onChange(change);
    },
    deleteColumn: function(value) {
      const document = value.document;
      let cell = value.blocks.first();
      let change = value.change();

      let row = document.getClosestBlock(cell.key);
      let table = document.getClosest(row.key, node => node.type === "table");

      let cellIndex = row.nodes.findKey(node => node.key == cell.key);

      for (let tableRow of table.nodes.values()) {
        cell = tableRow.nodes.get(cellIndex);
        change.removeNodeByKey(cell.key);
      }
      onChange(change);
    },

    addRow: function(position, value) {
      const document = value.document;
      let block = value.blocks.first();
      let change = value.change();

      let row = document.getClosestBlock(block.key);
      let table = document.getClosest(row.key, node => node.type === "table");
      let rowIndex = table.nodes.findKey(node => node.key == row.key);

      let cells = [];
      for (var i = 0; i < row.nodes.size; i++) {
        let cell = Block.create({
          type: "table-cell"
        });
        cells.push(cell);
      }

      let newRow = Block.create({
        type: "table-row",
        nodes: cells
      });

      rowIndex = position == "top" ? rowIndex : rowIndex + 1;
      change.insertNodeByKey(table.key, rowIndex, newRow);
      onChange(change);
    },
    addColumn: function(position, value) {
      const document = value.document;
      let cell = value.blocks.first();
      let change = value.change();

      let row = document.getClosestBlock(cell.key);
      let table = document.getClosest(row.key, node => node.type === "table");

      let cellIndex = row.nodes.findKey(node => node.key == cell.key);
      cellIndex = position == "left" ? cellIndex : cellIndex + 1;

      for (let tableRow of table.nodes.values()) {
        let cell = Block.create({
          type: "table-cell"
        });
        change.insertNodeByKey(tableRow.key, cellIndex, cell);
      }

      onChange(change);
    },
    renderNode: props => {
      const {
        attributes,
        children,
        node,
        editor: { value: editorValue }
      } = props;

      const ctxMenuItems = [
        {
          menu: "Insert row top",
          action: () => tablePlugin.addRowTop(editorValue) },
        {
          menu: "Insert row bottom",
          action: () => tablePlugin.addRowBottom(editorValue)
        },
        {
          menu: "Insert column left",
          action: () => tablePlugin.addColumnLeft(editorValue)
        },
        {
          menu: "Insert column right",
          action: () => tablePlugin.addColumnRight(editorValue)
        },
        {
          menu: "Delete row",
          action: () => tablePlugin.deleteRow(editorValue)
        },
        {
          menu: "Delete column",
          action: () => tablePlugin.deleteColumn(editorValue)
        }
      ];

      const renderCtxMenu = () => (
        <div
          id="tableCtxMenu"
          className="border border-white p-0 color-white bg-black hidden"
        >
          {ctxMenuItems.map(menuItem => {
            return (
              <p className="border-b-2 border-solid border-white">
                <span className="m-3" onClick={menuItem.action}>
                  {menuItem.menu}
                </span>
              </p>
            );
          })}
        </div>
      );

      switch (node.type) {
        case "table":
          return (
            <div>
              <table
                onContextMenu={tablePlugin.onContextMenu}
                className="border-collapse"
                id="notepad"
              >
                <tbody {...attributes}>{children}</tbody>
              </table>
              {renderCtxMenu()}
            </div>
          );
        case "table-row":
          return <tr {...attributes}>{children}</tr>;
        case "table-cell":
          return (
            <td className="border" style={{ minWidth: "1em" }} {...attributes}>
              {children}
            </td>
          );
      }
    },
    onContextMenu: function(e) {
      console.log("context menu");
      e.preventDefault();
      var ctxMenu = document.getElementById("tableCtxMenu");
      ctxMenu.style.display = "block";
      ctxMenu.style.left = e.pageX + "px";
      ctxMenu.style.position = "absolute";
      ctxMenu.style.zIndex = 1;
      ctxMenu.style.top = e.pageY + 20 + "px";
      ctxMenu.onmouseleave = e => {
        e.target.style.display = "none";
      };
    }
  };

  return tablePlugin;
}
