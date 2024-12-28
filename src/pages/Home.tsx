import { Table, TableColumnsType } from "antd";
import FilterDropdown from "../components/FilterDropdown";
import { useEffect, useState } from "react";
import { getLocations, getMaterials, getStock } from "../utils/stock";
import { Stock } from "../utils/types";
import { useSearchParams } from "react-router";

const Home = () => {
  const [locations, setLocations] = useState<{ value: number; text: string }[]>(
    []
  );
  const [materials, setMaterials] = useState<{ value: number; text: string }[]>(
    []
  );

  const [stock, setStock] = useState<Stock[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchLocations = async () => {
      const locations = await getLocations();
      setLocations(
        locations.map((location) => ({
          text: location.loc_name,
          value: location.id,
        }))
      );
    };

    const fetchMaterials = async () => {
      const materials = await getMaterials();
      setMaterials(
        materials.map((material) => ({
          text: material.name,
          value: material.id,
        }))
      );
    };

    const fetchStock = async () => {
      const queryParams = Object.fromEntries(searchParams.entries());
      const stock = await getStock(queryParams);
      setStock(stock);
    };

    Promise.all([fetchLocations(), fetchMaterials(), fetchStock()]);
  }, [searchParams]);

  const columns: TableColumnsType<Stock> = [
    {
      title: "Material",
      dataIndex: "type_id",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="type_id" />
      ),
      filters: materials,
      render: (value) => {
        const material = materials.find((material) => material.value === value);
        return material ? material.text : value;
      },
      onFilter: (value, record) =>
        record.type_id.toString().indexOf(value as string) === 0,
    },
    {
      title: "Width",
      dataIndex: "width",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="width" />
      ),
      onFilter: (value, record) =>
        record.width.toString().indexOf(value as string) === 0,
    },
    {
      title: "Height",
      dataIndex: "length",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="length" />
      ),
      onFilter: (value, record) =>
        record.length.toString().indexOf(value as string) === 0,
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="thickness" />
      ),
      onFilter: (value, record) =>
        record.thickness.toString().indexOf(value as string) === 0,
    },
    {
      title: "Location",
      dataIndex: "location_id",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="location_id" />
      ),
      filters: locations,
      render: (value) => {
        const location = locations.find((location) => location.value === value);
        return location ? location.text : value;
      },
      onFilter: (value, record) =>
        record.location_id.toString().indexOf(value as string) === 0,
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      sorter: (a, b) => a.qty - b.qty,
      sortDirections: ["descend"],
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={stock}
      onChange={() => {}}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default Home;
