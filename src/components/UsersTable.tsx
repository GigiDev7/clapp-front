import { IUser } from "../utils/interfaces";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./css/UserTable.module.css";
import { useUsersStore } from "../store/store";

const UsersTable: React.FC<{
  users: IUser[];
  showModal: () => void;
}> = ({ users, showModal }) => {
  const deleteUser = useUsersStore((state) => state.deleteUser);
  const setEditingUserId = useUsersStore((state) => state.setEditingUserId);

  const columns: ColumnsType<IUser> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Street",
      dataIndex: ["address", "street"],
    },
    {
      title: "City",
      dataIndex: ["address", "city"],
    },
    {
      render(_, rec) {
        return (
          <button
            onClick={(e) => handleDeleteClick(e, rec)}
            className={styles["delete-btn"]}
          >
            Delete
          </button>
        );
      },
    },
  ];

  const handleRowClick = (e: React.MouseEvent, rec: IUser) => {
    if (e.detail === 2) {
      showModal();
      setEditingUserId(rec.id);
    }
  };

  const handleDeleteClick = async (e: React.MouseEvent, rec: IUser) => {
    e.stopPropagation();
    deleteUser(rec.id);
  };

  return (
    <div>
      <Table
        onRow={(rec) => {
          return {
            onClick: (e) => handleRowClick(e, rec),
          };
        }}
        rowClassName={() => "user-row"}
        rowKey={(record) => record.id}
        dataSource={users}
        columns={columns}
      />
    </div>
  );
};

export default UsersTable;
