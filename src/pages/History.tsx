import { Table, TableColumnsType, Tag } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getHistory, getMaterials } from "../utils/stock";
import { useSearchParams } from "react-router";
import FilterDropdown from "../components/FilterDropdown";
import { History as HistoryType, HistoryView } from "../utils/types";
import { FilterDropdownProps, FilterValue } from "antd/es/table/interface";
import { TablePaginationConfig } from "antd/es/table";
import ResetFilterButton from "../components/ResetFilterButton";
import { StyledButtonContainer, StyledContainer } from "./Home";

const History = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["history", queryParams],
    queryFn: () => getHistory(queryParams),
  });

  const { data: materials = [], isLoading: isLoadingMaterials } = useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });

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

  const columns: TableColumnsType<HistoryView> = [
    {
      title: "User",
      dataIndex: "by_who",
      filterDropdown: (props: FilterDropdownProps) => (
        <FilterDropdown {...props} dataIndex="by_who" />
      ),
      filteredValue: getFilteredValue("by_who"),
      onFilter: (value, record) =>
        record.by_who.toString().indexOf(value as string) === 0,
    },
    {
      title: "Details",
      render: (_, record) => (
        <div>
          <Tag color="blue">
            Type:{" "}
            {materials.find((material) => material.id === record.type_id)?.name}
          </Tag>
          <Tag color="green">Width: {record.width}</Tag>
          <Tag color="red">Length: {record.length}</Tag>
          <Tag color="purple">Thickness: {record.thickness}</Tag>
        </div>
      ),
    },

    {
      title: "Changed Quantity",
      dataIndex: "affected_qty",
      key: "affected_qty",
      render: (value: number) => (
        <Tag color={value > 0 ? "green" : "red"}>{value ?? 0}</Tag>
      ),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      filterDropdown: (props: FilterDropdownProps) => (
        <FilterDropdown {...props} dataIndex="reason" />
      ),
      filteredValue: getFilteredValue("reason"),
      onFilter: (value, record) =>
        record.reason?.toString().indexOf(value as string) === 0,
    },
    {
      title: "Date",
      dataIndex: "change_date",
      render: (value: string) => new Date(value).toLocaleString(),
      sorter: (a: HistoryType, b: HistoryType) =>
        new Date(a.change_date).getTime() - new Date(b.change_date).getTime(),
      sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <StyledContainer>
      <StyledButtonContainer>
        <ResetFilterButton refetch={refetch} />
      </StyledButtonContainer>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading || isLoadingMaterials}
        rowKey="id"
        onChange={handleTableChange}
      />
    </StyledContainer>
  );
};

export default History;
