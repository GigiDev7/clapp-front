import { Modal } from "antd";
import UserForm from "./UserForm";

const CustomModal: React.FC<{
  isOpen: boolean;

  hideModal: () => void;
}> = ({ hideModal, isOpen }) => {
  return (
    <Modal footer={null} onCancel={hideModal} open={isOpen}>
      <UserForm hideModal={hideModal} />
    </Modal>
  );
};

export default CustomModal;
