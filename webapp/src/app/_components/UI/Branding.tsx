import { Layout, Image, Row, Col, Space, Typography } from "antd";

const { Header } = Layout;
const { Title, Text } = Typography;

export default function Branding({ style }: { style?: any }) {
  return (
    <Layout>
      <Header>
        <Row gutter={16}>
          {/* <Col span={5}><Image src="/assets/images/logo.png" alt="Lady Sunday" width="100%" /></Col> */}

          <Col span={24}>
            <Title style={{ color: "white" }} level={1}>
              Lady Sunday
            </Title>
            {/* <Text type="secondary">omdat mijn moeder mij verkeerd verstond...</Text> */}
          </Col>
        </Row>
      </Header>
    </Layout>
  );
}
