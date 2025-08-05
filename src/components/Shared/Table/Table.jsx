import { useEffect, useRef } from "react";
import s from "./style.module.scss";
import classNames from "classnames";

export const Table = ({ header, body, tr, disabledRow = () => false, onClickRow, activeRow = () => false }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    const syncHeaderWidths = () => {
      const table = tableRef.current;
      if (!table) return;

      const bodyRow = table.querySelector("tbody tr");
      if (!bodyRow) return;

      const bodyCells = Array.from(bodyRow.children);
      const colWidths = bodyCells.map((cell) => cell.offsetWidth);

      const headerRow = table.querySelector("thead tr");
      if (!headerRow) return;

      Array.from(headerRow.children).forEach((cell, i) => {
        cell.style.width = `${colWidths[i]}px`;
      });
    };

    syncHeaderWidths();
    window.addEventListener("resize", syncHeaderWidths);

    return () => {
      window.removeEventListener("resize", syncHeaderWidths);
    };
  }, []);

  return (
    <div className={s.container}>
      <table ref={tableRef} className={s.table}>
        <thead>
          <tr>
            {header.map((h, i) => (
              <th key={"head-" + i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, i) => (
            <tr
              key={"row-" + i}
              onClick={() => onClickRow(r)}
              className={classNames(disabledRow(r) ? s.disabled : "", activeRow(r) ? s.active : "")}
            >
              {tr(r)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};