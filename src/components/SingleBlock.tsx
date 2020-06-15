import React, {useEffect, useState} from 'react';
import './SingleBlock.css';
import {
    useParams
} from "react-router-dom";
import {fetchSingleBlock, SingleBlockData} from "../helpers/api";
import StatRow from "./SingleBlock/StatRow";
import SingleBlockClusterGraph from "./SingleBlockClusterGraph";
import SingleBlockViewHeader from "./SingleBlock/SingleBlockViewHeader";
import { connect } from 'react-redux';
import ProgressBar from "./SingleBlock/ProgressBar";

interface Props {
    block?: any;
}

function SingleBlock({ block }: Props) {

    const { id } = useParams();

    const [blockHeader, setblockHeader] = useState(([] as unknown) as any);
    const [blockPow, setblockPow] = useState(([] as unknown) as any);
    const [blockBody, setblockBody] = useState(([] as unknown) as any);
    const [blockFound, setBlockFound] = useState(([] as unknown) as any);
    const [blockWeight, setBlockWeight] = useState('...');

    useEffect(() => {
        try {
            id && fetchSingleBlock(id).then((block: SingleBlockData) => {
                console.log(block);
                if(block && block.block) {
                    setblockHeader(block.block.header);
                    setblockPow(block.block.header.pow);
                    setblockBody(block.block.body);
                    setBlockWeight(block.block._miningTime)
                } else {
                    setBlockFound(false);
                }
            });
        } catch (e) {
            console.error(e);
        }
    }, [id]);

    const singleBlockDataArray: any[] = [];

    const { hash, prev_hash, nonce, total_kernel_offset, version } = blockHeader;
    const { accumulated_monero_difficulty, accumulated_blake_difficulty } = blockPow;
    const { inputs, kernels, outputs } = blockBody;

    singleBlockDataArray.push({inputs, kernels, outputs});

    return (
        <div className="SingleBlock">
            {blockFound ? (
                <div>
                    <SingleBlockViewHeader title="Block Data"/>
                    <SingleBlockClusterGraph data={singleBlockDataArray}/>
                    <ProgressBar weight={blockWeight}/>
                    <h1>Technical Details</h1>
                    <StatRow label="Accumulated Monero Difficulty" value={accumulated_monero_difficulty} />
                    <StatRow label="Accumulated Blake Difficulty" value={accumulated_blake_difficulty} />
                    <StatRow label="Previous Hash" value={prev_hash} />
                    <StatRow label="Hash" value={hash} />
                    <StatRow label="Nonce" value={nonce} />
                    <StatRow label="Total Kernel Offset" value={total_kernel_offset} />
                    <StatRow label="Version" value={version} />
                </div>
            ) : (
                <h1 className="noBlockFound">No block found.</h1>
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    block: state.block
});
export default connect(mapStateToProps)(SingleBlock);