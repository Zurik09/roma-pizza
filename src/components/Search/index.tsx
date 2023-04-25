import React, { useState } from 'react';
// @ts-ignore
import debounce from 'lodash.debounce';
import { useRef, useCallback } from 'react';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title />
        <g data-name="Layer 2" id="Layer_2">
          <path d="M28.35,25.73l-9.6-9.6A.47.47,0,0,0,18.4,16h0a.47.47,0,0,0-.35.15l-.61.61-1.28-1.29a7.21,7.21,0,1,0-5.44,2.49,7.13,7.13,0,0,0,4.73-1.78l1.29,1.28-.6.61a.5.5,0,0,0,0,.7l9.59,9.6a.48.48,0,0,0,.7,0l1.92-1.92A.48.48,0,0,0,28.35,25.73Zm-22-10.61a6.23,6.23,0,1,1,4.4,1.82A6.24,6.24,0,0,1,6.32,15.12ZM26.08,27.29,17.2,18.4l1.2-1.21,8.89,8.89Z" />
          <path d="M11.24,6.56a.5.5,0,0,0-.5.5.51.51,0,0,0,.5.5,3.22,3.22,0,0,1,2.7,1.81.49.49,0,0,0,.44.28.59.59,0,0,0,.23-.05.49.49,0,0,0,.22-.67A4.18,4.18,0,0,0,11.24,6.56Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          data-name="Layer 1"
          height="200"
          id="Layer_1"
          viewBox="0 0 200 200"
          width="200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title />
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
