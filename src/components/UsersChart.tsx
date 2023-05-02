import { Pie } from "@ant-design/plots";
import { IUser } from "../utils/interfaces";
import { useMemo } from "react";

const UsersChart: React.FC<{ users: IUser[] }> = ({ users }) => {
  const data = useMemo(
    () => [
      {
        type: "Male",
        value: users.filter((user) => user.gender === "male").length,
      },
      {
        type: "Female",
        value: users.filter((user) => user.gender === "female").length,
      },
    ],
    [users]
  );

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return (
    <div>
      <Pie {...config} />
    </div>
  );
};

export default UsersChart;
