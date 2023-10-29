"use client";

import { Button, Tooltip } from "antd";
import { useState } from "react";
import AppIcon from "../UI/AppIcon";

export default function ControlsButton() {
  const [settings, setSettings] = useState(false);

  const handleSettingsToggle = () => {
    setSettings(prevS => !prevS);
  };
  return (
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
  );
}
