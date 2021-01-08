import { DataService } from "../data/data-service";
import data from '../data/result.json';

const defaultColumns = [
  {
    title: "SL.No.",
    dataIndex: "serialNum",
    key: "serialNum"
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
];

// Get columns for the data table
const getColumns = (key) => {
  return [
    ...defaultColumns,
    ...(!key?
      [
        {
          title: "Role",
          dataIndex: "role",
          key: "role",
        },
        {
          title: "Level",
          dataIndex: "level",
          key: "level",
        },
      ]
      :key === "level"
      ? [
          {
            title: "Role",
            dataIndex: "role",
            key: "role",
          },
        ]
      : [
          {
            title: "Level",
            dataIndex: "level",
            key: "level",
          },
        ]),
  ];
};

// Filter items that has the given role or level and add a sl. no to the filtered items
const getFilteredRows = (key, value) => {
  if (data && data.length) {
    let filteredData = [];
    if(!key && !value){
      filteredData = data
    }
    else {
      filteredData = data.filter((item) => {
        return Array.isArray(item[key])
          ? item[key].includes(value)
          : item[key] === value;
      })
    }
    return filteredData.map((filteredItem, index) => ({
        ...filteredItem,
        serialNum: index,
        role: Array.isArray(filteredItem.role)
          ? filteredItem.role.join(",")
          : filteredItem.role,
        level: Array.isArray(filteredItem.level)
          ? filteredItem.level.join(",")
          : filteredItem.level,
      }));
  }
  return {}
};

// Get the count of each level and role
const getCount = () => {
  
  if (data && data.length) {
    return data.reduce(
      (acc, item) => {
        if (Array.isArray(item.level)) {
          item.level.forEach((element) => {
            acc["levelCountMap"][element] = acc["levelCountMap"][element]
              ? acc["levelCountMap"][element] + 1
              : 1;
          });
        }
        // Ignore null values
        else if (item.level) {
          acc["levelCountMap"][item.level] = acc["levelCountMap"][item.level]
            ? acc["levelCountMap"][item.level] + 1
            : 1;
        }

        if (Array.isArray(item.role)) {
          item.role.forEach((element) => {
            acc["roleCountMap"][element] = acc["roleCountMap"][element]
              ? acc["roleCountMap"][element] + 1
              : 1;
          });
        }
        // Ignore null values
        else if (item.role) {
          acc["roleCountMap"][item.role] = acc["roleCountMap"][item.role]
            ? acc["roleCountMap"][item.role] + 1
            : 1;
        }

        return acc;
      },
      { levelCountMap: {}, roleCountMap: {} }
    );
  }
  
    return {};
  
};

export { getColumns, getFilteredRows, getCount };
