import React from 'react';
import { ReactComponent as Box } from '../icons/box.svg'; // placeholder box
import { ReactComponent as KettleBell } from '../icons/kettlebell.svg';
import { ReactComponent as Walking } from '../icons/walking.svg';
import { ReactComponent as Cycling } from '../icons/cycling.svg';
import { ReactComponent as Plank } from '../icons/plank.svg';
import { ReactComponent as PullUp } from '../icons/pullup.svg';
import { ReactComponent as PushUp } from '../icons/pushup.svg';
import { ReactComponent as Challenge } from '../icons/challenge.svg';
import { ReactComponent as Olympics } from '../icons/olympics.svg';
import { ReactComponent as BoxJump } from '../icons/boxjump.svg';
import { ReactComponent as CurlUps } from '../icons/curlups.svg';
import { ReactComponent as DownStairs } from '../icons/downstairs.svg';
import { ReactComponent as FreeTime } from '../icons/freetime.svg';
import { ReactComponent as Gym } from '../icons/gym.svg';
import { ReactComponent as JumpRope } from '../icons/jumprope.svg';
import { ReactComponent as Running } from '../icons/running.svg';
import { ReactComponent as SnowShoes } from '../icons/snowshoes.svg';
import { ReactComponent as Skiing } from '../icons/skiing.svg';
import { ReactComponent as Squats } from '../icons/squats.svg';
import { ReactComponent as StepSquats } from '../icons/stepsquat.svg';
import { ReactComponent as Stretching } from '../icons/stretching.svg';
import { ReactComponent as UpStairs } from '../icons/upstairs.svg';
import { ReactComponent as WalkingMeeting } from '../icons/walking2.svg';
import { ReactComponent as FloorBall } from '../icons/floorball.svg';
import Icon from '../components/Icon';

// list of manually added and cleaned SVG files
const icons = [
  'box.svg',
  'cycling.svg',
  'kettlebell.svg',
  'plank.svg',
  'pullup.svg',
  'pushup.svg',
  'walking.svg',
  'challenge.svg',
  'olympics.svg',
  'boxjump.svg',
  'curlups.svg',
  'downstairs.svg',
  'freetime.svg',
  'gym.svg',
  'jumprope.svg',
  'running.svg',
  'snowshoes.svg',
  'skiing.svg',
  'squats.svg',
  'stepsquat.svg',
  'stretching.svg',
  'upstairs.svg',
  'walking2.svg',
  'floorball.svg'
];

const customIcon = (iconName, color = '#000000', size = '2x') => {
  if (!iconName.toLowerCase().endsWith('.svg')) {
    return <Icon icon={iconName} size={size} color={color} />;
  }
  switch (iconName) {
    case 'kettlebell.svg':
      return <KettleBell />;
    case 'walking.svg':
      return <Walking />;
    case 'cycling.svg':
      return <Cycling />;
    case 'plank.svg':
      return <Plank />;
    case 'pullup.svg':
      return <PullUp />;
    case 'pushup.svg':
      return <PushUp />;
    case 'challenge.svg':
      return <Challenge fill={color} />;
    case 'olympics.svg':
      return <Olympics stroke={color} />;
    case 'boxjump.svg':
      return <BoxJump />;
    case 'curlups.svg':
      return <CurlUps />;
    case 'downstairs.svg':
      return <DownStairs />;
    case 'freetime.svg':
      return <FreeTime />;
    case 'gym.svg':
      return <Gym />;
    case 'jumprope.svg':
      return <JumpRope />;
    case 'running.svg':
      return <Running />;
    case 'snowshoes.svg':
      return <SnowShoes />;
    case 'skiing.svg':
      return <Skiing />;
    case 'squats.svg':
      return <Squats />;
    case 'stepsquat.svg':
      return <StepSquats />;
    case 'stretching.svg':
      return <Stretching />;
    case 'upstairs.svg':
      return <UpStairs />;
    case 'walking2.svg':
      return <WalkingMeeting />;
    case 'floorball.svg':
      return <FloorBall />;
    default:
      return <Box />;
  }
};

export { customIcon, icons };
