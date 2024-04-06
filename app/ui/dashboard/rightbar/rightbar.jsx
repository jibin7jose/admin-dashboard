"use client"
import { useState, useRef } from "react";
import styles from './rightbar.module.css';
import Image from 'next/image';
import Harassment from '/public/abuse.png';

const Rightbar = () => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const mediaStreamRef = useRef(null);
    const chunksRef = useRef([]);

    const handleStartRecording = () => {
        const timestamp = Date.now();
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                mediaStreamRef.current = stream;
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        chunksRef.current.push(e.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    downloadRecordedVideo(url, timestamp);
                    stopMediaStream();
                };

                mediaRecorder.start();
                setIsRecording(true);
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
            });
    };

    const handleStopRecording = () => {
        const { current: mediaRecorder } = mediaRecorderRef;
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
            stopMediaStream();
            chunksRef.current = [];
        }
    };

    const downloadRecordedVideo = (url, timestamp) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = `recorded-video-${timestamp}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const stopMediaStream = () => {
        const tracks = mediaStreamRef.current?.getTracks?.();
        if (tracks) {
            tracks.forEach(track => track.stop());
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image className={styles.bg} src={Harassment} alt="" fill />
                </div>
                <div className={styles.text}>
                    <span className={styles.notification}>🚨 Report Abuse!</span>
                    <h3>Facing harassment from a customer?</h3>
                    <span>Record the instance</span>
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={isRecording ? handleStopRecording : handleStartRecording}>
                            {!isRecording ? 'Start Recording' : 'Stop Recording'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rightbar;