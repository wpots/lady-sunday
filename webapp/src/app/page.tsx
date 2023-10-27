"use client";
import "./page.css";
import AlphaTabContextProvider from "./_store/alphaTab-context";
import Overlay from "./_components/AlphaTab/OverLay";
import TrackList from "./_components/AlphaTab/TrackList";
import ScoreCanvas from "./_components/AlphaTab/ScoreCanvas";
import Controls from "./_components/AlphaTab/ScoreControls";
import { Button, Col, Layout, Row, Tooltip } from "antd";
import Branding from "./_components/UI/Branding";
import AppIcon from "./_components/UI/AppIcon";
import { useEffect, useRef, useState } from "react";
const { Content, Footer, Header, Sider } = Layout;

export default function Home() {
  const [settings, setSettings] = useState(false);

  const handleSettingsToggle = () => {
    setSettings(prevS => !prevS);
  };
  return (
    <>
      <Branding />
      <AlphaTabContextProvider>
        <Layout style={{ position: "sticky", top: "0", height: "calc(100vh - 64px)", zIndex: "1000" }}>
          <Overlay />
          <Header>
            <Row justify="space-between">
              <Col>
                <Tooltip title="track settings">
                  <Button
                    type="primary"
                    size="large"
                    shape="circle"
                    icon={<AppIcon name="tracks" />}
                    onClick={handleSettingsToggle}
                    className={settings ? "active" : undefined}
                  />
                </Tooltip>
              </Col>
              <Col>Document controls here (download midi/pdf/xml)</Col>
            </Row>
          </Header>
          <Layout style={{ height: "calc(100vh - 152px)" }} hasSider>
            <Sider>
              <TrackList />
            </Sider>
            <Content style={{ height: "calc(100vh - 217px)", overflowY: "scroll" }} id="scroller">
              <ScoreCanvas />
            </Content>
          </Layout>
          <Footer style={{ position: "fixed", bottom: "0", width: "100%", zIndex: "1000" }}>
            <Controls />
          </Footer>
        </Layout>
      </AlphaTabContextProvider>
    </>
  );
}
