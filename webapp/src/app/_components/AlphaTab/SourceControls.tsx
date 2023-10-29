"use client";

import { Button, Space } from "antd";
import { useState } from "react";

export default function SourceControls() {

  return (
    <Space>
      {["Radio", "Maria", "Suddenly I See", "You Know I'm No Good"].map((song: string) => (
        <Button key={song}>{song}</Button>
      ))}
    </Space>
  );
}
