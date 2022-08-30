import * as React from "react";

import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";

import { ExcelExport } from "@progress/kendo-react-excel-export";
import { ColumnMenu, ColumnMenuCheckboxFilter } from "./components/columnMenu";

import { IntlService } from "@progress/kendo-react-intl";

import { process } from "@progress/kendo-data-query";
import orders from "./utils/orders.json";

const DATE_FORMAT = "yyyy-mm-dd hh:mm:ss.SSS";
const intl = new IntlService("en");
orders.forEach((o) => {
  o.orderDate = intl.parseDate(
    o.orderDate ? o.orderDate : "20/20/2020",
    DATE_FORMAT
  );
  o.shippedDate = o.shippedDate
    ? undefined
    : intl.parseDate(
        o.shippedDate ? o.orderDate.toString() : "20/20/2020",
        DATE_FORMAT
      );
});

const App = () => {
  const [dataState, setDataState] = React.useState({
    skip: 0,
    take: 20,
    group: [
      {
        field: "orderDate",
      },
    ],
  });

  const [dataResult, setDataResult] = React.useState(
    process(orders, dataState)
  );

  const dataStateChange = (event) => {
    setDataResult(process(orders, event.dataState));
    setDataState(event.dataState);
  };

  const expandChange = (event) => {
    const isExpanded =
      event.dataItem.expanded === undefined
        ? event.dataItem.aggregates
        : event.dataItem.expanded;
    event.dataItem.expanded = !isExpanded;
    setDataResult({ ...dataResult });
  };

  const exportExcel = () => {
    _export.save();
  };

  let _export;

  return (
    <div style={{ margin: "24px" }}>
      <ExcelExport
        data={orders}
        ref={(exporter) => {
          _export = exporter;
        }}
      >
        <Grid
          style={{ height: "90vh" }}
          groupable={true}
          pageable={{
            buttonCount: 4,
            pageSizes: true,
          }}
          data={dataResult}
          {...dataState}
          onDataStateChange={dataStateChange}
          expandField="expanded"
          onExpandChange={expandChange}
        >
          <GridToolbar style={{ backgroundColor: "#fff" }}>
            <button
              title="Export to Excel"
              className="k-button k-button-md"
              onClick={exportExcel}
              style={{
                marginLeft: 12,
                backgroundColor: "#fff",
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                color: "black",
              }}
            >
              Export to Excel
            </button>

            <button
              title="Export to Excel"
              className="k-button k-button-md"
              style={{
                marginLeft: 12,
                backgroundColor: "#fff",
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                color: "black",
              }}
            >
              Save Layout
            </button>
            <button
              title="Export to Excel"
              className="k-button k-button-md"
              style={{
                marginLeft: 12,
                backgroundColor: "#fff",
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                color: "black",
              }}
            >
              Delete Layout
            </button>
          </GridToolbar>
          <GridColumn
            locked={true}
            field="orderID"
            filter={"numeric"}
            columnMenu={ColumnMenu}
            title="ID"
            width="90px"
          />
          <GridColumn
            locked={true}
            field="customerID"
            title="Customer ID"
            width="200px"
            columnMenu={ColumnMenuCheckboxFilter}
          />
          <GridColumn
            field="orderDate"
            title="Order Date"
            filter="date"
            format="{0:D}"
            width="300px"
            columnMenu={ColumnMenu}
          />
          <GridColumn
            field="shipName"
            title="Ship Name"
            width="280px"
            columnMenu={ColumnMenuCheckboxFilter}
          />
          <GridColumn
            field="freight"
            filter="numeric"
            title="Freight"
            width="200px"
            columnMenu={ColumnMenu}
          />
          <GridColumn
            field="shippedDate"
            filter="date"
            title="Ship Date"
            format="{0:D}"
            width="300px"
            columnMenu={ColumnMenu}
          />
          <GridColumn
            field="employeeID"
            title="Employee ID"
            filter="numeric"
            width="200px"
            columnMenu={ColumnMenu}
          />
        </Grid>
      </ExcelExport>
    </div>
  );
};

export default App;
