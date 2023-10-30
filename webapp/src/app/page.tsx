"use client";
import { useState } from "react";
import { Col, Layout, Row, Tooltip, Button, Space, ConfigProvider } from "antd";
import AlphaTabContextProvider from "./_store/alphaTab-context";
import Branding from "./_components/UI/Branding";
import AppIcon from "./_components/UI/AppIcon";
import Overlay from "./_components/AlphaTab/OverLay";
import TrackList from "./_components/AlphaTab/TrackList";
import ScoreCanvas from "./_components/AlphaTab/ScoreCanvas";
import SourceControls from "./_components/AlphaTab/SourceControls";
import PlayerControls from "./_components/AlphaTab/PlayerControls";
import PlaybackControls from "./_components/AlphaTab/PlaybackControls";
import "./page.css";
import SoundControls from "./_components/AlphaTab/SoundControls";

const { Content, Footer, Header, Sider } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Branding />
      <AlphaTabContextProvider>
        <Layout style={{ position: "sticky", top: "0", height: "calc(100vh - 64px)", zIndex: "1000" }}>
          <Overlay />
          <Header>
            <Row justify="space-between">
              <Col>
                <SourceControls />
              </Col>
            </Row>
          </Header>
          <Layout style={{ height: "calc(100vh - 152px)" }} hasSider>
            <Sider
              style={{ display: "flex", background: "none" }}
              collapsible
              collapsed={collapsed}
              onCollapse={val => setCollapsed(val)}
              trigger={null}
            >
              <TrackList />
            </Sider>
            <Content style={{ height: "calc(100vh - 217px)", overflowY: "scroll" }} id="scroller">
              <ScoreCanvas />
            </Content>
          </Layout>
          <Footer style={{ position: "fixed", bottom: "0", width: "100%", zIndex: "1000" }}>
            <Row>
              <Col span={6} style={{ display: "flex", justifyContent: "start" }}>
                <SoundControls onTrackControls={() => setCollapsed(!collapsed)} trackControlsOpen={!collapsed} />
              </Col>
              <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
                <PlayerControls />
              </Col>
              <Col span={6} style={{ display: "flex", justifyContent: "end" }}>
                <PlaybackControls />
              </Col>
            </Row>
          </Footer>
        </Layout>
      </AlphaTabContextProvider>
    </>
  );
}
