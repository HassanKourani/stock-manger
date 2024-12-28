import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { addMaterial } from "../utils/stock";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Rule = {
  required: true,
  message: "This field is required",
};

const AddMaterialComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const addMaterialMutation = useMutation({
    mutationFn: addMaterial,
    onSuccess: () => {
      message.success("Material added successfully");
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      setIsModalOpen(false);
    },
    onError: () => {
      message.error("Failed to add material");
    },
  });

  const handleSubmit = (values: { name: string }) => {
    addMaterialMutation.mutate(values);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add Material</Button>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ name: "" }}
        >
          <Form.Item label="Material" name="name" rules={[Rule]}>
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

export default AddMaterialComponent;
