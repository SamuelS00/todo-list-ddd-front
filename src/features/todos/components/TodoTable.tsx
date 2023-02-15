import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Results, Todo } from "../../../types/Todo";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void;
  handleChecked: (todo: Todo) => void;
};

interface GridRowsProps {
  id: string;
  title: string;
  priority: number;
  description: string | null;
  is_scratched: boolean;
  created_at: Date | null;
}

export function TodoTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,

  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
  handleChecked,
}: Props) {
  const gridToolbarComponentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      renderHeader: () => renderCustomHeader("Title"),
      flex: 20,
      renderCell: renderTitleCell,
    },
    {
      field: "priority",
      renderHeader: () => renderCustomHeader("Priority"),
      flex: 20,
      renderCell: renderPriorityCell,
    },
    {
      field: "description",
      renderHeader: () => renderCustomHeader("Description"),
      flex: 40,
      renderCell: renderDefaultCell,
    },
    {
      field: "created_at",
      renderHeader: () => renderCustomHeader("Created At"),
      flex: 20,
      renderCell: renderCreatedAtCell,
    },
    {
      field: "action",
      renderHeader: () => renderCustomHeader("Actions"),
      flex: 20,
      renderCell: renderActionsCell,
    },
  ];

  function renderCustomHeader(header: string) {
    return (
      <Typography color={"primary"} fontWeight={500}>
        {header}
      </Typography>
    );
  }

  function renderDefaultCell(rowData: GridRenderCellParams) {
    return <Typography color="primary">{rowData.value}</Typography>;
  }

  function renderTitleCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={"primary"}>{rowData.value}</Typography>
    );
  }

  function renderPriorityCell(rowData: GridRenderCellParams) {
    let priority: string;

    switch (rowData.value) {
      case 1:
        priority = 'Low'
        break
      case 2:
        priority = 'Medium'
        break
      default:
        priority = 'High'
        break
    }

    return (
      <Typography color="primary">
        { priority }
      </Typography>
    );
  }

  function renderCreatedAtCell(rowData: GridRenderCellParams) {
    return (
      <Typography color="primary">
        {new Date(rowData.value).toLocaleDateString("pt-BR")}
      </Typography>
    );
  }

  function renderActionsCell(rowData: GridRenderCellParams) {   
    return (
      <>
        <Checkbox
          color="primary"
          checked={rowData.row.is_scratched}
          onChange={() => handleChecked(rowData.row)}
          data-testid="checkbox-action"
        />

        <IconButton
          color="secondary"
          onClick={() => handleDelete(rowData.row.id)}
          aria-label="delete"
          data-testid="delete-action"
        >
          <DeleteIcon />
        </IconButton>

        <Link
          style={{ textDecoration: "none" }}
          to={`/todos/edit/${rowData.id}`}
        >
          <IconButton
            color="primary"
            aria-label="edit"
            data-testid="edit-action"
          >
            <EditIcon />
          </IconButton>
        </Link>
      </>
    );
  }

  const rows: GridRowsProps[] = data ? mapDataToGridRows(data) : [];

  function mapDataToGridRows(results: Results) {
    return results.data.map((todo) => ({
      id: todo.id,
      title: todo.title,
      priority: todo.priority,
      description: todo.description,
      is_scratched: todo.is_scratched,
      created_at: todo.created_at,
    }));
  }

  const rowCount = data?.meta?.total ?? 0;

  return (
    <Box sx={{ display: "flex", height: 500 }}>
      <DataGrid
        rows={rows}
        pagination={true}
        columns={columns}
        pageSize={perPage}
        rowCount={rowCount}
        loading={isFetching}
        filterMode={"server"}
        paginationMode={"server"}
        checkboxSelection={false}
        disableColumnFilter={true}
        getRowHeight={() => "auto"}
        disableColumnSelector={true}
        disableDensitySelector={true}
        disableSelectionOnClick={true}
        rowsPerPageOptions={rowsPerPage}
        onPageChange={handleOnPageChange}
        components={{ Toolbar: GridToolbar }}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
        componentsProps={gridToolbarComponentsProps}
      />
    </Box>
  );
}