import React, { useRef, useState, useMemo } from "react";
import { Table as AntTable, Input, Button, Space } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./Table.scss";

const Table = ({ data, columns, showActions = false, onEdit, onDelete }) => {
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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
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
    filterIcon: () => (
      <SearchOutlined
        style={{ color: "#fff", fontWeight: "bold", fontSize: "16px" }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
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

  // 📏 Improved width calculation to fit long headings exactly
  const calculateColumnWidth = (title, dataIndex) => {
    const titleLength = title.toString().length;
    const titleWidth = titleLength * 12; // More generous space for headers
    const maxDataWidth = Math.max(
      ...data.map((row) =>
        row[dataIndex] ? row[dataIndex].toString().length * 10 : 0
      ),
      0
    );
    return Math.max(titleWidth + 40, maxDataWidth, 160); // 40px padding, min 160px
  };

  const enhancedColumns = useMemo(() => {
    let updatedCols = columns.map((col) => ({
      ...col,
      align: "center",
      width: calculateColumnWidth(col.title, col.dataIndex),
      ellipsis: false,
      onHeaderCell: () => ({
        style: { whiteSpace: "nowrap" }, // 🚫 No wrap for headings
      }),
      filters: getColumnValueFilters(col.dataIndex),
      filteredValue: filteredInfo[col.dataIndex] || null,
      onFilter: (value, record) =>
        record[col.dataIndex]
          ?.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()),
      ...getColumnSearchProps(col.dataIndex),
    }));

    if (showActions) {
      updatedCols.push({
        title: "Action",
        key: "action",
        align: "center",
        fixed: "right",
        width: 140,
        onHeaderCell: () => ({
          style: { whiteSpace: "nowrap" },
        }),
        render: (_, record) => (
          <Space>
            <Button
              icon={<EditOutlined />}
              type="link"
              onClick={() => onEdit?.(record)}
            />
            <Button
              icon={<DeleteOutlined />}
              type="link"
              danger
              onClick={() => onDelete?.(record)}
            />
          </Space>
        ),
      });
    }

    return updatedCols;
  }, [columns, data, filteredInfo, searchText, showActions, onEdit, onDelete]);
return (
  <div className="table-wrapper">
    <div className="table-scroll">
      <AntTable
        columns={enhancedColumns}
        dataSource={data}
        onChange={handleChange}
        pagination={{
          pageSizeOptions: ["5", "10", "20", "50", "100"],
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
        scroll={{
          x: enhancedColumns.reduce((sum, col) => sum + (col.width || 150), 0),
        }}
      />
    </div>
  </div>
);

};

export default Table;
