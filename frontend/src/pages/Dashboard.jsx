import { Table, Button, Progress, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { fetchData } from "../store/datasetSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((s) => s.dataset);

  // ✅ fetch data on mount
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const uploadProps = {
    beforeUpload: async (file) => {
      try {
        const text = await file.text();

        let payload = {};

        if (file.name.endsWith(".json")) {
          payload = {
            type: "json",
            data: JSON.parse(text)
          };
        }

        if (file.name.endsWith(".csv")) {
          payload = {
            type: "csv",
            data: text
          };
        }

        await axios.post("http://localhost:5010/api/datasets/upload", payload);

        message.success(`${file.name} uploaded successfully`);
        dispatch(fetchData());
      } catch (err) {
        message.error("Invalid file format");
      }

      return false; // prevent auto upload
    }
  };

  const autoLabel = async () => {
    await axios.post("http://localhost:5010/api/labels/auto-label");
    dispatch(fetchData());
  };


  const completed = data.filter(d => d.status !== "pending").length;
  const percent = data.length === 0 ? 0 : Math.round((completed / data.length) * 100);

  return (
    <div style={{ padding: 24 }}>
      <Card title="Automated Data Labeling">
        <Button
          type="primary"
          onClick={autoLabel}
          loading={loading}
          style={{ marginBottom: 16 }}
        >
          Auto Label
        </Button>

        <Progress percent={percent} style={{ marginBottom: 16 }} />
        <Upload {...uploadProps} accept=".json,.csv">
          <Button icon={<UploadOutlined />}>
            Upload JSON / CSV Dataset
          </Button>
        </Upload>

        <Table
          rowKey="id"
          loading={loading}
          dataSource={data}
          columns={[
            { title: "Input", dataIndex: "input" },
            { title: "Label", dataIndex: "label" },
            { title: "Status", dataIndex: "status" }
          ]}
        />
      </Card>
    </div>
  );
}
