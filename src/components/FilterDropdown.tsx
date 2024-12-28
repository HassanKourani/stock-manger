import { Button, InputNumber, Select } from "antd";
import { ColumnFilterItem } from "antd/es/table/interface";
import { useSearchParams } from "react-router";

interface FilterDropdownProps {
  prefixCls: string;
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: () => void;
  clearFilters?: () => void;
  filters?: ColumnFilterItem[];
  visible: boolean;
  close: () => void;
  dataIndex: string;
}

const FilterDropdown = ({
  selectedKeys,
  setSelectedKeys,
  confirm,
  clearFilters,
  dataIndex,
  filters,
}: FilterDropdownProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = () => {
    if (selectedKeys[0]) {
      searchParams.set(dataIndex, selectedKeys[0].toString());
    } else {
      searchParams.delete(dataIndex);
    }
    setSearchParams(searchParams);
    confirm();
  };

  const handleReset = () => {
    searchParams.delete(dataIndex);
    setSearchParams(searchParams);
    clearFilters?.();
  };

  return (
    <div style={{ padding: 8 }}>
      {filters ? (
        <Select
          value={selectedKeys[0]}
          onChange={(value) => setSelectedKeys(value ? [value] : [])}
          style={{ width: 188, marginBottom: 8, display: "block" }}
          options={filters?.map((filter) => ({
            label: filter.text,
            value: filter.value,
          }))}
        />
      ) : (
        <InputNumber
          value={selectedKeys[0] as number}
          onChange={(value) => setSelectedKeys(value ? [value] : [])}
          onPressEnter={handleFilter}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleReset} size="small">
          Reset
        </Button>
        <Button type="primary" onClick={handleFilter} size="small">
          Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterDropdown;
