import React, {useEffect, useRef, useState} from "react";
import {Box, Grid, List, Typography} from "@material-ui/core";
import CmtCard from "../../../../../../@coremat/CmtCard";
import useStyles from "../../style";
import CmtCardContent from "../../../../../../@coremat/CmtCard/CmtCardContent";
import {SelectAll} from "@material-ui/icons";
import {useDropzone} from "react-dropzone";
import videojs from "video.js";
import qualityLevels from "videojs-contrib-quality-levels";
import qualitySelector from "videojs-hls-quality-selector";

const SelectFileContent = ({onFileSelected}) =>{
    const classes = useStyles();
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDropAccepted: files1 => onFileSelected(files1),
    });

    return (
        <Box>
            <Box {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} accept="video/mp4,video/mov,video/avi"/>
                <div style={{margin: 'auto'}}>
                    <div className={classes.inputTitle}>Tambahkan dari Komputer</div>
                </div>
            </Box>
        </Box>
    );
}

const FileContent = ({}) =>{
    const classes = useStyles();
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        if (selectedFile) {
            const videoSrc = URL.createObjectURL(selectedFile);
            if (!playerRef.current) {
                console.log('selected file', selectedFile);
                const videoJsOptions = {
                    preload: 'auto',
                    controls: true,
                    sources: [
                        {
                            src: videoSrc,
                            type: selectedFile.type
                        },
                    ],
                };
                const player = playerRef.current = videojs(videoRef.current, videoJsOptions, function onPlayerReaady() {
                    console.log('onPlayerReady');
                });
            } else {
                const sources = {
                    src: videoSrc,
                    type: selectedFile.type
                };
                const player = playerRef.current;
                player.src(sources);
            }
        }
    }, [selectedFile]);

    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    const onFileSelected = function (files) {
        if(files && files.length > 0){
            setSelectedFile(files[0])
        }
    }
    return(
        <Grid container direction={"row"} spacing={3}>
            <Grid item md={5} lg={5} sm={12} xs={12}>
                <CmtCard>
                    <CmtCardContent>
                        <div className={classes.inputTitle}>
                            Ketentuan Konten
                        </div>
                        <div className={classes.contentLabel}>
                            <span>Rekomen Resolusi :<br/>Landscape (480p) </span>
                        </div>
                        <div className={classes.contentLabel}>
                            Recommended format : .mp4, .mov, .avi
                        </div>
                        <div className={classes.contentLabel}>
                            Durasi : 7-15s
                        </div>
                        <div className={classes.inputTitle}>
                            Unggah Video
                        </div>
                        <div>
                            <SelectFileContent onFileSelected={onFileSelected}/>
                        </div>
                    </CmtCardContent>
                </CmtCard>
            </Grid>
            <Grid item md={7} lg={7} sm={12} xs={12}>
                <CmtCard>
                    <CmtCardContent>
                        <div className={classes.inputTitle}>
                            Pratinjau
                        </div>
                        <div style={{width:'100%', height:'243px'}}>
                            <video ref={videoRef} className="video-js vjs-big-play-centered vjs-fill"></video>
                        </div>
                    </CmtCardContent>
                </CmtCard>
            </Grid>
        </Grid>
    )
}

export default FileContent;
