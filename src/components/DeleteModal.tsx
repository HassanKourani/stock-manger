import { Modal, Button } from "antd";

const DeleteModal = ({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Modal
      open={open}
      title="Are you sure you want to delete?"
      onCancel={onCancel}
      footer={
        <Button type="primary" danger onClick={onConfirm}>
          Delete
        </Button>
      }
    />
  );
};

export default DeleteModal;
