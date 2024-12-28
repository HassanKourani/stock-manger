import { useQuery } from "@tanstack/react-query";
import { Button, Table, TableColumnsType, TablePaginationConfig } from "antd";
import FilterDropdown from "../components/FilterDropdown";
import { getLocations, getMaterials, getStock } from "../utils/stock";
import { Stock } from "../utils/types";
import { useNavigate, useSearchParams } from "react-router";
import AddSheetComponent from "../components/AddSheetComponent";
import styled from "styled-components";
import AddMaterialComponent from "../components/AddMaterialComponent";
import AddLocationComponent from "../components/AddLocationComponent";
import { HistoryOutlined } from "@ant-design/icons";
import ResetFilterButton from "../components/ResetFilterButton";
import { FilterValue } from "antd/es/table/interface";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;
export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
const StyledActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const navigate = useNavigate();

  const { data: locations = [], isLoading: isLoadingLocations } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  const { data: materials = [], isLoading: isLoadingMaterials } = useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });

  const {
    data: stock = [],
    isLoading: isLoadingStock,
    refetch: refetchStock,
  } = useQuery({
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

  const handleTableChange = (
    _: TablePaginationConfig,
    filters: Record<string, FilterValue | null>
  ) => {
    Object.entries(filters).forEach(([key, value]) => {
      if (value?.[0]) {
        searchParams.set(key, value[0].toString());
      } else {
        searchParams.delete(key);
      }
    });
    setSearchParams(searchParams);
  };

  const getFilteredValue = (key: string): React.Key[] => {
    const value = searchParams.get(key);
    return value ? [value] : [];
  };

  const columns: TableColumnsType<Stock> = [
    {
      title: "Material",
      dataIndex: "type_id",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="type_id" />
      ),
      filters: formattedMaterials,
      filteredValue: getFilteredValue("type_id"),
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
      filteredValue: getFilteredValue("width"),
      onFilter: (value, record) =>
        record.width.toString().indexOf(value as string) === 0,
    },
    {
      title: "Height",
      dataIndex: "length",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="length" />
      ),
      filteredValue: getFilteredValue("length"),
      onFilter: (value, record) =>
        record.length.toString().indexOf(value as string) === 0,
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="thickness" />
      ),
      filteredValue: getFilteredValue("thickness"),
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
      filteredValue: getFilteredValue("location_id"),
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

    {
      title: "Last Updated",
      dataIndex: "last_updated",
      render: (value) => new Date(value).toLocaleString(),
      width: "200px",
    },
    {
      title: "Action",
      render: (_, record) => (
        <StyledActionButtons>
          <AddSheetComponent sheet={record} />
          <Button
            onClick={() => {
              navigate(`/history?stock_id=${record.id}`);
            }}
          >
            <HistoryOutlined />
          </Button>
        </StyledActionButtons>
      ),
      width: "50px",
    },
  ];

  return (
    <StyledContainer>
      <StyledButtonContainer>
        <ResetFilterButton refetch={refetchStock} />
        <AddSheetComponent />
        <AddMaterialComponent />
        <AddLocationComponent />
      </StyledButtonContainer>
      <Table
        columns={columns}
        dataSource={stock}
        onChange={handleTableChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        rowKey={(record) => record.id?.toString() ?? ""}
        scroll={{ x: true, y: "calc(70vh - 100px)" }}
        loading={isLoadingLocations || isLoadingMaterials || isLoadingStock}
      />
    </StyledContainer>
  );
};

export default Home;
