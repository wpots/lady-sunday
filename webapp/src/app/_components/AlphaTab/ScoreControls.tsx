import { useContext, useEffect, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";

import { SearchOutlined, DashOutlined, FieldTimeOutlined } from "@ant-design/icons";
import { Button, Tooltip, Slider, Select, Row, Col, Space, Divider } from "antd";
import { Footer } from "antd/es/layout/layout";
// https://alphatab.net/docs/reference/api

import "./Controls.css";
import AppIcon from "../UI/AppIcon";
import PlayerControls from "./PlayerControls";
export default function Controls() {
  const { score, apiInstance } = useContext(AlphaTabContext);
  const [zoom, setZoom] = useState("100");
  const [speed, setSpeed] = useState(1.0);
  const [countIn, setCountIn] = useState(false);
  const [metronome, setMetronome] = useState(false);

  useEffect(() => {
    if (apiInstance) apiInstance.playbackSpeed = speed;
  }, [speed, apiInstance]);

  useEffect(() => {
    if (apiInstance) apiInstance.countInVolume = !countIn ? metronome || 0.5 : false;
  }, [apiInstance, countIn, metronome]);

  useEffect(() => {
    if (apiInstance) apiInstance.metronomeVolume = metronome;
  }, [apiInstance, metronome]);

  const handleSpeedChange = (speed: number) => {
    setSpeed(speed);
  };
  const handleCountIn = () => {
    setCountIn(prev => !prev);
  };
  const handleMetronome = () => {
    setMetronome(prev => !prev);
  };

  return (
    <Row>
      <Col span={4} className="slider-wrapper">
        <AppIcon name="speed" style={{ color: "#1677ff" }} />
        <small className="speed-count">speed: {speed}</small>
        <Slider min={0} max={2} onChange={handleSpeedChange} value={typeof speed === "number" ? speed : 0} step={0.1} />
      </Col>
      <Col span={4}>
        <Space>
          <Tooltip title="count in">
            <Button
              type="primary"
              size="large"
              shape="circle"
              icon={<AppIcon name="count-in" />}
              onClick={handleCountIn}
              className={countIn ? "active" : undefined}
            />
          </Tooltip>
          <Tooltip title="metronome">
            <Button
              type="primary"
              size="large"
              shape="circle"
              icon={<AppIcon name="metronome" />}
              onClick={handleMetronome}
              className={metronome ? "active" : undefined}
            />
          </Tooltip>
        </Space>
      </Col>
      <PlayerControls />
    </Row>
  );
}
