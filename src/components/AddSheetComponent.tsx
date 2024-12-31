import { App, Button, Form, Input, Modal, Select } from "antd";
import { useState, useEffect } from "react";
import {
  addHistory,
  addStock,
  getLocations,
  getMaterials,
  updateStock,
} from "../utils/stock";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stock } from "../utils/types";

const Rule = { required: true, message: "This field is required" };

interface AddSheetComponentProps {
  sheet?: Stock;
}

const AddSheetComponent = ({ sheet }: AddSheetComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const isEdit = !!sheet?.id;

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
      form.resetFields();
      setIsModalOpen(false);
    },
    onError: () => {
      message.error("Failed to add sheet");
    },
  });

  const updateSheetMutation = useMutation({
    mutationFn: updateStock,
    onSuccess: () => {
      message.success("Sheet updated successfully");
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      form.resetFields();
      setIsModalOpen(false);
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
    reason?: string;
  }) => {
    if (isEdit) {
      updateSheetMutation.mutate({ ...values, id: sheet?.id });
      addHistory({
        stock_id: sheet?.id ?? 0,
        by_who: localStorage.getItem("email") ?? "",
        reason: values.reason,
        affected_qty: values.qty,
      });
    } else {
      delete values.reason;
      addSheetMutation.mutate(values);
    }
  };

  useEffect(() => {
    if (isModalOpen && sheet) {
      form.setFieldsValue({
        type_id: sheet.type_id,
        width: sheet.width,
        length: sheet.length,
        thickness: sheet.thickness,
        location_id: sheet.location_id,
        qty: null,
        reason: null,
      });
    }
  }, [isModalOpen, sheet, form]);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} type="primary">
        {isEdit ? "Edit" : "Add"} Sheet
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
          autoComplete="off"
        >
          <Form.Item label="Material" name="type_id" rules={[Rule]}>
            <Select
              options={formattedMaterials}
              showSearch
              optionFilterProp="label"
            />
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
            <Select
              options={formattedLocations}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
          <Form.Item label="Quantity" name="qty" rules={[Rule]}>
            <Input />
          </Form.Item>
          <Form.Item label="Reason" name="reason" rules={isEdit ? [Rule] : []}>
            <Input disabled={!isEdit} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            {isEdit ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default AddSheetComponent;
