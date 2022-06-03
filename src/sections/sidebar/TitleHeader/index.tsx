import * as React from 'react';

interface TitleDropdownProps {
  title: string;
};

const TitleDropdown: React.FC<TitleDropdownProps> = (props) => {

  return (
    <button className="w-full px-2 bg-none hover:bg- hover:brightness-200">
      {props.title}
    </button>
  );
};


const TitleHeader: React.FC = () => {

  return (
    <div className="relative inline-block m-auto">
      <TitleDropdown title={"Title."} />
    </div>
  )

};

export default TitleHeader;
