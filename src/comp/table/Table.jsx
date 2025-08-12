import React, { useRef, useState, useMemo } from "react";
import { Table as AntTable, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const Table = ({ data, columns }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleChange = (pagination, filters) => {
    setFilteredInfo(filters);
  };

  // Search filter dropdown
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              backgroundColor: "var(--accent)",
              borderColor: "var(--accent)",
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : false,
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // 🔹 Auto-generate unique-value dropdown filters for each column
  const getColumnValueFilters = (dataIndex) => {
    const uniqueValues = Array.from(
      new Set(
        (data || [])
          .map((item) => item[dataIndex])
          .filter((val) => val !== undefined && val !== null)
      )
    );
    return uniqueValues.map((val) => ({
      text: val?.toString(),
      value: val,
    }));
  };

  // ✅ Attach BOTH search + dropdown filters to all columns dynamically
  const enhancedColumns = useMemo(() => {
    return columns.map((col) => ({
      ...col,
      align: "center",
      filters: getColumnValueFilters(col.dataIndex),
      filteredValue: filteredInfo[col.dataIndex] || null,
      onFilter: (value, record) =>
        record[col.dataIndex]
          ?.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()),
      ...getColumnSearchProps(col.dataIndex),
    }));
  }, [columns, data, filteredInfo, searchText]);

  return (
    <AntTable
      columns={enhancedColumns}
      dataSource={data}
      onChange={handleChange}
      pagination={{ position: ["bottomRight"] }}
      scroll={{ x: enhancedColumns.length * 150 }}
    />
  );
};

export default Table;
