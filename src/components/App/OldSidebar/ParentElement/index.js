import React, { useState } from 'react';
import SvgComponents from 'src/components/SvgComponents';
import { getTopics } from 'src/modules/Topic/actions';
import { getUser } from 'src/modules/User/actions';
import ChildElement from '../ChildElement';
import { fetchTopics } from 'src/modules/Topic/slice';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { isEmpty } from 'lodash';
import { useSubjectsLazyQuery } from 'src/generated/apollo';
import { useCustomQuery } from 'src/modules/Redux/index';

const LeftLogo = ({ svgRef }) => {
  return <SvgComponents svgRef={svgRef} />;
};

const RightLogo = ({ svgRef }) => {
  return (
    <span className="ml-auto">
      <SvgComponents svgRef={svgRef} />
    </span>
  );
};

const renderChildren = (title) => {
  return (
    <ChildElement key={title} title={title} />
  )
};

export default function ParentElement({
  title,
  leftSvgRef,
  rightSvgRef = 'rightArrow',
}) {
  useCustomQuery(fetchTopics, useSubjectsLazyQuery, undefined, true);
  // const { data, loading, error } = getTopics();
  //{ data.subjects.map( subject => renderChildren(subject.code))}
  const [toggle, setToggle] = useState(false);
  // const dispatch = useDispatch();
  const { data } = useSelector(state => (state.topics), shallowEqual);

  // if (data && isEmpty(s)) {
  //   console.log('dispatching');
  //   dispatch(fetchTopics(data));
  // }
  // const s = "hello";

  const onToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <div onClick={onToggle} className="flex items-center p-2 text-gray-100 transition-colors rounded-md hover:bg-indigo-600 ">
        <LeftLogo svgRef={leftSvgRef} />
        <span className="ml-2">{title}</span>
        <RightLogo svgRef={rightSvgRef} />
      </div>
      <div className={`mt-2 'transition-all ease-in-out duration-200 ${toggle ? 'max-h-96': 'max-h-0'} transform ${toggle ? 'opacity-100' : 'opacity-0'} space-y-2 border px-7`}>
        { isEmpty(data) ? null : data?.subjects?.map( subject => renderChildren(subject.name))}
      </div>
    </div>
  );
}
