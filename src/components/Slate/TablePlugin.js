import { Block } from "slate";
import React, { Component } from "react";

export default function TablePlugin(value, onChange) {
  const tablePlugin = {
    addRowTop: function() {
      console.log('add top');
      tablePlugin.addRow("top");
    },
    addRowBottom: function() {
      tablePlugin.addRow("bottom");
    },
    addColumnLeft: function() {
      tablePlugin.addColumn("left");
    },
    addColumnRight: function() {
      tablePlugin.addColumn("right");
    },
    addRow: function(position) {
      const document = value.document;
      let block = value.blocks.first();
      let change = value.change();

      let row = document.getClosestBlock(block.key);
      console.log(row);
      let table = document.getClosest(row.key, node => node.type === "table");
      console.log(table);
      let rowIndex = table.nodes.findKey(node => node.key == row.key);
      console.log(rowIndex);
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
      console.log(newRow);
      rowIndex = position == "top" ? rowIndex : rowIndex + 1;
      change.insertNodeByKey(table.key, rowIndex, newRow);
      change.insertText('aaaaabb');
      onChange(change);
      console.log(row.nodes.size);
    },
    addColumn: function(position) {
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
      const { attributes, children, node } = props;

      const renderCtxMenu = () => (
        <div id="tableCtxMenu" className="border p-2 color-white bg-black hidden">
          <p className="border-b-1 border-white"><span onClick={tablePlugin.addRowTop}>Insert row top</span></p>
          <p className="border-b-1 border-white">Insert row bottom</p>

        </div>
      );

      switch (node.type) {
        case "table":
          return (

              <table
                className="border-collapse"
                id="notepad"
              >
                <tbody {...attributes}>{children}</tbody>
              </table>

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
      e.preventDefault();

      e.preventDefault();
      var ctxMenu = document.getElementById("tableCtxMenu");
      ctxMenu.style.display = "block";
      ctxMenu.style.left = e.pageX + "px";
      ctxMenu.style.position = "absolute";
      ctxMenu.style.top = e.pageY + 20 + "px";
      ctxMenu.onmouseleave = e => {
        e.target.style.display = "none";
      };
    }
  };

  return tablePlugin;
}
