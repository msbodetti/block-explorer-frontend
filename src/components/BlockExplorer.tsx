import React from "react";
import "./BlockExplorer.css";
import { ApiService } from "../services/ApiService";

export default function BlockExplorer() {
    const apiClient = new ApiService();
    //log list of blocks
    apiClient.getBlocks('block-id').then(blocks => console.log(blocks));
  return <div className="BlockExplorer">hello, Block Explorer</div>;
}
