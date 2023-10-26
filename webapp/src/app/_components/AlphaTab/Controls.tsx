import { useContext, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";

import { SearchOutlined, DashOutlined, FieldTimeOutlined } from "@ant-design/icons";
import { Button, Tooltip, Slider, Select, Row, Col } from "antd";
import { Footer } from "antd/es/layout/layout";

import "./Controls.css";
export default function Controls() {
  const { score } = useContext(AlphaTabContext);
  const [zoom, setZoom] = useState("100");
  const [speed, setSpeed] = useState(1);
  const [countIn, setCountIn] = useState(false);
  const [metronome, setMetronome] = useState(false);

  const handleZoomSelection = (percentage: string) => {
    setZoom(percentage);
  };
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
    <Footer>
      <Row>
        <Col span={12}>
          <Tooltip title="count in">
            <Button
              type="primary"
              shape="circle"
              icon={<DashOutlined />}
              onClick={handleCountIn}
              className={countIn ? "active" : undefined}
            />
          </Tooltip>
          <Tooltip title="metronome">
            <Button
              type="primary"
              shape="circle"
              icon={<FieldTimeOutlined />}
              onClick={handleMetronome}
              className={metronome ? "active" : undefined}
            />
          </Tooltip>
        </Col>
        <Col span={12}>
          <Slider
            min={0}
            max={1}
            onChange={handleSpeedChange}
            value={typeof speed === "number" ? speed : 0}
            step={0.01}
          />
        </Col>
      </Row>
    </Footer>
  );
}
