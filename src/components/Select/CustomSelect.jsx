import React, { useState } from 'react';
import styles from './Select.module.css';

const CustomSelect = ({ selection, updateOption, options, propData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelection, setLocalSelection] = useState(selection);
  const updateSelection = (value) => {
    setLocalSelection(value);
    if (updateOption) {
      let data = { ...options, order_id: propData };
      console.log(data);
      updateOption(data);
    }
  };

  const toggleOption = () => {
    setIsOpen((open) => !open);
  };

  return (
    <menu className={styles.select} onClick={toggleOption}>
      <div>{localSelection}</div>
      {isOpen && (
        <div className={styles.option}>
          {options?.map((option, id) => (
            <div
              key={id}
              className={styles.item}
              onClick={() => updateSelection(option.title)}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </menu>
  );
};

export default CustomSelect;
