"use client";
import { useEffect, useState } from "react";
import { Col, Layout, Row, ConfigProvider, Tooltip, Button } from "antd";
import AlphaTabContextProvider from "./_store/alphaTab-context";
import Branding from "./_components/UI/Branding";
import Overlay from "./_components/AlphaTab/OverLay";
import TrackList from "./_components/AlphaTab/TrackList";
import ScoreCanvas from "./_components/AlphaTab/ScoreCanvas";
import SourceControls from "./_components/AlphaTab/SourceControls";
import PlayerControls from "./_components/AlphaTab/PlayerControls";
import PlaybackControls from "./_components/AlphaTab/PlaybackControls";
import SoundControls from "./_components/AlphaTab/SoundControls";
import themeConfig from "./_theme/ladySunday";
import AppIcon from "./_components/UI/AppIcon";

import "./page.scss";
import PlayerFeedback from "./_components/AlphaTab/PlayerFeedback";
const { Content, Footer, Header, Sider } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(true);
  const [siderWidth, setSiderWidth] = useState(42);
  const [showPlaybackControls, setShowPlaybackControls] = useState(false);
  useEffect(() => {
    console.log("parent", showPlaybackControls);
  }, [showPlaybackControls]);
  const handlePlaybackControls = (show: boolean) => {
    setShowPlaybackControls(show);
  };
  return (
    <ConfigProvider theme={themeConfig}>
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
              style={{ display: "flex" }}
              breakpoint="md"
              onBreakpoint={broken => (broken ? setSiderWidth(0) : setSiderWidth(42))}
              width="270px"
              collapsedWidth={siderWidth}
              collapsible
              collapsed={collapsed}
              trigger={null}
            >
              <TrackList collapsed={collapsed} />
            </Sider>
            <Content style={{ height: "calc(100vh - 217px)", overflowY: "scroll" }} id="scroller">
              <ScoreCanvas />
            </Content>
          </Layout>

          <Footer style={{ position: "fixed", bottom: "0", width: "100%", zIndex: "1000" }}>
            <Row justify="space-between" gutter={8}>
              <Col xs={showPlaybackControls ? 0 : undefined} md={6}>
                <SoundControls onTrackControls={() => setCollapsed(!collapsed)} trackControlsOpen={!collapsed} />
              </Col>
              <Col xs={showPlaybackControls ? 0 : undefined} md={6} flex="1">
                <PlayerControls />
              </Col>
              <Col xs={showPlaybackControls ? 24 : undefined} md={6}>
                <PlaybackControls
                  onPlaybackControls={(val: boolean) => setShowPlaybackControls(val)}
                  showControls={showPlaybackControls}
                />
              </Col>
              <Col xs={0} md={{ span: 11, offset: 6 }}>
                <PlayerFeedback />
              </Col>
            </Row>
          </Footer>
        </Layout>
      </AlphaTabContextProvider>
    </ConfigProvider>
  );
}
