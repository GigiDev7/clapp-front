import CustomModal from "./components/CustomModal";
import UsersChart from "./components/UsersChart";
import UsersTable from "./components/UsersTable";
import { useModal } from "./hooks/useModal";
import { useUsersStore } from "./store/store";
import { useEffect } from "react";

function App() {
  const { error, loading, users, fetchUsers } = useUsersStore((state) => ({
    ...state,
  }));

  const { isModalShown, hideModal, showModal } = useModal();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div>
        <button onClick={showModal} className="add-user-btn">
          Add new user
        </button>
      </div>
      <div className="container">
        <UsersTable showModal={showModal} users={users} />
        <UsersChart users={users} />
      </div>
      {isModalShown && (
        <CustomModal hideModal={hideModal} isOpen={isModalShown} />
      )}
    </div>
  );
}

export default App;
