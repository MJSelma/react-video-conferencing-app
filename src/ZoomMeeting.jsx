// src/ZoomMeeting.jsx
import React, { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.15.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const ZoomMeeting = () => {
  const zoomMeetingNumber = '1234`';
  const zoomPassword = '123sfdgvfssfbgt4455rrgfdvfvf';
  const displayName = 'Melvin';
  const role = 1; // 1 = host, required for screen sharing

  useEffect(() => {
    const getSignatureAndJoin = async () => {
      try {
        const response = await fetch('https://generatezoomtoken-zly5zmxc7a-uc.a.run.app', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            meetingNumber: zoomMeetingNumber,
            role
          })
        });

        const data = await response.json();
        const sdkKey = 'Z254ZKvhrZwdLnhxs8MopORThuhEADUhwJP1';

        ZoomMtg.setZoomJSLib('https://source.zoom.us/2.15.0/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        ZoomMtg.init({
          leaveUrl: 'https://zoom.us',
          isSupportAV: true,
          screenShare: true,
          success: () => {
            ZoomMtg.join({
              signature: data.token,
              sdkKey: data.sdkKey,
              meetingNumber: zoomMeetingNumber,
              userName: displayName,
              passWord: zoomPassword,
              success: () => {
                console.log('Joined Zoom meeting');
              },
              error: (err) => console.error('Join error', err),
            });
          },
          error: (err) => console.error('Init error', err),
        });
      } catch (err) {
        console.error('Signature fetch error:', err);
      }
    };

    getSignatureAndJoin();
  }, []);

  return <div id="zmmtg-root"></div>;
};

export default ZoomMeeting;