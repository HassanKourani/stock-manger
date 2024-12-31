import { Button, Space, Table, TableColumnsType, message } from "antd";
import { deleteMaterial, getMaterials } from "../utils/stock";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Material as MaterialType } from "../utils/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";
import EditMaterialComponent from "../components/EditMaterialComponent";
import AddMaterialComponent from "../components/AddMaterialComponent";
import { StyledButtonContainer, StyledContainer } from "./Home";

const Material = () => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [record, setRecord] = useState<MaterialType | null>(null);
  const { data: materials = [], isLoading: isLoadingMaterials } = useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });

  const deleteMaterialMutation = useMutation({
    mutationFn: deleteMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      setIsDeleteModalOpen(false);
      setRecord(null);
      message.success("Material deleted successfully");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const columns: TableColumnsType<MaterialType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <EditMaterialComponent record={record} />
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsDeleteModalOpen(true);
              setRecord(record);
            }}
            loading={deleteMaterialMutation.isPending}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <StyledContainer>
      <StyledButtonContainer>
        <AddMaterialComponent />
      </StyledButtonContainer>
      <Table
        dataSource={materials}
        columns={columns}
        loading={isLoadingMaterials}
        rowKey="id"
        className="alternating-columns"
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setRecord(null);
        }}
        onConfirm={() => {
          deleteMaterialMutation.mutate(record?.id?.toString() ?? "");
        }}
      />
    </StyledContainer>
  );
};

export default Material;
