import DataTable from "react-data-table-component";
import "./App.css";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
const data = generateRandomData(20);
function generateRandomData(numberOfItems) {
  const data = [];
  for (let i = 0; i < numberOfItems; i++) {
    data.push({
      nombre: faker.person.firstName(),
      apellido: faker.person.lastName(),
      edad: faker.datatype.number({ min: 18, max: 100 }),
    });
  }

  return data;
}
function App() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setRecords(data);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeOut);
  });
  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Apellido",
      selector: (row) => row.apellido,
    },
    {
      name: "Edad",
      selector: (row) => row.edad,
      sortable: true,
    },
  ];
  const handleChange = (e) => {
    const recordsFilter = data.filter((record) => {
      return record.nombre.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(recordsFilter);
  };
  return (
    <div>
      <input type="text" onChange={handleChange} />
      <DataTable
        title="Datos de Usuario"
        selectableRows={true}
        columns={columns}
        data={records}
        pagination
        paginationPerPage={5}
        fixedHeader
        progressPending={loading}
      ></DataTable>
    </div>
  );
}

export default App;
