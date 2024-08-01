import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTable, usePagination, Column } from "react-table";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import Modal from "react-modal";
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

const ProjectText = styled.div`
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

interface ButtonProps {
  bgColor?: string;
}

const StyledButton = styled.button<ButtonProps>`
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.bgColor || "#4CAF50"};
  color: white;
`;

const Button = styled.button<ButtonProps>`
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.bgColor || "#4CAF50"};
  color: white;
`;

const ButtonContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  font-size: 20px;
`;

interface Project {
  name: string;
  client: string;
  tracked: string;
  amount: string;
  progress: string;
  access: string;
}

interface FormData {
  name: string;
  client: string;
  tracked: Dayjs | null;
  amount: string;
  progress: string;
  access: string;
}

const Projects: React.FC = () => {
  const [data, setData] = useState<Project[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const initialFormData: FormData = {
    name: "",
    client: "",
    tracked: null,
    amount: "",
    progress: "",
    access: "",
  };
  const [loading, setLoading] = useState(true);
  const [heading, setHeading] = useState("");
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClientChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      client: event.target.value as string,
    }));
  };

  const handleTrackedChange = (newValue: Dayjs | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tracked: newValue,
    }));
  };

  useEffect(() => {
    axios
      .get("https://api.jsonbin.io/v3/b/66aa5da9e41b4d34e419c6c2")
      .then((response) => {
        setData(response.data.record);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns: Column<Project>[] = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Client", accessor: "client" },
      { Header: "Tracked", accessor: "tracked" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Progress", accessor: "progress" },
      { Header: "Access", accessor: "access" },
      {
        Header: "Actions",
        accessor: (row, index) => (
          <>
            <StyledButton bgColor="#ff9800" onClick={() => handleEdit(row)}>
              <FaEdit />
            </StyledButton>
            <StyledButton bgColor="#f44336" onClick={() => handleDelete(index)}>
              <FaTrash />
            </StyledButton>
          </>
        ),
      },
    ],
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Project>({ columns, data }, usePagination);

  const handleAdd = () => {
    setModalIsOpen(true);
    setHeading("Add New Project");
  };

  type ProjectData = {
    name: string;
    client: string;
    tracked: any;
    amount: string;
    progress: string;
    access: string;
  };

  const handleEdit = (data: ProjectData) => {
    const editData = {
      name: data.name,
      client: data.client,
      tracked: dayjs(data.tracked), // Convert the string to a Dayjs object
      amount: data.amount,
      progress: data.progress,
      access: data.access,
    };
    setFormData(editData);
    setHeading("Edit Project");
    setModalIsOpen(true);
  };

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const closeModal = () => {
    setFormData(initialFormData);
    setModalIsOpen(false);
  };

  const saveProject = () => {
    setModalIsOpen(false);
  };

  return (
    <ProjectText>
      <Typography sx={{ fontWeight: "700" }}>Project List</Typography>
      <ButtonContainer>
        <Button onClick={handleAdd}>
          <FaPlus /> Add Project
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
        contentLabel="Add Project"
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

        <h2>{heading}</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Client</InputLabel>
                <Select
                  label="Client"
                  name="client"
                  value={formData.client}
                  onChange={(event) =>
                    handleClientChange(
                      event as React.ChangeEvent<{ value: unknown }>
                    )
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Client A">Client A</MenuItem>
                  <MenuItem value="Client B">Client B</MenuItem>
                  <MenuItem value="Client C">Client C</MenuItem>
                  <MenuItem value="CITPL">CITPL</MenuItem>
                  <MenuItem value="CavinKare">CavinKare</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <DesktopDatePicker
                label="Tracked"
                value={formData.tracked}
                sx={{ marginTop: 2 }}
                onChange={handleTrackedChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Progress"
                name="progress"
                value={formData.progress}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Access"
                name="access"
                value={formData.access}
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
                  onClick={saveProject}
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
    </ProjectText>
  );
};

export default Projects;
