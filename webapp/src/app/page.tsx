"use client";
import AlphaTabContextProvider from "./_store/alphaTab-context";
import Overlay from "./_components/AlphaTab/OverLay";
import TrackList from "./_components/AlphaTab/TrackList";
import ScoreCanvas from "./_components/AlphaTab/ScoreCanvas";
import ScoreControls from "./_components/AlphaTab/ScoreControls";
import { Col, Layout, Row } from "antd";
import Branding from "./_components/UI/Branding";
import "./page.css";
import SourceControls from "./_components/AlphaTab/SourceControls";

const { Content, Footer, Header, Sider } = Layout;

export default function Home() {
  return (
    <>
      <Branding />
      <AlphaTabContextProvider>
        <Layout style={{ position: "sticky", top: "0", height: "calc(100vh - 64px)", zIndex: "1000" }}>
          <Overlay />
          <Header>
            <Row justify="space-between">
              <Col>{/* <ControlsButton /> */}</Col>
              <Col>
                <SourceControls />
              </Col>
            </Row>
          </Header>
          <Layout style={{ height: "calc(100vh - 152px)" }} hasSider>
            <Sider style={{ color: "white" }}>
              <TrackList />
            </Sider>
            <Content style={{ height: "calc(100vh - 217px)", overflowY: "scroll" }} id="scroller">
              <ScoreCanvas />
            </Content>
          </Layout>
          <Footer style={{ position: "fixed", bottom: "0", width: "100%", zIndex: "1000" }}>
            <ScoreControls />
          </Footer>
        </Layout>
      </AlphaTabContextProvider>
    </>
  );
}
