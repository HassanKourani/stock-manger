import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { updateMaterial } from "../utils/stock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Material } from "../utils/types";

const Rule = {
  required: true,
  message: "This field is required",
};

const EditMaterialComponent = ({ record }: { record: Material }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const editMaterialMutation = useMutation({
    mutationFn: updateMaterial,
    onSuccess: () => {
      message.success("Material added successfully");
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleSubmit = (values: { name: string }) => {
    const data = { ...record, ...values };
    editMaterialMutation.mutate(data);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        loading={editMaterialMutation.isPending}
      >
        Edit Material
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ name: "" }}
          form={form}
          autoComplete="off"
        >
          <Form.Item label="Material" name="name" rules={[Rule]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Edit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default EditMaterialComponent;
