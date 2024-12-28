import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { addLocation } from "../utils/stock";

const Rule = {
  required: true,
  message: "This field is required",
};

const AddLocationComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const addLocationMutation = useMutation({
    mutationFn: addLocation,
    onSuccess: () => {
      message.success("Location added successfully");
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      setIsModalOpen(false);
    },
  });

  const handleSubmit = (values: { loc_name: string }) => {
    addLocationMutation.mutate(values);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add Location</Button>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ loc_name: "" }}
        >
          <Form.Item label="Location" name="loc_name" rules={[Rule]}>
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

export default AddLocationComponent;
