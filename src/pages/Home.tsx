import { useQuery } from "@tanstack/react-query";
import { Table, TableColumnsType } from "antd";
import FilterDropdown from "../components/FilterDropdown";
import { getLocations, getMaterials, getStock } from "../utils/stock";
import { Stock } from "../utils/types";
import { useSearchParams } from "react-router";
import AddSheetComponent from "../components/AddSheetComponent";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const Home = () => {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  const { data: materials = [] } = useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });

  const { data: stock = [] } = useQuery({
    queryKey: ["stock", queryParams],
    queryFn: () => getStock(queryParams),
  });

  const formattedLocations = locations.map((location) => ({
    text: location.loc_name,
    value: location.id ?? 0,
  }));

  const formattedMaterials = materials.map((material) => ({
    text: material.name,
    value: material.id ?? 0,
  }));

  const columns: TableColumnsType<Stock> = [
    {
      title: "Material",
      dataIndex: "type_id",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="type_id" />
      ),
      filters: formattedMaterials,
      render: (value) => {
        const material = formattedMaterials.find(
          (material) => material.value === value
        );
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
      filters: formattedLocations,
      render: (value) => {
        const location = formattedLocations.find(
          (location) => location.value === value
        );
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
    <StyledContainer>
      <div>
        <AddSheetComponent />
      </div>
      <Table
        columns={columns}
        dataSource={stock}
        onChange={() => {}}
        showSorterTooltip={{ target: "sorter-icon" }}
        rowKey={(record) => record.id?.toString() ?? ""}
        scroll={{ x: true, y: "calc(100vh - 100px)" }}
      />
    </StyledContainer>
  );
};

export default Home;
