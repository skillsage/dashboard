import React, { useState, useRef } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Button,
  Space,
  Modal,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./Course.css";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  form,
}) => {
  const inputNode =
    inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Courses = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newRow = {
          key: (data.length + 1).toString(),
          ...values,
        };
        setData([...data, newRow]);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: "15%",
      render: (text, record) =>
        renderCell(text, record, "title", form),
    },
    {
      title: "Sub Title",
      dataIndex: "sub_title",
      width: "15%",
      render: (text, record) =>
        renderCell(text, record, "sub_title", form),
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "20%",
      render: (text, record) =>
        renderCell(text, record, "description", form),
    },
    {
      title: "Language",
      dataIndex: "language",
      width: "10%",
      render: (text, record) =>
        renderCell(text, record, "language", form),
    },
    {
      title: "Requirements",
      dataIndex: "requirements",
      width: "10%",
      render: (text, record) =>
        renderCell(text, record, "requirements", form),
    },
    {
      title: "Lessons",
      dataIndex: "lessons",
      width: "10%",
      render: (text, record) =>
        renderCell(text, record, "lessons", form),
    },
    {
      title: "Skills",
      dataIndex: "skills",
      width: "10%",
      render: (text, record) =>
        renderCell(text, record, "skills", form),
    },
    {
      title: "Image",
      dataIndex: "image",
      width: "10%",
      render: (text, record) =>
        renderCell(text, record, "image", form),
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      width: "10%",
      render: (text, record) =>
        renderCell(text, record, "isActive", form),
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Typography.Link onClick={() => save(record.key)}>
              <CheckOutlined />
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={cancel}
            >
              <a>
                <CloseOutlined />
              </a>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              <EditOutlined />
            </Typography.Link>
            <Popconfirm
              title="Sure to delete this course?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>
                <DeleteOutlined />
              </a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const renderCell = (text, record, dataIndex, form) => {
    const editing = isEditing(record);
    return (
      <td>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${dataIndex}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          text
        )}
      </td>
    );
  };

  return (
    <div className="course-wrapper">
      <div className="course-btn-wrapper">
        <Button
          size="middle"
          className="course-btn"
          onClick={showModal}
        >
          <PlusOutlined />
          Add Courses
        </Button>
      </div>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
        />
      </Form>

      {/* Add Course Modal */}
      <Modal
        title="Add Course"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        form={form}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please input the course title!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Sub Title"
              name="sub_title"
              rules={[
                { required: true, message: "Please input the course subtitle!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input the course description!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Language"
              name="language"
              rules={[
                {
                  required: true,
                  message: "Please input the course language!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Requirements" name="requirements">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Lessons" name="lessons">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Skills" name="skills">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <Input />
        </Form.Item>
        <Form.Item label="Is Active" name="isActive">
          <Input />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default Courses;
