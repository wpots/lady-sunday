import { Layout, Image, Row, Col, Space, Typography } from "antd";

const { Header } = Layout;
const { Title, Text } = Typography;

export default function Branding({ style }: { style?: any }) {
  return (
    <Layout>
      <Header>
        <Row gutter={16}>
          <Col span={19}>
            <Title level={2}>Lady Sunday</Title>
          </Col>
          <Col span={5}>
            <Image
              src="/assets/images/logo.png"
              alt="Lady Sunday"
              width="100%"
              preview={false}
              style={{ zIndex: "2000", position: "relative" }}
            />
          </Col>
        </Row>
      </Header>
    </Layout>
  );
}
