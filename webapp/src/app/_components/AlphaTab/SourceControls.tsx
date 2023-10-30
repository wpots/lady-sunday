"use client";

import { AlphaTabContext } from "@/app/_store/alphaTab-context";
import { Button, Space } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import AppIcon from "../UI/AppIcon";

export type Song = {
  id: number;
  name: string;
  file: string;
};

export default function SourceControls() {
  const [songSelected, setSongSelected] = useState<Song>({ id: 1, name: "Maria", file: "./maria.gp5" });
  const upload = useRef<HTMLInputElement>(null);
  const { apiInstance } = useContext(AlphaTabContext);
  useEffect(() => {
    if (apiInstance) apiInstance.load(songSelected.file);
  }, [songSelected]);

  const handleSongSelected = (song: Song) => {
    setSongSelected(song);
  };

  const handleFileUpload = () => {
    console.log(apiInstance.load(upload?.current?.files?.[0]));
    const reader = new FileReader();
    reader.readAsArrayBuffer(upload?.current?.files?.[0]);
    reader.onload = () => {
      apiInstance.load(reader.result);
    };
    // if (apiInstance && upload?.current?.files) apiInstance.load(upload.current.files[0]);
  };

  return (
    <Space style={{ display: "flex", alignItems: "center" }}>
      {[
        { id: 0, name: "Radio", file: "./radio.xml" },
        { id: 1, name: "Maria", file: "./maria.gp5" },
        { id: 2, name: "Suddenly I See", file: "./suddenly.gp4" },
        { id: 3, name: "You Know I'm No Good", file: "./nogood.gp5" },
      ].map((song: Song) => (
        <Button
          onClick={() => handleSongSelected(song)}
          key={song.id}
          className={songSelected.id === song.id ? "active" : undefined}
        >
          {song.name}
        </Button>
      ))}

      <Button>
        <label>
          <AppIcon name="more-2" style={{ width: "10px" }} />
          <input
            type="file"
            id="upload"
            style={{ display: "none" }}
            onChange={handleFileUpload}
            ref={upload}
            accept=".xml, .gp4, .gp5"
          />
        </label>
      </Button>
    </Space>
  );
}
