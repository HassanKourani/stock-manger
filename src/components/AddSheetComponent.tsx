import { Button, Form, Input, message, Modal, Select } from "antd";
import { useState } from "react";
import { addStock, getLocations, getMaterials } from "../utils/stock";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const Rule = { required: true, message: "This field is required" };
const AddSheetComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: materials = [] } = useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });

  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  const addSheetMutation = useMutation({
    mutationFn: addStock,
    onSuccess: () => {
      message.success("Sheet added successfully");
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      setIsModalOpen(false);
    },
    onError: () => {
      message.error("Failed to add sheet");
    },
  });

  const formattedMaterials = materials.map((material) => ({
    label: material.name,
    value: material.id ?? 0,
  }));

  const formattedLocations = locations.map((location) => ({
    label: location.loc_name,
    value: location.id ?? 0,
  }));

  const handleSubmit = (values: {
    type_id: number;
    width: number;
    length: number;
    thickness: number;
    location_id: number;
    qty: number;
  }) => {
    addSheetMutation.mutate(values);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add Sheet</Button>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Material" name="type_id" rules={[Rule]}>
            <Select options={formattedMaterials} />
          </Form.Item>
          <Form.Item label="Width" name="width" rules={[Rule]}>
            <Input />
          </Form.Item>
          <Form.Item label="Length" name="length" rules={[Rule]}>
            <Input />
          </Form.Item>
          <Form.Item label="Thickness" name="thickness" rules={[Rule]}>
            <Input />
          </Form.Item>
          <Form.Item label="Location" name="location_id" rules={[Rule]}>
            <Select options={formattedLocations} />
          </Form.Item>
          <Form.Item label="Quantity" name="qty" rules={[Rule]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default AddSheetComponent;
