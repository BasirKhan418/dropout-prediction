"use client";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from '@stream-io/video-react-sdk';
import { useSearchParams } from 'next/navigation';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import '../video.css';
import { useEffect, useState } from 'react';

const apiKey = 'mmhfdzb5evj2';
const callId = 'QdMnuwQegiiM';

export default function App() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || 'default_user';
  const name = searchParams.get("name") || 'Default Name';
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiV2VkZ2VfQW50aWxsZXMiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1dlZGdlX0FudGlsbGVzIiwiaWF0IjoxNzE5MTQwMTcyLCJleHAiOjE3MTk3NDQ5Nzd9.Lqteue8HrfyaCP-s5iLqSYttLlg7Mnj0aoUZs_IbKBw';
    const user = {
      id: userId,
      name: name,
      image: `https://getstream.io/random_svg/?id=${name}&name=${name}`,
    };

    const videoClient = new StreamVideoClient({ apiKey, user, token });
    setClient(videoClient);

    const videoCall = videoClient.call('default', callId);
    videoCall.join({ create: true });
    setCall(videoCall);
  }, [userId, name]);

  if (!client || !call) {
    return <div>Loading...</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls />
    </StreamTheme>
  );
};
