import { Layout, Image, Row, Col, Space, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

export default function Branding({ style }: { style?: any }) {
  return (
    <>
      <Layout>
        <Header>
          <Row gutter={16}>
            <Col span={19}>
              <Title level={2} style={{ marginTop: "1rem" }}>
                Lady Sunday
              </Title>
            </Col>
            <Col span={5} style={{ textAlign: "right" }}>
              <Image
                src="/assets/images/logo.png"
                alt="Lady Sunday"
                width="100%"
                preview={false}
                style={{ zIndex: "2000", position: "relative", maxWidth: "161px" }}
              />
            </Col>
          </Row>
        </Header>
      </Layout>
    </>
  );
}
