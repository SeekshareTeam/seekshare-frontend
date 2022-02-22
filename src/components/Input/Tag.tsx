import * as React from 'react';
import { Badge } from 'src/components/Badges';
import { Select } from 'src/components/Button/TagButton';

export const TagInput = () => {
  const [newTag, setNewTag] = React.useState('');
  const [boxFocus, setBoxFocus] = React.useState(false);

  const inputRef = React.useRef();

  const onContainerClick = (e) => {
    inputRef.current.focus();
    setBoxFocus(true);
  };

  const onLoseFocus = (e) => {
    inputRef.current.blur();
    setBoxFocus(false);
  };

  const [currentTags, setCurrentTags] = React.useState([
    { value: 'Javascript', id: '1' },
    { value: 'React', id: '2' },
  ]);

  const removeTagClick = (id) => {
    const filteredTags = currentTags.filter((ct) => {
      return ct.id !== id;
    });
    setCurrentTags([...filteredTags]);
  };

  const handleKeyDown = (event) => {
    console.log('@ hello');
    if (event.key === 'Enter') {
      setCurrentTags([
        ...currentTags,
        { value: event.target.value, id: currentTags.length + 1 },
      ]);
      setNewTag('');
    }
  };

  return (
    <div
      tabindex="1"
      onBlur={onLoseFocus}
      className={`flex flex-row items-center w-full px-1 h-12 rounded border-2 ${
        boxFocus
          ? 'ring-1 ring-blue-600 ring-opacity-20 border-blue-300'
          : 'border-gray-200'
      }`}
      onClick={onContainerClick}
    >
      {currentTags.map((ct) => {
        return (
          <div className={'flex flex-row mr-1'} key={ct.id}>
            <Select value={ct.value} id={ct.id} onClick={removeTagClick} />
          </div>
        );
      })}
      <input
        type="text"
        value={newTag}
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          setNewTag(event.target.value);
        }}
        ref={inputRef}
        className={'outline-none flex-1'}
      />
    </div>
  );
};
