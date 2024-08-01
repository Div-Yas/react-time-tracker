import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTable, usePagination, Column } from "react-table";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getTasks } from "../redux/taskSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  TextField,
  Button as MuiButton,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Modal from "react-modal";

const TasksText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  height: 70vh;
  flex-direction: column;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

interface ButtonProps {
  bgColor?: string;
}

const Button = styled.button<ButtonProps>`
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.bgColor || "#4CAF50"};
  color: white;
`;

interface Task {
  id: number;
  project: string;
  task: string;
  time: string;
  date: string;
  status: string;
  remarks: string;
}

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  font-size: 20px;
`;

interface FormData {
  id: number;
  project: string;
  task: string;
  time: string;
  date: string;
  status: string;
  remarks: string;
}

const Tasks: React.FC = () => {
  const [data, setData] = useState<Task[]>([]);
  const dispatch = useAppDispatch();
  const { data: tasks, loading } = useAppSelector((state: any) => state.task);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const initialFormData: FormData = {
    id: 0,
    project: "",
    task: "",
    time: "",
    date: "",
    status: "",
    remarks: "",
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks) {
      setData(tasks);
    }
  }, [tasks]);

  const columns: Column<Task>[] = React.useMemo(
    () => [
      { Header: "Project", accessor: "project" },
      { Header: "Task", accessor: "task" },
      { Header: "Time", accessor: "time" },
      { Header: "Date", accessor: "date" },
      { Header: "Status", accessor: "status" },
      { Header: "Remarks", accessor: "remarks" },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }: { row: any }) => (
          <>
            <Button
              bgColor="#ff9800"
              onClick={() => openEditModal(row.original)}
            >
              <FaEdit />
            </Button>
            <Button
              bgColor="#f44336"
              onClick={() => handleDelete(row.original.id)}
            >
              <FaTrash />
            </Button>
          </>
        ),
      },
    ],
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Task>({ columns, data }, usePagination);

  const openAddModal = () => {
    setFormData(initialFormData);
    setModalIsOpen(true);
  };

  const openEditModal = (task: Task) => {
    setFormData(task);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setFormData(initialFormData);
    setModalIsOpen(false);
  };

  const handleDelete = (id: number) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProjectChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      project: event.target.value as string,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: date ? date.format("YYYY-MM-DD") : "",
    }));
  };

  const saveTask = () => {
    closeModal();
  };

  return (
    <>
      <TasksText>
        <Typography sx={{ fontWeight: "700" }}>Task List</Typography>
        <ButtonContainer>
          <Button onClick={openAddModal}>
            <FaPlus /> Add Task
          </Button>
        </ButtonContainer>
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Task Modal"
        >
          <style>
            {`
          .ReactModal__Overlay {
            background-color: rgba(0, 0, 0, 0.5);
          }

          .ReactModal__Content {
            width: 600px;
            margin: auto;
            padding: 20px;
          }
        `}
          </style>

          <h2>{formData.id ? "Edit Task" : "Add Task"}</h2>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Task"
                  name="task"
                  value={formData.task}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Project</InputLabel>
                  <Select
                    label="Project"
                    name="project"
                    value={formData.project}
                    onChange={(event) =>
                      handleProjectChange(
                        event as React.ChangeEvent<{ value: unknown }>
                      )
                    }
                  >
                    <MenuItem value="project1">project1</MenuItem>
                    <MenuItem value="project2">project2</MenuItem>
                    <MenuItem value="project3">project3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <DesktopDatePicker
                  label="Date"
                  sx={{ marginTop: 2 }}
                  value={dayjs(formData.date)}
                  onChange={handleDateChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="flex-end"
                style={{ marginTop: "10px" }}
              >
                <Grid item>
                  <MuiButton
                    variant="contained"
                    color="primary"
                    onClick={saveTask}
                  >
                    Save
                  </MuiButton>
                </Grid>
                <Grid item>
                  <MuiButton
                    variant="outlined"
                    color="secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </MuiButton>
                </Grid>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Modal>
      </TasksText>
    </>
  );
};

export default Tasks;
