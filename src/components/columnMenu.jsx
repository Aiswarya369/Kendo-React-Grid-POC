import {
  GridColumnMenuFilter,
  GridColumnMenuCheckboxFilter,
} from "@progress/kendo-react-grid";
import orders from "../utils/orders.json";

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
      <GridColumnMenuCheckboxFilter {...props} data={orders} expanded={true} />
    </div>
  );
};
