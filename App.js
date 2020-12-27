import React, {useState, useRef} from 'react';
import Slider from '@react-native-community/slider';
import {Alert, Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { Appbar } from 'react-native-paper';
import Video from 'react-native-video';

import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

const App = () => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');
  const [currentvideo, setCurrentVideo] = useState(0);
  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = (currentTime) => setCurrentTime(currentTime);
  // currentvideo=0;
  const CurrentVideo = (currentvideo) => {
    if (currentvideo != Videos.length - 1) {
      currentvideo = currentvideo + 1;
      setCurrentVideo(currentvideo);
    } else {
      currentvideo = 0;
    }
  };

  var Videos = [
    'https://content.jwplatform.com/manifests/yp34SRmf.m3u8',
    'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
    'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  ];

  return (
    <>
    <View>
  <Appbar.Header style={{backgroundColor:"skyblue"}}>
      <Appbar.BackAction  />
      <Appbar.Content title="Video"  />
      <Appbar.Action icon="magnify"  onPress={()=>Alert.alert("search")}/>
      <Appbar.Action icon="dots-vertical" onPress={()=>Alert.alert("menu")}/>
    </Appbar.Header>
    </View>
    


      <View style={styles.container}>


        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={paused}
          ref={videoPlayer}
          resizeMode={screenType}
          onFullScreen={isFullScreen}
          currentvideo={currentvideo}
          source={{
            uri: Videos[currentvideo],
          }}
          style={styles.mediaPlayer}
          volume={10}
        />

        <MediaControls
          duration={duration}
          isLoading={isLoading}
          mainColor="#333"
          onFullScreen={onFullScreen}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
          toolbar={renderToolbar()}
        />
      </View>

      <View style={styles.button}>
        <Button title=" next" onPress={() => CurrentVideo(currentvideo)} />
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
marginTop:105,
    flex: 1,
    marginBottom: 105,

  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    marginBottom: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
    
  },
});
