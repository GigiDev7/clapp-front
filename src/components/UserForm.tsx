import { Form, Input, Select, Button } from "antd";
import { useUsersStore } from "../store/store";
import { useMemo } from "react";

const UserForm: React.FC<{ hideModal: () => void }> = ({ hideModal }) => {
  const { users, editingUserId, createUser, updateUser } = useUsersStore(
    (state) => ({
      editingUserId: state.editingUserId,
      users: state.users,
      createUser: state.createUser,
      updateUser: state.updateUser,
    })
  );

  const user = useMemo(() => {
    if (editingUserId) {
      return users.find((user) => user.id === editingUserId);
    }
  }, [editingUserId]);

  const [form] = Form.useForm();
  form.resetFields();

  if (user) {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      gender: user.gender,
      phone: user.phone,
      street: user.address.street,
      city: user.address.city,
    });
  }

  const onSubmit = (values: {
    email: string;
    name: string;
    gender: string;
    phone: string;
    street: string;
    city: string;
  }) => {
    const userData = {
      name: values.name,
      email: values.email,
      gender: values.gender,
      phone: values.phone,
      address: { street: values.street, city: values.city },
    };

    if (!user) {
      createUser(userData);
    } else {
      updateUser(user.id, userData);
    }

    hideModal();
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onSubmit}
        style={{ margin: "24px 0" }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
      >
        <Form.Item
          rules={[{ required: true, message: "User name is required" }]}
          label="Name"
          name="name"
        >
          <Input value="asdsa" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please provide valid email address",
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            },
          ]}
          label="Email"
          name="email"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Phone number is required" }]}
          label="Phone"
          name="phone"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Street is required" }]}
          label="Street"
          name="street"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "City is required" }]}
          label="City"
          name="city"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please select gender" }]}
          label="Gender"
          name="gender"
        >
          <Select>
            <Select.Option value="male">male</Select.Option>
            <Select.Option value="female">female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForm;
