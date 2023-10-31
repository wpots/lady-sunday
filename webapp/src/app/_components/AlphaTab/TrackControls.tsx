"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AlphaTabContext } from "../../_store/alphaTab-context";

import { StepBackwardFilled } from "@ant-design/icons";
import { Button, Tooltip, Slider, Select, Row, Col, Space, Divider } from "antd";

// https://alphatab.net/docs/reference/api

export type Toggles = {
  mute?: boolean;
  solo?: boolean;
};

export type TrackToggles = { [id: number]: Toggles };

interface ITrackControlsProps {
  id: number;
  onToggleChange: (toggles: TrackToggles) => void;
}

import AppIcon from "../UI/AppIcon";
export default function TrackControls({ id, onToggleChange }: ITrackControlsProps) {
  const { apiInstance } = useContext(AlphaTabContext);
  const [volume, setVolume] = useState(1);
  const [mute, setMute] = useState(false);
  const [solo, setSolo] = useState(false);

  useEffect(() => {
    console.log("d", mute, solo);
    if (apiInstance && id) apiInstance.changeTrackMute([apiInstance.score.tracks[id]], mute);
    if (apiInstance && id) apiInstance.changeTrackSolo([apiInstance.score.tracks[id]], solo);
    onToggleChange({ [id]: { mute, solo } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mute, solo]);

  useEffect(() => {
    if (apiInstance) apiInstance.changeTrackVolume = volume;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  const handleVolumeChange = (volume: number) => {
    setVolume(volume);
  };

  const handleToggles = (type: string) => {
    console.log("h", mute, solo);
    if (type === "mute") {
      if (!mute && solo) setSolo(!solo);
      setMute(!mute);
    }

    if (type === "solo") {
      if (!solo && mute) setMute(!mute);
      setSolo(!solo);
    }
  };

  return (
    <>
      <Col span={24}>
        <Space style={{ width: "100%", marginBottom: ".5rem", justifyContent: "space-between" }}>
          <Button ghost={!mute} onClick={() => handleToggles("mute")}>
            mute
          </Button>
          <Button ghost={!solo} onClick={() => handleToggles("solo")}>
            solo
          </Button>
        </Space>
      </Col>
      <Col span={24} className="slider-wrapper">
        <AppIcon name="sound-2" />
        <Slider
          min={0}
          max={1}
          onChange={handleVolumeChange}
          value={typeof volume === "number" ? volume : 0}
          step={0.1}
        />
      </Col>
    </>
  );
}
