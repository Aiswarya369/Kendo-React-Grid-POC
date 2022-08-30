import * as React from "react";
import {
  GridColumnMenuFilter,
  GridColumnMenuCheckboxFilter,
} from "@progress/kendo-react-grid";
import products from "../utils/products.json";
export const ColumnMenu = (props) => {
  return (
    <div>
      <GridColumnMenuFilter {...props} expanded={true} />
    </div>
  );
};
export const ColumnMenuCheckboxFilter = (props) => {
  return (
    <div>
      <GridColumnMenuCheckboxFilter
        {...props}
        data={products}
        expanded={true}
      />
    </div>
  );
};
