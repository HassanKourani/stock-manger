import { useQuery } from "@tanstack/react-query";
import { Table, TableColumnsType, TablePaginationConfig } from "antd";
import { FilterFilled } from "@ant-design/icons";
import { useSearchParams } from "react-router";
import FilterDropdown from "../components/FilterDropdown";
import { getMaterials, getStockSummary } from "../utils/stock";
import { StyledButtonContainer, StyledContainer } from "./Home";
import { FilterValue } from "antd/es/table/interface";
import ResetFilterButton from "../components/ResetFilterButton";

interface StockSummary {
  type_id: number;
  width: number;
  length: number;
  thickness: number;
  total_qty: number;
}

const Summary = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const { data: materials = [], isLoading: isLoadingMaterials } = useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });

  const {
    data: summary = [],
    isLoading: isLoadingSummary,
    refetch: refetchSummary,
  } = useQuery({
    queryKey: ["stock-summary", queryParams],
    queryFn: () => {
      const params: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      return getStockSummary(params);
    },
  });

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

  const columns: TableColumnsType<StockSummary> = [
    {
      title: "Material",
      dataIndex: "type_id",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="type_id" />
      ),
      filters: formattedMaterials,
      filteredValue: getFilteredValue("type_id"),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: filtered ? "#ffffff" : undefined }} />
      ),
      render: (value) => {
        const material = formattedMaterials.find(
          (material) => material.value === value
        );
        return material ? material.text : value;
      },
      onFilter: (value, record) =>
        record.type_id.toString().indexOf(value as string) === 0,
      width: "200px",
    },
    {
      title: "Width",
      dataIndex: "width",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="width" />
      ),
      filteredValue: getFilteredValue("width"),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: filtered ? "#ffffff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.width.toString().indexOf(value as string) === 0,
      width: "100px",
    },
    {
      title: "Height",
      dataIndex: "length",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="length" />
      ),
      filteredValue: getFilteredValue("length"),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: filtered ? "#ffffff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.length.toString().indexOf(value as string) === 0,
      width: "100px",
    },
    {
      title: "Thickness",
      dataIndex: "thickness",
      filterDropdown: (props) => (
        <FilterDropdown {...props} dataIndex="thickness" />
      ),
      filteredValue: getFilteredValue("thickness"),
      filterIcon: (filtered) => (
        <FilterFilled style={{ color: filtered ? "#ffffff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.thickness.toString().indexOf(value as string) === 0,
      width: "120px",
    },
    {
      title: "Total Quantity",
      dataIndex: "total_qty",
      sorter: (a, b) => a.total_qty - b.total_qty,
      sortDirections: ["descend", "ascend"],
      width: "150px",
    },
  ];

  return (
    <StyledContainer>
      <StyledButtonContainer>
        <ResetFilterButton refetch={refetchSummary} />
      </StyledButtonContainer>
      <Table
        columns={columns}
        dataSource={summary}
        loading={isLoadingMaterials || isLoadingSummary}
        rowKey={(record) =>
          `${record.type_id}-${record.width}-${record.length}-${record.thickness}`
        }
        onChange={handleTableChange}
        className="alternating-columns"
      />
    </StyledContainer>
  );
};

export default Summary;
