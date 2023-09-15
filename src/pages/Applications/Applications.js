import React, { useEffect, useState } from "react";
import { Table, Button, Space, notification, Modal, Tag } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import {
  acceptApplication,
  getApplicants,
  rejectApplication,
} from "../../services/applications";

const Application = () => {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  const fetchApplicants = async () => {
    try {
      const { result, success } = await getApplicants();
      console.log(success);
      if (success) {
        setApplicants([...result]);
      }
    } catch (err) {
      openNotification("error", "Network Error", err.message);
    }
    console.log(applicants);
  };

  useEffect(() => {
    fetchApplicants();
  }, [refreshData]);

  const handleDownloadResume = (resumeUrl) => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.target = "_blank";
    link.download = "resume.pdf";
    link.click();
  };
  
  const columns = [
    { title: "Job Title", dataIndex: "job_title", key: "title" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        switch (status) {
          case "accepted":
            color = "green";
            break;
          case "rejected":
            color = "red";
            break;
          case "pending":
            color = "blue";
            break;
          default:
            color = "default";
        }

        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
    },
    {
      title: "Resume",
      key: "resume",
      render: (_, applicant) =>
        applicant.resume.length > 0 ? (
          <Button
            icon={<FilePdfOutlined />} // Add the DownloadOutlined icon
            onClick={() => handleDownloadResume(applicant.resume)}
          >
            Download Resume
          </Button>
        ) : null,
    },
    {
      title: "Action",
      key: "action",
      render: (_, applicant) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedApplicant(applicant);
              setIsModalVisible(true);
            }}
          >
            View
          </Button>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => handleAccept(applicant)}
          >
            Accept
          </Button>
          <Button
            type="danger"
            icon={<CloseOutlined />}
            onClick={() => handleReject(applicant)}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const handleAccept = async (applicant) => {
    try {
      const { success } = await acceptApplication({
        user_id: applicant.id,
        job_id: applicant.job_id,
        status: "accepted",
      });
      if (success) {
        setRefreshData(!refreshData);
        openNotification(
          "success",
          "Application Updated",
          "The application has been updated."
        );
      } else {
        openNotification("error", "Failed", "Application Failed.");
      }
    } catch (err) {
      openNotification("error", "Failed", err.message);
    }
  };

  const handleReject = async (applicant) => {
    try {
      const { success } = await rejectApplication({
        user_id: applicant.id,
        job_id: applicant.job_id,
        status: "rejected",
      });
      if (success) {
        setRefreshData(!refreshData);
        openNotification(
          "success",
          "Application Updated",
          "The application has been updated."
        );
      } else {
        openNotification("error", "Failed", "Application Failed.");
      }
    } catch (err) {
      openNotification("error", "Failed", err.message);
    }
  };

  return (
    <div>
      {contextHolder}
      <Table columns={columns} dataSource={applicants} />

      {/* Modal for viewing applicant details */}
      <Modal
        title="Applicant Details"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        {selectedApplicant && (
          <div>
            <p>Name: {selectedApplicant.name}</p>
            <p>Email: {selectedApplicant.email}</p>
            <p>Skills: {selectedApplicant.skills}</p>
            {/* Include other applicant details here */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Application;
