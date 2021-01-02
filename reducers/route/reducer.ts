import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { Stat } from '../../utils/constants';
import { prepareContextualReducer } from '../../utils/hooks';
import { EVsByLevel, REGISTER_TRACKER, RESET_TRACKER, RouteAction, RouteState, SET_STAT, StatLine, TRIGGER_EVOLUTION } from './types';

const defaultState: RouteState = {
  trackers: {},
};

const reducer = (state: RouteState, action: RouteAction): RouteState => {
  switch (action.type) {
    case REGISTER_TRACKER:
      return {
        ...state,
        trackers: {
          ...state.trackers,
          [action.payload.name]: state.trackers[action.payload.name] || {
            name: action.payload.name,
            evolution: 0,
            startingLevel: 5,
            baseStats: action.payload.baseStats,
            recordedStats: {},
            evSegments: action.payload.evSegments,
          },
        },
      };

    case SET_STAT:
      return set(
        cloneDeep(state),
        [
          'trackers',
          action.payload.name,
          'recordedStats',
          state.trackers[action.payload.name].evolution,
          action.payload.level,
          action.payload.stat,
        ],
        action.payload.value,
      );

    case TRIGGER_EVOLUTION:
      return set(
        cloneDeep(state),
        ['trackers', action.payload.name, 'evolution'],
        state.trackers[action.payload.name].evolution + 1,
      );

    case RESET_TRACKER:
      return {
        ...state,
        trackers: {
          ...state.trackers,
          [action.payload.name]: {
            ...state.trackers[action.payload.name],
            evolution: 0,
            recordedStats: {},
          },
        },
      };
      
    default:
      return state;
  }
};

export const RouteContext = prepareContextualReducer(reducer, defaultState);

export function registerTracker(name: string, baseStats: StatLine[], evSegments: Record<number, EVsByLevel>): RouteAction {
  return {
    type: REGISTER_TRACKER,
    payload: {
      name,
      baseStats,
      evSegments,
    },
  };
}

export function setStat(name: string, stat: Stat, level: number, value: number): RouteAction {
  return {
    type: SET_STAT,
    payload: {
      name,
      stat,
      level,
      value,
    },
  };
}

export function triggerEvolution(name: string): RouteAction {
  return {
    type: TRIGGER_EVOLUTION,
    payload: { name },
  };
}

export function resetTracker(name: string): RouteAction {
  return {
    type: RESET_TRACKER,
    payload: { name },
  };
}
