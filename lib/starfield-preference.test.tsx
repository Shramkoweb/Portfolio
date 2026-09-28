import { act, renderHook } from '@testing-library/react';
import { renderToString } from 'react-dom/server';

import {
  getStarfieldEnabled,
  setStarfieldEnabled,
  useStarfieldEnabled,
} from '@/lib/starfield-preference';

function dispatchStorage(key: string | null) {
  window.dispatchEvent(new StorageEvent('storage', { key }));
}

describe('starfield preference', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => jest.restoreAllMocks());

  it('is on by default', () => {
    expect(getStarfieldEnabled()).toBe(true);
  });

  it('persists the off state', () => {
    setStarfieldEnabled(false);
    expect(getStarfieldEnabled()).toBe(false);
    setStarfieldEnabled(true);
    expect(getStarfieldEnabled()).toBe(true);
  });

  it('removes the key instead of storing "on"', () => {
    setStarfieldEnabled(false);
    setStarfieldEnabled(true);
    expect(localStorage.getItem('starfield')).toBeNull();
  });

  it('stays on when storage is unavailable', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(getStarfieldEnabled()).toBe(true);
  });

  it('does not throw when writing to storage fails', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => setStarfieldEnabled(false)).not.toThrow();
  });

  describe('useStarfieldEnabled', () => {
    it('renders off on the server to avoid a hydration flash', () => {
      function Probe() {
        return <>{String(useStarfieldEnabled())}</>;
      }
      expect(renderToString(<Probe />)).toBe('false');
    });

    it('re-renders when the preference is set in this tab', () => {
      const { result } = renderHook(() => useStarfieldEnabled());
      expect(result.current).toBe(true);

      act(() => setStarfieldEnabled(false));

      expect(result.current).toBe(false);
    });

    it('follows changes made in another tab', () => {
      const { result } = renderHook(() => useStarfieldEnabled());

      act(() => {
        localStorage.setItem('starfield', 'off');
        dispatchStorage('starfield');
      });
      expect(result.current).toBe(false);

      act(() => {
        localStorage.clear();
        dispatchStorage(null);
      });
      expect(result.current).toBe(true);
    });

    it('ignores storage events for other keys', () => {
      const { result } = renderHook(() => useStarfieldEnabled());
      const renders = jest.fn();
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        renders();
        return 'off';
      });

      act(() => dispatchStorage('theme'));

      expect(renders).not.toHaveBeenCalled();
      expect(result.current).toBe(true);
    });

    it('stops reading storage after unmount', () => {
      const { unmount } = renderHook(() => useStarfieldEnabled());
      unmount();
      const getItem = jest.spyOn(Storage.prototype, 'getItem');

      act(() => {
        setStarfieldEnabled(false);
        dispatchStorage('starfield');
      });

      expect(getItem).not.toHaveBeenCalled();
    });
  });
});
